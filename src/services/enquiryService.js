// src/services/enquiryService.js
// ─────────────────────────────────────────────────────────────────────
// Sends form data directly to Google Apps Script Web App.
// No backend needed — GAS handles both emails (owner + user auto-reply).
//
// HOW TO USE:
//   1. Deploy your Code.gs as a Web App (see deployment steps)
//   2. Paste your Web App URL as VITE_GAS_URL in your .env file
//   3. Import and call submitEnquiry(formData) from any form component
// ─────────────────────────────────────────────────────────────────────

// Your Google Apps Script Web App URL — set this in your .env file
// e.g. VITE_GAS_URL=https://script.google.com/macros/s/YOUR_ID/exec
const GAS_URL = import.meta.env.VITE_GAS_URL;

/**
 * Submit an enquiry form to Google Apps Script.
 * Accepts any combination of fields — GAS handles normalisation.
 *
 * @param {Object} formData  Raw form state from any of your three forms
 * @returns {{ success: boolean, message: string }}
 * @throws  {Error}  with a user-readable message on failure
 */
export const submitEnquiry = async (formData) => {
  if (!GAS_URL) {
    throw new Error("GAS URL not configured. Set VITE_GAS_URL in your .env file.");
  }

  // Google Apps Script Web Apps require no-cors OR a proxy.
  // We use "no-cors" so the browser doesn't block the request.
  // Trade-off: response is "opaque" (we can't read it), so we
  // optimistically treat a completed fetch as success.
  //
  // If you want to read the JSON response, deploy the GAS as a
  // proper CORS-enabled endpoint (see deployment notes below).

  try {
    await fetch(GAS_URL, {
      method:  "POST",
      mode:    "no-cors",          // Required for GAS — see note above
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(formData),
    });

    // With no-cors we can't read the response, so we return success
    // optimistically. The GAS logs any server-side errors.
    return {
      success: true,
      message: "Enquiry submitted! We'll be in touch within 24–48 hours.",
    };

  } catch (err) {
    // Only throws on network-level failure (offline, DNS error, etc.)
    throw new Error(
      "Could not reach the server. Please check your connection and try again."
    );
  }
};