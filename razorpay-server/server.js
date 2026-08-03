/**
 * server.js  —  Razorpay Payment Backend (Express.js + Supabase)
 *
 * Place this file in your backend/ folder.
 * Run:  node server.js  or  npm run dev
 *
 * Required .env keys:
 *   RAZORPAY_KEY_ID
 *   RAZORPAY_KEY_SECRET
 *   FRONTEND_URL        (e.g. http://localhost:5173)
 *   PORT                (default 3001)
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import express  from 'express';
import cors     from 'cors';
import crypto   from 'crypto';
import Razorpay from 'razorpay';
import dotenv   from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

/* ─────────────────────────────────────────
   Validate required env vars on startup
───────────────────────────────────────── */
const REQUIRED_ENV = [
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
];
const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
if (missing.length) {
  console.error('❌  Missing required env vars:', missing.join(', '));
  process.exit(1);
}

/* ─────────────────────────────────────────
   App setup
───────────────────────────────────────── */
const app  = express();
const PORT = process.env.PORT || 3001;

/* Allow requests from your React dev server (and production URL) */
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5173',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      /* Allow server-to-server / Postman requests (no Origin header) */
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());

/* ─────────────────────────────────────────
   Razorpay client
───────────────────────────────────────── */
const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ─────────────────────────────────────────
   Supabase client
───────────────────────────────────────── */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/* ══════════════════════════════════════════════════════
   GET  /api/health
   Quick health-check — use this to confirm server is up
══════════════════════════════════════════════════════ */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* ══════════════════════════════════════════════════════
   POST  /api/payment/create-order
   Body: { amount, name, email, phone, package_name, enquiry_id }
   amount is in ₹ (rupees) — we convert to paise here
══════════════════════════════════════════════════════ */
app.post('/api/payment/create-order', async (req, res) => {
  const {
    amount,
    name,
    email        = '',
    phone,
    package_name = '',
    enquiry_id   = '',
  } = req.body;

  /* ── Validation ── */
  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0)
    return res.status(400).json({ error: 'Invalid amount. Must be a positive number.' });

  if (!name || String(name).trim() === '')
    return res.status(400).json({ error: 'Customer name is required.' });

  if (!phone || String(phone).trim() === '')
    return res.status(400).json({ error: 'Customer phone is required.' });

  try {
    const order = await razorpay.orders.create({
      amount:   Math.round(Number(amount) * 100),   // ₹ → paise
      currency: 'INR',
      receipt:  `rcpt_${Date.now()}`,
      notes: {
        customer_name:  name,
        customer_email: email,
        customer_phone: phone,
        package_name,
        enquiry_id,
      },
    });

    console.log(`✅ Order created: ${order.id} | ₹${amount} | ${name}`);

    return res.status(200).json({
      order_id: order.id,
      amount:   order.amount,       // in paise (Razorpay needs this)
      currency: order.currency,
      key_id:   process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('❌ create-order error:', err);
    return res.status(500).json({ error: 'Could not create payment order. Please try again.' });
  }
});

/* ══════════════════════════════════════════════════════
   POST  /api/payment/verify
   Body: { razorpay_order_id, razorpay_payment_id,
           razorpay_signature, name, email, phone,
           amount, package_name }
   1. Verifies HMAC signature
   2. Inserts record into Supabase `payments` table
══════════════════════════════════════════════════════ */
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

  /* ── Validation ── */
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
    return res.status(400).json({ success: false, error: 'Missing payment verification fields.' });

  /* ── Step 1: Verify Razorpay HMAC signature ── */
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    console.warn('⚠️  Signature mismatch for order:', razorpay_order_id);
    return res.status(400).json({ success: false, error: 'Payment verification failed. Invalid signature.' });
  }

  /* ── Step 2: Save payment record to Supabase ── */
  const { error: dbError } = await supabase.from('payments').insert({
    payment_id:   razorpay_payment_id,
    order_id:     razorpay_order_id,
    amount:       Number(amount),
    name,
    email,
    phone,
    package_name,
    status:       'success',
    created_at:   new Date().toISOString(),
  });

  if (dbError) {
    /* Log the DB error but don't block the success response —
       the payment is already captured by Razorpay */
    console.error('❌ Supabase insert error:', dbError.message);
  } else {
    console.log(`✅ Payment saved to DB: ${razorpay_payment_id} | ₹${amount} | ${name}`);
  }

  return res.status(200).json({
    success:    true,
    payment_id: razorpay_payment_id,
    order_id:   razorpay_order_id,
  });
});

/* ─────────────────────────────────────────
   Global error handler
───────────────────────────────────────── */
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

/* ─────────────────────────────────────────
   Start
───────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`\n✅  Payment server running → http://localhost:${PORT}`);
  console.log(`    Health check: http://localhost:${PORT}/api/health\n`);
});

