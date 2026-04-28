# Razorpay Integration Guide
# Express Travel — React + Vite + Node.js
# ─────────────────────────────────────────────────────


## FILE PLACEMENT
# ─────────────────────────────────────────────────────

ETC_TOURS/
├── src/
│   ├── hooks/
│   │   └── useRazorpay.js          ← copy from razorpay-frontend/
│   ├── components/
│   │   ├── Payment.jsx             ← copy from razorpay-frontend/
│   │   └── EnquiryModal.jsx        ← replace existing with razorpay-frontend/ version
│   └── App.jsx                     ← add /payment route
│
├── .env                            ← add VITE_PAYMENT_API_URL
│
razorpay-server/                    ← NEW folder (sibling to ETC_TOURS)
├── server.js
├── package.json
└── .env


## STEP 1 — Get Razorpay API Keys (2 minutes)
# ─────────────────────────────────────────────────────
# 1. Go to https://dashboard.razorpay.com
# 2. Settings → API Keys → Generate Test Key
# 3. Copy Key ID and Key Secret
# Note: Test keys start with "rzp_test_" — use for development
#       Live keys start with "rzp_live_" — use for production


## STEP 2 — Setup payment server
# ─────────────────────────────────────────────────────

cd razorpay-server
npm install

# Create .env file:
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
FRONTEND_URL=http://localhost:5173
PORT=3001

npm run dev


## STEP 3 — Add env var to Vite frontend
# ─────────────────────────────────────────────────────
# In ETC_TOURS/.env:
VITE_PAYMENT_API_URL=http://localhost:3001


## STEP 4 — Add /payment route in App.jsx
# ─────────────────────────────────────────────────────

import Payment from './components/Payment';

# Inside <Routes>:
<Route path="/payment" element={<Payment />} />


## STEP 5 — Add payment_id column to enquiries table
# ─────────────────────────────────────────────────────
# Run in Supabase → SQL Editor:

ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS payment_status TEXT    DEFAULT 'pending';
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS payment_id     TEXT;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS payment_amount NUMERIC;


## STEP 6 — Replace EnquiryModal in PackageDetail.jsx
# ─────────────────────────────────────────────────────
# The new EnquiryModal is a drop-in replacement.
# In PackageDetail.jsx, the import stays the same — just replace the file.
# The modal now shows "Pay ₹500 Advance" button after enquiry is sent.
# Customer can also skip and pay later.


## HOW IT WORKS (flow)
# ─────────────────────────────────────────────────────
# 1. User fills enquiry form → saved to Supabase
# 2. "Pay ₹500 Advance" button appears
# 3. Click → React calls your Node server → Razorpay order created
# 4. Razorpay popup opens ON your site (no redirect!)
# 5. User pays → Razorpay calls onSuccess callback
# 6. React sends payment IDs to your server for verification
# 7. Server verifies signature → returns success
# 8. Enquiry record updated with payment_id in Supabase
# 9. Success screen shown inside the same modal


## CHANGING THE ADVANCE AMOUNT
# ─────────────────────────────────────────────────────
# In EnquiryModal.jsx, find:
#   amount: 500
# Change to whatever advance amount you want.
# You could also make it dynamic based on pkg.price:
#   amount: Math.round(pkg.price * 0.1)  // 10% of package price


## PRODUCTION DEPLOYMENT
# ─────────────────────────────────────────────────────
# Frontend (Vite) → Vercel/Netlify:
#   VITE_PAYMENT_API_URL=https://payments.expresstravelcorp.com

# Backend (Node) → Railway/Render/VPS:
#   RAZORPAY_KEY_ID=rzp_live_XXXXXXXX     ← switch to LIVE keys
#   RAZORPAY_KEY_SECRET=XXXXXXXX
#   FRONTEND_URL=https://etc-tours-travels.vercel.app
#   PORT=3001


## WHY NO SUCCESS/FAILED/ABORTED PAGES (unlike CCAvenue)
# ─────────────────────────────────────────────────────
# Razorpay uses a popup — payment happens ON your site.
# No redirect needed. The result comes back as a JS callback.
# Success/failure is handled inline in the modal or Payment.jsx.
# Much cleaner UX than CCAvenue's redirect-based approach.