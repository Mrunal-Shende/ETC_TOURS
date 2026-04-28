/**
 * PaymentModal.jsx  —  src/components/PaymentModal.jsx
 *
 * Standalone Razorpay payment modal.
 * Triggered by the "Pay Online" button in the Header.
 * Completely self-contained — no page navigation needed.
 *
 * Usage:
 *   import PaymentModal from './PaymentModal';
 *   const [showPayment, setShowPayment] = useState(false);
 *   <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} />
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, CreditCard, CheckCircle, AlertCircle,
  Loader, Shield, ArrowLeft
} from 'lucide-react';
import useRazorpay from '../hooks/useRazorpay';

/* ── tiny input/label style helpers ── */
const inputCls = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400";
const labelCls = "block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5";

/* ════════════════════════════════════════════
   STEP 1 — Payment form
════════════════════════════════════════════ */
const PaymentForm = ({ onSuccess, onClose }) => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', amount: '',
  });
  const [formErr, setFormErr] = useState('');
  const { openPayment, loading, error } = useRazorpay();

  const field = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErr('');

    if (!form.name.trim())  return setFormErr('Please enter your full name.');
    if (!form.phone.trim()) return setFormErr('Please enter your phone number.');
    if (!form.email.trim()) return setFormErr('Please enter your email address.');
    if (!form.amount || Number(form.amount) < 1)
      return setFormErr('Please enter a valid amount.');

    openPayment({
      name:    form.name,
      email:   form.email,
      phone:   form.phone,
      amount:  Number(form.amount),
      package_name: 'Direct Payment',
      onSuccess: (data) => onSuccess({ ...data, amount: form.amount }),
      onFailure: (msg) => {
        // "Payment cancelled" = user closed popup — silently ignore
        if (msg && msg !== 'Payment cancelled') {
          setFormErr(msg);
        }
      },
    });
  };

  const displayErr = formErr || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <label className={labelCls}>Email Address *</label>
        <input
          required
          type="email"
          placeholder="your@email.com"
          className={inputCls}
          value={form.email}
          onChange={field('email')}
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

      <div>
        <label className={labelCls}>Amount (₹) *</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm select-none">
            ₹
          </span>
          <input
            required
            type="number"
            min="1"
            step="1"
            placeholder="0"
            className={inputCls + ' pl-8'}
            value={form.amount}
            onChange={field('amount')}
          />
        </div>
        <p className="text-[11px] text-slate-400 font-medium mt-1.5">
          Enter the exact amount as advised by our team.
        </p>
      </div>

      {/* Error */}
      {displayErr && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-red-600 leading-snug">{displayErr}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-blue-600 hover:bg-[#0a1628] text-white font-black text-[11px] uppercase tracking-[0.18em] rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <><Loader size={15} className="animate-spin" /> Opening Payment…</>
        ) : (
          <><CreditCard size={15} /> Proceed to Pay</>
        )}
      </button>

      {/* Trust line */}
      <div className="flex items-center justify-center gap-2">
        <Shield size={12} className="text-slate-300" />
        <span className="text-[11px] text-slate-400 font-medium">
          Secured by Razorpay · PCI DSS Compliant
        </span>
      </div>
    </form>
  );
};

/* ════════════════════════════════════════════
   STEP 2 — Success screen
════════════════════════════════════════════ */
const PaymentSuccess = ({ data, onClose }) => (
  <div className="text-center py-6">
    {/* Animated checkmark */}
    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
      <CheckCircle size={44} className="text-emerald-500" />
    </div>

    <h3
      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      className="text-2xl font-black text-[#0a1628] uppercase italic mb-2"
    >
      Payment Successful!
    </h3>
    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
      Your payment has been received. Our team will contact you shortly.
    </p>

    {/* Reference details */}
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-left space-y-3">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
        Payment Reference
      </p>
      {[
        ['Payment ID', data.payment_id],
        ['Order ID',   data.order_id],
        ['Amount Paid', `₹${Number(data.amount).toLocaleString('en-IN')}`],
      ].map(([label, value]) => (
        <div key={label} className="flex items-center justify-between border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
          <span className="text-sm font-medium text-slate-500">{label}</span>
          <span className={`text-xs font-black font-mono ${label === 'Amount Paid' ? 'text-emerald-600' : 'text-[#0a1628]'}`}>
            {value}
          </span>
        </div>
      ))}
    </div>

    <p className="text-[11px] text-slate-400 mb-5 leading-relaxed">
      📌 Please save your Payment ID for future reference.
    </p>

    <button
      onClick={onClose}
      className="w-full py-3.5 bg-[#0a1628] hover:bg-blue-600 text-white font-black text-[11px] uppercase tracking-[0.18em] rounded-xl transition-all"
    >
      Done
    </button>
  </div>
);

/* ════════════════════════════════════════════
   MAIN MODAL
════════════════════════════════════════════ */
const PaymentModal = ({ isOpen, onClose }) => {
  const [successData, setSuccessData] = useState(null);

  const handleClose = () => {
    // Reset state when closing
    setSuccessData(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#0a1628]/80"
          onClick={e => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="bg-white w-full max-w-[420px] rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* ── Modal header ── */}
            <div className="bg-[#0a1628] px-7 py-5 flex justify-between items-center shrink-0">
              <div>
                <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                  Express Travel
                </p>
                <h2
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  className="text-white text-3xl font-black uppercase italic leading-none"
                >
                  {successData ? 'Payment Done' : 'Pay Online'}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-all"
              >
                <X size={17} />
              </button>
            </div>

            {/* ── Modal body ── */}
            <div className="px-7 py-6 overflow-y-auto flex-1">
              <AnimatePresence mode="wait">
                {successData ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PaymentSuccess data={successData} onClose={handleClose} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-sm text-slate-500 font-medium mb-5 leading-relaxed">
                      Enter your details and the payment amount as advised by our travel consultant.
                    </p>
                    <PaymentForm
                      onSuccess={(data) => setSuccessData(data)}
                      onClose={handleClose}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;