// /**
//  * useRazorpay.js  —  src/hooks/useRazorpay.js
//  *
//  * Reusable hook that:
//  *  1. Dynamically loads Razorpay JS SDK (no npm package needed)
//  *  2. Creates order via your backend
//  *  3. Opens Razorpay payment popup
//  *  4. Verifies payment on success
//  *  5. Returns result to caller
//  *
//  * Usage:
//  *   const { openPayment, loading, error } = useRazorpay();
//  *
//  *   await openPayment({
//  *     amount:       5000,          // in ₹ (NOT paise)
//  *     name:         'John Doe',
//  *     email:        'john@email.com',
//  *     phone:        '9876543210',
//  *     package_name: 'Andaman Unlimited',
//  *     enquiry_id:   'abc-123',
//  *     onSuccess:    (data) => console.log('Paid!', data),
//  *     onFailure:    (err)  => console.log('Failed', err),
//  *   });
//  */

// import { useState, useCallback } from 'react';

// const API_BASE = import.meta.env.VITE_PAYMENT_API_URL || 'http://localhost:3001';

// /* Load Razorpay script dynamically — only once */
// const loadRazorpayScript = () =>
//   new Promise((resolve) => {
//     if (window.Razorpay) { resolve(true); return; }
//     const script    = document.createElement('script');
//     script.src      = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onload   = () => resolve(true);
//     script.onerror  = () => resolve(false);
//     document.body.appendChild(script);
//   });

// const useRazorpay = () => {
//   const [loading, setLoading] = useState(false);
//   const [error,   setError]   = useState('');

//   const openPayment = useCallback(async ({
//     amount,
//     name,
//     email   = '',
//     phone,
//     package_name = '',
//     enquiry_id   = '',
//     onSuccess,
//     onFailure,
//   }) => {
//     setError('');
//     setLoading(true);

//     try {
//       /* Step 1: Load Razorpay SDK */
//       const sdkLoaded = await loadRazorpayScript();
//       if (!sdkLoaded) throw new Error('Razorpay SDK failed to load. Check your internet connection.');

//       /* Step 2: Create order on backend */
//       const orderRes = await fetch(`${API_BASE}/api/payment/create-order`, {
//         method:  'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ amount, name, email, phone, package_name, enquiry_id }),
//       });
//       const orderData = await orderRes.json();
//       if (!orderRes.ok) throw new Error(orderData.error || 'Could not create payment order');

//       /* Step 3: Open Razorpay checkout popup */
//       const options = {
//         key:          orderData.key_id,
//         amount:       orderData.amount,         // in paise from server
//         currency:     orderData.currency,
//         name:         'Express Travel Corporate Services',
//         description:  package_name || 'Tour Package Payment',
//         image:        '/logo.png',              // your logo — put in /public folder
//         order_id:     orderData.order_id,

//         /* Pre-fill customer details */
//         prefill: { name, email, contact: phone },

//         /* Razorpay theme matching your brand */
//         theme: { color: '#2563EB' },

//         /* ✅ Payment successful */
//         handler: async (response) => {
//           try {
//             /* Step 4: Verify signature on backend */
//             const verifyRes = await fetch(`${API_BASE}/api/payment/verify`, {
//               method:  'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({
//                 razorpay_order_id:   response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature:  response.razorpay_signature,
//               }),
//             });
//             const verifyData = await verifyRes.json();

//             if (verifyData.success) {
//               onSuccess && onSuccess({
//                 payment_id: response.razorpay_payment_id,
//                 order_id:   response.razorpay_order_id,
//                 amount:     amount,
//               });
//             } else {
//               throw new Error('Payment verification failed');
//             }
//           } catch (err) {
//             onFailure && onFailure(err.message);
//             setError(err.message);
//           } finally {
//             setLoading(false);
//           }
//         },

//         /* Modal closed without payment */
//         modal: {
//           ondismiss: () => {
//             setLoading(false);
//             onFailure && onFailure('Payment cancelled');
//           },
//         },
//       };

//       const rzp = new window.Razorpay(options);

//       /* Payment failed inside Razorpay */
//       rzp.on('payment.failed', (response) => {
//         setLoading(false);
//         const msg = response.error?.description || 'Payment failed';
//         setError(msg);
//         onFailure && onFailure(msg);
//       });

//       rzp.open();

//     } catch (err) {
//       setLoading(false);
//       setError(err.message);
//       onFailure && onFailure(err.message);
//     }
//   }, []);

//   return { openPayment, loading, error, setError };
// };

// export default useRazorpay;





/**
 * useRazorpay.js  —  src/hooks/useRazorpay.js
 */

import { useState, useCallback } from 'react';

const API_BASE = import.meta.env.VITE_PAYMENT_API_URL || 'http://localhost:3001';

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script    = document.createElement('script');
    script.src      = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload   = () => resolve(true);
    script.onerror  = () => resolve(false);
    document.body.appendChild(script);
  });

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
    setError('');
    setLoading(true);

    try {
      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded) throw new Error('Razorpay SDK failed to load. Check your internet connection.');

      const orderRes = await fetch(`${API_BASE}/api/payment/create-order`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, name, email, phone, package_name, enquiry_id }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || 'Could not create payment order');

      const options = {
        key:         orderData.key_id,
        amount:      orderData.amount,
        currency:    orderData.currency,
        name:        'Express Travel Corporate Services',
        description: package_name || 'Tour Package Payment',
        image:       '/logo.png',
        order_id:    orderData.order_id,
        prefill:     { name, email, contact: phone },
        theme:       { color: '#2563EB' },

        handler: async (response) => {
          try {
            // ── Pass customer details so backend can store them ──
            const verifyRes = await fetch(`${API_BASE}/api/payment/verify`, {
              method:  'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id:   response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature:  response.razorpay_signature,
                // customer fields for Supabase storage
                name,
                email,
                phone,
                amount,
                package_name,
              }),
            });
            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              onSuccess && onSuccess({
                payment_id: response.razorpay_payment_id,
                order_id:   response.razorpay_order_id,
                amount,
              });
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (err) {
            onFailure && onFailure(err.message);
            setError(err.message);
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
            onFailure && onFailure('Payment cancelled');
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', (response) => {
        setLoading(false);
        const msg = response.error?.description || 'Payment failed';
        setError(msg);
        onFailure && onFailure(msg);
      });

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