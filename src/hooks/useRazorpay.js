/**
 * useRazorpay.js  —  src/hooks/useRazorpay.js
 *
 * Reusable hook that:
 *  1. Dynamically loads the Razorpay JS SDK (no npm package needed)
 *  2. Creates an order via your Express backend
 *  3. Opens the Razorpay payment popup
 *  4. Verifies payment signature on success
 *  5. Returns result / error to the caller
 *
 * ─── Usage ───────────────────────────────────────────────
 *
 *  const { openPayment, loading, error } = useRazorpay();
 *
 *  await openPayment({
 *    amount:       5000,               // in ₹ (NOT paise)
 *    name:         'John Doe',
 *    email:        'john@email.com',   // optional
 *    phone:        '9876543210',
 *    package_name: 'Andaman Unlimited',
 *    enquiry_id:   'abc-123',          // optional
 *    onSuccess: (data) => {
 *      // data = { payment_id, order_id, amount }
 *      console.log('Payment successful!', data);
 *    },
 *    onFailure: (errMessage) => {
 *      console.log('Payment failed:', errMessage);
 *    },
 *  });
 *
 * ─── Required env var ────────────────────────────────────
 *  VITE_PAYMENT_API_URL=http://localhost:3001
 * ─────────────────────────────────────────────────────────
 */

import { useState, useCallback } from 'react';

/* ── API base URL from Vite env (falls back to localhost) ── */
const API_BASE = import.meta.env.VITE_PAYMENT_API_URL || 'http://localhost:3001';

/* ── Load Razorpay checkout script exactly once ── */
const loadRazorpayScript = () =>
  new Promise((resolve) => {
    /* Already loaded — nothing to do */
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script   = document.createElement('script');
    script.src     = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

/* ══════════════════════════════════════════════════════════
   Hook
══════════════════════════════════════════════════════════ */
const useRazorpay = () => {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const openPayment = useCallback(async ({
    amount,
    name,
    email        = '',
    phone,
    package_name = '',
    enquiry_id   = '',
    onSuccess,
    onFailure,
  }) => {
    /* ── Reset state ── */
    setError('');
    setLoading(true);

    try {
      /* ── Step 1: Load Razorpay SDK ── */
      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded) {
        throw new Error(
          'Razorpay SDK failed to load. Please check your internet connection and try again.'
        );
      }

      /* ── Step 2: Create order on your backend ── */
      let orderData;
      try {
        const orderRes = await fetch(`${API_BASE}/api/payment/create-order`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, name, email, phone, package_name, enquiry_id }),
        });

        orderData = await orderRes.json();

        if (!orderRes.ok) {
          throw new Error(orderData.error || 'Could not create payment order. Please try again.');
        }
      } catch (fetchErr) {
        /* Give a friendlier message when the backend is unreachable */
        if (fetchErr.name === 'TypeError' && fetchErr.message.includes('fetch')) {
          throw new Error(
            'Payment server is unreachable. Please make sure the backend server is running on port 3001.'
          );
        }
        throw fetchErr;
      }

      /* ── Step 3: Open Razorpay checkout popup ── */
      const options = {
        /* Credentials & order info */
        key:         orderData.key_id,
        amount:      orderData.amount,       // in paise (from backend)
        currency:    orderData.currency,
        order_id:    orderData.order_id,

        /* Branding */
        name:        'Express Travel Corporate Services',
        description: package_name || 'Tour Package Payment',
        image:       '/logo.png',            // place your logo in /public

        /* Pre-fill customer details */
        prefill: {
          name,
          email,
          contact: phone,
        },

        /* Razorpay theme */
        theme: { color: '#2563EB' },

        /* ── ✅ Payment successful handler ── */
        handler: async (response) => {
          try {
            /* Step 4: Verify HMAC signature on backend */
            let verifyData;
            try {
              const verifyRes = await fetch(`${API_BASE}/api/payment/verify`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id:   response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature:  response.razorpay_signature,
                  /* Pass customer info so backend can save to Supabase */
                  name,
                  email,
                  phone,
                  amount,
                  package_name,
                }),
              });

              verifyData = await verifyRes.json();

              if (!verifyRes.ok) {
                throw new Error(verifyData.error || 'Payment verification failed.');
              }
            } catch (fetchErr) {
              if (fetchErr.name === 'TypeError' && fetchErr.message.includes('fetch')) {
                throw new Error('Could not reach payment server to verify payment.');
              }
              throw fetchErr;
            }

            if (verifyData.success) {
              /* 🎉 All done — call the success callback */
              onSuccess && onSuccess({
                payment_id: response.razorpay_payment_id,
                order_id:   response.razorpay_order_id,
                amount,
              });
            } else {
              throw new Error('Payment verification failed. Please contact support.');
            }
          } catch (err) {
            setError(err.message);
            onFailure && onFailure(err.message);
          } finally {
            setLoading(false);
          }
        },

        /* ── Modal closed without completing payment ── */
        modal: {
          ondismiss: () => {
            setLoading(false);
            onFailure && onFailure('Payment cancelled by user.');
          },
        },
      };

      const rzp = new window.Razorpay(options);

      /* ── Payment failed inside Razorpay (network/card decline etc.) ── */
      rzp.on('payment.failed', (response) => {
        setLoading(false);
        const msg =
          response.error?.description ||
          response.error?.reason ||
          'Payment failed. Please try again.';
        setError(msg);
        onFailure && onFailure(msg);
      });

      /* Open the checkout popup */
      rzp.open();

    } catch (err) {
      setLoading(false);
      setError(err.message);
      onFailure && onFailure(err.message);
    }
  }, []);

  return { openPayment, loading, error, setError };
};

export default useRazorpay;
