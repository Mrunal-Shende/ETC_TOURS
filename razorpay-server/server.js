/**
 * Razorpay Payment Backend — Express.js
 */

import express    from 'express';
import cors       from 'cors';
import crypto     from 'crypto';
import Razorpay   from 'razorpay';
import dotenv     from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

/* ── Razorpay ── */
const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ── Supabase ── */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/* ══════════════════════════════════════════
   POST /api/payment/create-order
══════════════════════════════════════════ */
app.post('/api/payment/create-order', async (req, res) => {
  const { amount, name, email, phone, package_name = '', enquiry_id = '' } = req.body;

  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0)
    return res.status(400).json({ error: 'Invalid amount' });
  if (!name || !phone)
    return res.status(400).json({ error: 'Name and phone are required' });

  try {
    const order = await razorpay.orders.create({
      amount:   Math.round(Number(amount) * 100),
      currency: 'INR',
      receipt:  `rcpt_${Date.now()}`,
      notes:    { customer_name: name, customer_email: email || '', customer_phone: phone, package_name, enquiry_id },
    });

    res.json({
      order_id: order.id,
      amount:   order.amount,
      currency: order.currency,
      key_id:   process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('create-order error:', err);
    res.status(500).json({ error: 'Could not create payment order. Please try again.' });
  }
});

/* ══════════════════════════════════════════
   POST /api/payment/verify
   Verifies signature → saves to Supabase
══════════════════════════════════════════ */
app.post('/api/payment/verify', async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    name         = '',
    email        = '',
    phone        = '',
    amount       = 0,
    package_name = '',
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
    return res.status(400).json({ success: false, error: 'Missing payment fields' });

  /* 1. Verify Razorpay signature */
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expected !== razorpay_signature)
    return res.status(400).json({ success: false, error: 'Payment verification failed' });

  /* 2. Save to Supabase payments table */
  const { error: dbError } = await supabase.from('payments').insert({
    payment_id:   razorpay_payment_id,
    order_id:     razorpay_order_id,
    amount:       Number(amount),
    name,
    email,
    phone,
    package_name,
    status:       'success',
  });

  if (dbError) {
    console.error('❌ Supabase insert error:', dbError.message);
  } else {
    console.log('✅ Payment saved:', razorpay_payment_id);
  }

  res.json({ success: true, payment_id: razorpay_payment_id, order_id: razorpay_order_id });
});

/* ── Health check ── */
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`✅ Payment server running on http://localhost:${PORT}`));