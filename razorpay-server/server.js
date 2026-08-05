/**
 * server.js  —  Razorpay Payment Backend (Express.js + Supabase)
 *
 * Place this file in your backend/ folder (razorpay-server/).
 * Run:  node server.js  or  npm run dev
 *
 * Required .env keys:
 *   RAZORPAY_KEY_ID
 *   RAZORPAY_KEY_SECRET
 *   FRONTEND_URL        (e.g. http://localhost:5173)
 *   PORT                (default 3001)
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * ── FIXES APPLIED ──────────────────────────────────────────
 * 1. req.body is now defended against being undefined, so a
 *    malformed/empty request can never crash the process.
 * 2. process-level unhandledRejection / uncaughtException
 *    handlers added so the server logs and survives instead
 *    of dying and forcing a Render restart (which is what
 *    caused your "Failed to fetch" — the server was down
 *    while it restarted).
 * 3. CORS origin check now logs rejected origins instead of
 *    failing silently, so you can see in Render logs exactly
 *    which origin was blocked if this happens again.
 */

import express  from 'express';
import cors     from 'cors';
import crypto   from 'crypto';
import Razorpay from 'razorpay';
import dotenv   from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

/* ─────────────────────────────────────────
   Process-level safety nets
   These make sure ONE bad request or unexpected
   error never takes the whole server down again.
───────────────────────────────────────── */
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

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

/* Allow requests from frontend */
const allowedOrigins = [
  "https://www.expresstravelcorp.com",
  "https://expresstravelcorp.com",
  "https://etc-tours-travels.netlify.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4173", 
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    // Allow non-browser tools (curl, health checks) with no Origin header
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn(`⚠️  CORS blocked origin: ${origin}`);
    return callback(new Error(`Origin ${origin} not allowed`));
  },
  credentials: true,
}));

app.use(express.json({
  limit: "10mb"
}));

app.use(express.urlencoded({
  extended: true
}));

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
  // req.body can be undefined if Content-Type wasn't application/json
  // or the body was empty — never destructure it directly.
  const body = req.body || {};
  const {
    amount,
    name,
    email        = '',
    phone,
    package_name = '',
    enquiry_id   = '',
  } = body;

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
  const body = req.body || {};
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    name         = '',
    email        = '',
    phone        = '',
    amount       = 0,
    package_name = '',
  } = body;

  /* ── Validation ── */
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
    return res.status(400).json({ success: false, error: 'Missing payment verification fields.' });

  try {
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
  } catch (err) {
    console.error('❌ verify error:', err);
    return res.status(500).json({ success: false, error: 'Payment verification failed due to a server error.' });
  }
});

/* ─────────────────────────────────────────
   404 fallback for unknown routes
───────────────────────────────────────── */
app.use((req, res) => {
  res.status(404).json({ error: `No route: ${req.method} ${req.originalUrl}` });
});

/* ─────────────────────────────────────────
   Global error handler
   (catches CORS rejections and anything
   passed to next(err) from sync code)
───────────────────────────────────────── */
app.use((err, req, res, _next) => {
  console.error('Unhandled error on', req.method, req.originalUrl, '-', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

/* ─────────────────────────────────────────
   Start
───────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`\n✅  Payment server running → http://localhost:${PORT}`);
  console.log(`    Health check: http://localhost:${PORT}/api/health\n`);
});