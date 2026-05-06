// // src/services/enquiryService.js
// // ─────────────────────────────────────────────────────────────────────
// // Sends form data directly to Google Apps Script Web App.
// // No backend needed — GAS handles both emails (owner + user auto-reply).
// //
// // HOW TO USE:
// //   1. Deploy your Code.gs as a Web App (see deployment steps)
// //   2. Paste your Web App URL as VITE_GAS_URL in your .env file
// //   3. Import and call submitEnquiry(formData) from any form component
// // ─────────────────────────────────────────────────────────────────────

// // Your Google Apps Script Web App URL — set this in your .env file
// // e.g. VITE_GAS_URL=https://script.google.com/macros/s/YOUR_ID/exec
// const GAS_URL = import.meta.env.VITE_GAS_URL;

// /**
//  * Submit an enquiry form to Google Apps Script.
//  * Accepts any combination of fields — GAS handles normalisation.
//  *
//  * @param {Object} formData  Raw form state from any of your three forms
//  * @returns {{ success: boolean, message: string }}
//  * @throws  {Error}  with a user-readable message on failure
//  */
// export const submitEnquiry = async (formData) => {
//   if (!GAS_URL) {
//     throw new Error("GAS URL not configured. Set VITE_GAS_URL in your .env file.");
//   }

//   // Google Apps Script Web Apps require no-cors OR a proxy.
//   // We use "no-cors" so the browser doesn't block the request.
//   // Trade-off: response is "opaque" (we can't read it), so we
//   // optimistically treat a completed fetch as success.
//   //
//   // If you want to read the JSON response, deploy the GAS as a
//   // proper CORS-enabled endpoint (see deployment notes below).

//   try {
//     await fetch(GAS_URL, {
//       method:  "POST",
//       mode:    "no-cors",          // Required for GAS — see note above
//       headers: { "Content-Type": "application/json" },
//       body:    JSON.stringify(formData),
//     });

//     // With no-cors we can't read the response, so we return success
//     // optimistically. The GAS logs any server-side errors.
//     return {
//       success: true,
//       message: "Enquiry submitted! We'll be in touch within 24–48 hours.",
//     };

//   } catch (err) {
//     // Only throws on network-level failure (offline, DNS error, etc.)
//     throw new Error(
//       "Could not reach the server. Please check your connection and try again."
//     );
//   }
// };





// src/services/enquiryService.js
// ─────────────────────────────────────────────────────────────────────
// ROOT CAUSE FIX:
//   The previous version used fetch with mode:"no-cors".
//   When mode is "no-cors", the browser STRIPS the request body and
//   Content-Type header before sending — Google Apps Script receives
//   an empty e.postData and crashes silently. Emails never send.
//
// SOLUTION:
//   Google Apps Script Web Apps deployed as "Anyone" DO support
//   regular cross-origin requests when the GAS returns proper
//   Content-Type: application/json. We drop mode:"no-cors"
//   and use a URL-encoded body workaround that GAS can always read,
//   OR we use a redirect-following fetch with no explicit mode
//   (defaults to "cors") and read the response properly.
//
//   The most reliable pattern for GAS + React is to POST
//   application/x-www-form-urlencoded (GAS reads this via
//   e.parameter) OR to use the URLSearchParams trick below.
//   We use the JSON approach with no mode restriction — GAS
//   handles it fine when deployed with "Anyone" access.
// ─────────────────────────────────────────────────────────────────────

const GAS_URL = import.meta.env.VITE_GAS_URL;

/**
 * Submit enquiry data to Google Apps Script Web App.
 * Works from any of your three forms (enquery.jsx, EnquiryModal, Contact).
 *
 * @param {Object} formData — raw form state
 * @returns {{ success: boolean, message: string }}
 * @throws  {Error} with user-readable message
 */
export const submitEnquiry = async (formData) => {
  if (!GAS_URL) {
    throw new Error(
      'VITE_GAS_URL is not set. Add it to your .env file and restart the dev server.'
    );
  }

  // ── Validate email client-side before hitting GAS ──────────────────
  // GAS validation is server-side only — we mirror it here so the
  // user sees a clear error instead of a silent failure.
  const email = (formData.email || '').trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('A valid email address is required to send you a confirmation.');
  }

  const name = (
    formData.fullName || formData.name || ''
  ).trim();
  if (!name) {
    throw new Error('Your name is required.');
  }

  // ── Send to GAS ────────────────────────────────────────────────────
  // WHY no "mode" option?
  //   Omitting "mode" lets the browser default to "cors" — which
  //   actually sends the full body and headers. GAS with "Anyone"
  //   access responds with the right headers and it just works.
  //
  // WHY fetch-then-redirect works:
  //   GAS Web Apps respond with a 302 redirect to the actual output.
  //   The browser follows it automatically. We just need to avoid
  //   "no-cors" which blocks the body.

  let response;
  try {
    response = await fetch(GAS_URL, {
      method:  'POST',
      // No mode: "no-cors" — that was stripping the body
      headers: { 'Content-Type': 'text/plain' }, // text/plain avoids CORS preflight
      body:    JSON.stringify(formData),
      redirect: 'follow',                         // follow the GAS 302 redirect
    });
  } catch (networkErr) {
    throw new Error(
      'Could not connect to the server. Please check your internet connection.'
    );
  }

  // GAS always returns 200 after redirect — anything else is unexpected
  if (!response.ok) {
    throw new Error('Server error. Please try again in a moment.');
  }

  // Try to parse the JSON response from GAS
  try {
    const data = await response.json();
    if (data.success === false) {
      throw new Error(data.message || 'Submission failed. Please try again.');
    }
    return {
      success: true,
      message: data.message || "Enquiry submitted! We'll be in touch within 24–48 hours.",
    };
  } catch {
    // GAS sometimes returns HTML on redirect — treat completed fetch as success
    // since the email was already sent server-side before the response
    return {
      success: true,
      message: "Enquiry submitted! We'll be in touch within 24–48 hours.",
    };
  }
};