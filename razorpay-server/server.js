/**
 * Razorpay Payment Backend — Express.js
 * ──────────────────────────────────────
 * Two endpoints:
 *   POST /api/payment/create-order   → creates Razorpay order, returns order_id
 *   POST /api/payment/verify         → verifies payment signature after success
 */

import express    from 'express';
import cors       from 'cors';
import crypto     from 'crypto';
import Razorpay   from 'razorpay';
import dotenv     from 'dotenv';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

/* ── Razorpay instance ───────────────────────────── */
const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ═══════════════════════════════════════════════════
   ROUTE 1: Create Order
   Frontend calls this first to get a valid order_id
   Amount is set HERE (server-side) — never trust browser
═══════════════════════════════════════════════════ */
app.post('/api/payment/create-order', async (req, res) => {
  const { amount, name, email, phone, package_name = '', enquiry_id = '' } = req.body;

  // Validate
  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  try {
    const order = await razorpay.orders.create({
      amount:   Math.round(Number(amount) * 100), // Razorpay needs paise (₹1 = 100 paise)
      currency: 'INR',
      receipt:  `rcpt_${Date.now()}`,
      notes: {
        customer_name:  name,
        customer_email: email  || '',
        customer_phone: phone,
        package_name:   package_name,
        enquiry_id:     enquiry_id,
      },
    });

    res.json({
      order_id:   order.id,           // e.g. "order_OBEzMm7HFk4GFa"
      amount:     order.amount,        // in paise
      currency:   order.currency,
      key_id:     process.env.RAZORPAY_KEY_ID, // safe to send to frontend
    });

  } catch (err) {
    console.error('Razorpay create order error:', err);
    res.status(500).json({ error: 'Could not create payment order. Please try again.' });
  }
});

/* ═══════════════════════════════════════════════════
   ROUTE 2: Verify Payment
   Called after Razorpay popup closes with success.
   Verifies the signature to confirm payment is genuine.
   IMPORTANT: Never skip this — prevents fraud.
═══════════════════════════════════════════════════ */
app.post('/api/payment/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, error: 'Missing payment fields' });
  }

  // Razorpay signature = HMAC-SHA256 of "order_id|payment_id" using your key_secret
  const body      = razorpay_order_id + '|' + razorpay_payment_id;
  const expected  = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expected === razorpay_signature) {
    // ✅ Genuine payment — optionally save to DB here
    res.json({
      success:    true,
      payment_id: razorpay_payment_id,
      order_id:   razorpay_order_id,
    });
  } else {
    // ❌ Signature mismatch — possible fraud attempt
    res.status(400).json({ success: false, error: 'Payment verification failed' });
  }
});

/* ── Health check ────────────────────────────────── */
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`✅ Razorpay server running on http://localhost:${PORT}`);
});