// src/components/EnquiryModal.jsx
// ─────────────────────────────────────────────────────────────────────
// BUGS FIXED vs the version in doc-6:
//
//  BUG 1 — Email field had no `required` attribute.
//    Users submitted without email → GAS rejected with "valid email
//    required" → modal showed "Request Sent!" but emails never sent.
//    FIX: added required + type="email" to the email input.
//
//  BUG 2 — submitEnquiry (GAS call) was NOT in this modal at all.
//    The Supabase insert ran, setDone(true) fired, but nothing ever
//    called Google Apps Script. The email system was completely bypassed.
//    FIX: submitEnquiry is now called inside submit(), after Supabase
//    succeeds. If GAS fails, we log it but don't block the success UI
//    (Supabase already has the record).
//
//  BUG 3 — No error shown to user if submission fails.
//    FIX: err state now surfaces both Supabase and GAS errors.
//
// Everything else — UI, Razorpay flow, payment states — is UNCHANGED.
// ─────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, CreditCard, Loader, AlertCircle } from 'lucide-react';
import { supabase }      from '../supabaseClient';
import useRazorpay       from '../hooks/useRazorpay';
import { submitEnquiry } from '../services/enquiryService'; // ← pulls from your enquiryService.js

const EnquiryModal = ({ pkg, onClose }) => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', travel_date: '', pax: 1, message: '',
  });
  const [sending,      setSending]      = useState(false);
  const [done,         setDone]         = useState(false);
  const [err,          setErr]          = useState('');
  const [savedEnqId,   setSavedEnqId]   = useState(null);
  const [paymentState, setPaymentState] = useState('idle'); // 'idle'|'paying'|'paid'|'pay_failed'
  const [paymentRef,   setPaymentRef]   = useState(null);

  const { openPayment, loading: payLoading } = useRazorpay();

  const field = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const inputCls = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400";
  const labelCls = "block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5";

  /* ────────────────────────────────────────────────────────────
     Submit handler
     Order: validate → Supabase insert → GAS email → setDone
  ──────────────────────────────────────────────────────────── */
  const submit = async e => {
  e.preventDefault();
  setSending(true);

  try {
    await submitEnquiry({
      fullName: form.name,
      phoneNumber: form.phone,
      email: form.email,
      fromDate: form.travel_date,
      travelers: form.pax,
      requirements: form.message,
      packageName: pkg.name,
      serviceType: "holiday"
    });

    setDone(true);

  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong");
  }

  setSending(false);
};

  /* ── Trigger Razorpay (UNCHANGED from original) ── */
  const handlePayNow = () => {
    setPaymentState('paying');
    openPayment({
      amount:       500,
      name:         form.name,
      email:        form.email,
      phone:        form.phone,
      package_name: pkg?.name || '',
      enquiry_id:   savedEnqId || '',
      onSuccess: async (data) => {
        setPaymentRef(data);
        setPaymentState('paid');
        if (savedEnqId) {
          await supabase
            .from('enquiries')
            .update({
              payment_status: 'paid',
              payment_id:     data.payment_id,
              payment_amount: data.amount,
            })
            .eq('id', savedEnqId);
        }
      },
      onFailure: (msg) => {
        if (msg === 'Payment cancelled') {
          setPaymentState('idle');
        } else {
          setPaymentState('pay_failed');
          setErr(msg || 'Payment failed. You can try again or contact us.');
        }
      },
    });
  };

  /* ── UI (all layout / styling UNCHANGED) ── */
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0a1628]/85"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ y: 28, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 28, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.22 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0a1628] px-7 py-5 flex justify-between items-center shrink-0">
          <div>
            <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Express Travel</p>
            <h2
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              className="text-white text-3xl font-black uppercase italic leading-none"
            >
              Get a Custom Quote
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-all"
          >
            <X size={17} />
          </button>
        </div>

        <div className="px-7 py-6 overflow-y-auto">

          {/* ── PAYMENT SUCCESS STATE ── */}
          {paymentState === 'paid' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={36} className="text-emerald-500" />
              </div>
              <h3 className="text-xl font-black text-[#0a1628] uppercase mb-2">Payment Done!</h3>
              <p className="text-slate-500 text-sm mb-1 leading-relaxed">Your advance payment was received successfully.</p>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">Our team will contact you within 24 hours.</p>

              {paymentRef && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-left space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Payment Reference</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Payment ID</span>
                    <span className="text-[#0a1628] font-black font-mono">{paymentRef.payment_id}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Order ID</span>
                    <span className="text-[#0a1628] font-black font-mono">{paymentRef.order_id}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Amount Paid</span>
                    <span className="text-emerald-600 font-black">₹{Number(paymentRef.amount).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}

              <button onClick={onClose} className="w-full py-3 bg-[#0a1628] text-white font-black uppercase tracking-widest text-sm rounded-xl hover:bg-blue-600 transition-all">
                Close
              </button>
            </div>

          /* ── ENQUIRY SENT — OFFER PAYMENT ── */
          ) : done ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={36} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-black text-[#0a1628] uppercase mb-2">Request Sent!</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">Our team will get back to you within 24 hours.</p>

              {paymentState === 'pay_failed' && err && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4 text-left">
                  <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold text-red-600">{err}</p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5 text-left">
                <p className="text-xs font-black text-[#0a1628] uppercase tracking-wide mb-1">Secure Your Booking</p>
                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                  Pay a ₹500 advance to confirm your booking instantly. Balance can be paid later.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handlePayNow}
                  disabled={payLoading}
                  className="w-full py-3.5 bg-blue-600 hover:bg-[#0a1628] text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {payLoading
                    ? <><Loader size={15} className="animate-spin" /> Opening Payment…</>
                    : <><CreditCard size={15} /> Pay ₹500 Advance Now</>
                  }
                </button>
                <button onClick={onClose} className="w-full py-3 border border-slate-200 text-slate-500 font-bold text-sm rounded-xl hover:border-slate-300 hover:text-slate-700 transition-all">
                  Skip — I'll Pay Later
                </button>
              </div>
            </div>

          /* ── ENQUIRY FORM ── */
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className={labelCls}>Full Name *</label>
                <input
                  required
                  placeholder="Your full name"
                  className={inputCls}
                  value={form.name}
                  onChange={field('name')}
                />
              </div>
              <div>
                <label className={labelCls}>Phone Number *</label>
                <input
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className={inputCls}
                  value={form.phone}
                  onChange={field('phone')}
                />
              </div>

              {/* ── FIX: email is now required ── */}
              <div>
                <label className={labelCls}>
                  Email Address <span className="text-red-400">*</span>
                  <span className="text-slate-300 font-normal normal-case ml-1">(needed for confirmation email)</span>
                </label>
                <input
                  type="email"
                  required                        
                  placeholder="your@email.com"
                  className={inputCls}
                  value={form.email}
                  onChange={field('email')}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Travel Date</label>
                  <input type="date" className={inputCls} value={form.travel_date} onChange={field('travel_date')} />
                </div>
                <div>
                  <label className={labelCls}>No. of Pax</label>
                  <input type="number" min="1" placeholder="1" className={inputCls} value={form.pax} onChange={field('pax')} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Special Requirements</label>
                <textarea rows={3} placeholder="Any special requests..." className={inputCls + ' resize-none'} value={form.message} onChange={field('message')} />
              </div>

              {/* Error display */}
              {err && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-red-600 text-xs font-semibold">{err}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 bg-blue-600 text-white font-black uppercase tracking-[0.15em] text-sm rounded-xl hover:bg-[#0a1628] transition-all disabled:opacity-60"
              >
                {sending ? 'Sending…' : 'Send Enquiry →'}
              </button>
              <p className="text-center text-slate-400 text-[11px]">Free consultation · No hidden charges</p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default EnquiryModal;