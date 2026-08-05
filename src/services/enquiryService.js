// src/services/enquiryService.js

const GAS_URL = import.meta.env.VITE_GAS_URL;

/**
 * Submit enquiry data to Google Apps Script Web App.
 *
 * @param {Object} formData
 * @returns {{ success: boolean, message: string }}
 */
export const submitEnquiry = async (formData) => {
  if (!GAS_URL) {
    throw new Error(
      "VITE_GAS_URL is not set. Add it to your .env file and restart the dev server."
    );
  }

  // Validate email
  const email = (formData.email || "").trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error(
      "A valid email address is required to send you a confirmation."
    );
  }

  // Validate name
  const name = (formData.fullName || formData.name || "").trim();
  if (!name) {
    throw new Error("Your name is required.");
  }

  let response;

  try {
    response = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(formData),
      redirect: "follow",
    });
  } catch {
    throw new Error(
      "Could not connect to the server. Please check your internet connection."
    );
  }

  if (!response.ok) {
    throw new Error("Server error. Please try again in a moment.");
  }

  try {
    const data = await response.json();

    if (data.success === false) {
      throw new Error(data.message || "Submission failed.");
    }

    return {
      success: true,
      message:
        data.message ||
        "Enquiry submitted! We'll be in touch within 24–48 hours.",
    };
  } catch {
    return {
      success: true,
      message:
        "Enquiry submitted! We'll be in touch within 24–48 hours.",
    };
  }
};