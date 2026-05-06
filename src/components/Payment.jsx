/**
 * Payment.jsx  —  src/components/Payment.jsx
 * Route: /payment
 *
 * Standalone payment page — used when navigating directly.
 * Also accepts pre-filled data via location.state (from any page).
 *
 * Navigate with pre-fill:
 *   navigate('/payment', {
 *     state: { name, email, phone, amount, package_name }
 *   });
 */

import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Shield, CreditCard, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import useRazorpay from '../hooks/useRazorpay';

const Payment = () => {
  const location = useLocation();
  const prefill  = location.state || {};

  const [form, setForm] = useState({
    name:         prefill.name         || '',
    email:        prefill.email        || '',
    phone:        prefill.phone        || '',
    amount:       prefill.amount       || '',
    package_name: prefill.package_name || '',
  });

  const [result, setResult] = useState(null);  // null | { success, data } | { success: false, msg }

  const { openPayment, loading, error, setError } = useRazorpay();

  const field = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const inputCls = "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400";
  const labelCls = "block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    openPayment({
      ...form,
      onSuccess: (data) => setResult({ success: true,  data }),
      onFailure: (msg)  => {
        if (msg !== 'Payment cancelled') {
          setResult({ success: false, msg });
        }
      },
    });
  };

  /* ── Success screen ── */
  if (result?.success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="bg-emerald-600 px-7 py-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={36} className="text-white" />
            </div>
            <h1 style={{ fontFamily:"'Barlow Condensed', sans-serif" }}
              className="text-white text-3xl font-black uppercase italic">Payment Successful</h1>
            <p className="text-emerald-100 text-sm mt-2">Your payment has been received.</p>
          </div>
          <div className="px-7 py-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Reference</p>
              {[
                ['Payment ID', result.data.payment_id],
                ['Order ID',   result.data.order_id],
                ['Amount',     `₹${Number(result.data.amount).toLocaleString('en-IN')}`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                  <span className="text-slate-500 font-medium">{label}</span>
                  <span className="text-[#0a1628] font-black font-mono text-xs">{value}</span>
                </div>
              ))}
            </div>
            <Link to="/"
              className="w-full flex items-center justify-center py-3.5 bg-[#0a1628] text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── Payment form ── */
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#0a1628] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Shield size={13} /> Secure Payment
          </div>
          <h1 style={{ fontFamily:"'Barlow Condensed', sans-serif" }}
            className="text-[#0a1628] text-4xl font-black uppercase italic">
            Express Travel
          </h1>
          <p className="text-slate-500 text-sm mt-1">Powered by Razorpay · 256-bit SSL</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="bg-[#0a1628] px-7 py-5">
            <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-1">Payment Details</p>
            <h2 style={{ fontFamily:"'Barlow Condensed', sans-serif" }}
              className="text-white text-2xl font-black uppercase italic">
              {prefill.package_name || 'Online Payment'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="px-7 py-6 space-y-4">
            <div>
              <label className={labelCls}>Full Name *</label>
              <input required placeholder="Your full name" className={inputCls}
                value={form.name} onChange={field('name')} />
            </div>
            <div>
              <label className={labelCls}>Email Address *</label>
              <input required type="email" placeholder="your@email.com" className={inputCls}
                value={form.email} onChange={field('email')} />
            </div>
            <div>
              <label className={labelCls}>Phone Number *</label>
              <input required placeholder="+91 XXXXX XXXXX" className={inputCls}
                value={form.phone} onChange={field('phone')} />
            </div>
            <div>
              <label className={labelCls}>Amount (₹) *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                <input required type="number" min="1" step="0.01" placeholder="0.00"
                  className={inputCls + ' pl-8'}
                  value={form.amount} onChange={field('amount')} />
              </div>
            </div>

            {(error || result?.msg) && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-red-600">{error || result?.msg}</p>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-[#0a1628] text-white font-black text-sm uppercase tracking-[0.15em] rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
              {loading
                ? <><Loader size={16} className="animate-spin" /> Opening Payment…</>
                : <><CreditCard size={16} /> Pay Now</>}
            </button>

            <div className="flex items-center justify-center gap-2 pt-1">
              <Shield size={13} className="text-slate-300" />
              <span className="text-[11px] text-slate-400 font-medium">
                Secured by Razorpay · PCI DSS Compliant
              </span>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          <Link to="/" className="hover:text-blue-600 transition-colors">← Back to Express Travel</Link>
        </p>
      </div>
    </div>
  );
};

export default Payment;