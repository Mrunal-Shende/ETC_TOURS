


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane, Hotel, Utensils, Activity, Car,
  Quote, Ship, Star, X, ChevronRight, MapPin, Clock, ArrowRight
} from 'lucide-react';
import { supabase } from '../supabaseClient';

/* ─────────────────────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────────────────────── */
const inclusions = [
  { icon: <Plane    size={18} />, text: 'Flights'    },
  { icon: <Hotel    size={18} />, text: 'Hotels'     },
  { icon: <Utensils size={18} />, text: 'Meals'      },
  { icon: <Activity size={18} />, text: 'Activities' },
  { icon: <Car      size={18} />, text: 'Transfers'  },
];

const testimonials = [
  {
    init: 'JM', name: 'Jestin Mathew',
    text: 'We would like to appreciate your good office for arranging travel trip to Maldives for our Director, Mr Walfred Tagor...',
  },
  {
    init: 'RB', name: 'Ramesh Babu',
    text: 'Dear Sir, We had arranged a vehicle for Mr. Swithun Manoharan - Executive Vice President. The service was impeccable.',
  },
  {
    init: 'SK', name: 'Santosh Krinsky',
    text: 'I wanted to take the opportunity to thank you for your efforts in making our trip so comfortable and memorable.',
  },
];

/* ─────────────────────────────────────────────────────────────
   ENQUIRY MODAL (unchanged)
───────────────────────────────────────────────────────────── */
const EnquiryModal = ({ pkg, onClose }) => {
  const [form, setForm]       = useState({ name: '', phone: '', email: '', travel_date: '', pax: 1, message: '' });
  const [sending, setSending] = useState(false);
  const [done, setDone]       = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await supabase.from('enquiries').insert({ ...form, package_id: pkg.id });
    setDone(true);
    setSending(false);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="bg-white w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto rounded-none"
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
      >
        <div className="bg-slate-900 text-white px-6 py-5 flex items-start justify-between">
          <div>
            <h3 className="font-black text-lg uppercase tracking-tight">Enquire Now</h3>
            <p className="text-blue-300 text-[10px] font-bold mt-0.5 uppercase tracking-wider line-clamp-1">{pkg.name}</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white mt-1"><X size={20} /></button>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <Star size={28} className="text-blue-600" />
            </div>
            <h3 className="font-black text-slate-900 text-xl mb-2">Enquiry Sent!</h3>
            <p className="text-slate-500 text-sm mb-6">Our team will contact you within 24 hours.</p>
            <button onClick={onClose}
              className="bg-blue-600 text-white px-8 py-3 font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="field-label">Full Name *</label>
              <input type="text" required placeholder="Your name"
                value={form.name} onChange={set('name')} className="field-input" />
            </div>
            <div>
              <label className="field-label">Phone *</label>
              <input type="tel" required placeholder="+91 98765 43210"
                value={form.phone} onChange={set('phone')} className="field-input" />
            </div>
            <div>
              <label className="field-label">Email</label>
              <input type="email" placeholder="you@email.com"
                value={form.email} onChange={set('email')} className="field-input" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="field-label">Travel Date</label>
                <input type="date" value={form.travel_date} onChange={set('travel_date')} className="field-input" />
              </div>
              <div>
                <label className="field-label">No. of Persons</label>
                <input type="number" min="1" value={form.pax} onChange={set('pax')} className="field-input" />
              </div>
            </div>
            <div>
              <label className="field-label">Message</label>
              <textarea rows={3} placeholder="Any special requirements..."
                value={form.message} onChange={set('message')}
                className="field-input resize-none" />
            </div>
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={sending}
                className="flex-1 bg-blue-600 text-white py-3 font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 disabled:bg-blue-300 transition-colors">
                {sending ? 'Sending...' : 'Send Enquiry'}
              </button>
              <button type="button" onClick={onClose}
                className="px-5 border border-gray-200 text-slate-500 font-medium text-sm hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        )}

        <style>{`
          .field-label { display:block; color:#64748b; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; margin-bottom:6px; }
          .field-input  { width:100%; border:1px solid #e5e7eb; padding:10px 12px; font-size:14px; color:#1e293b; outline:none; transition:border-color .2s; }
          .field-input:focus { border-color:#3b82f6; }
        `}</style>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   PREMIUM PACKAGE CARD
───────────────────────────────────────────────────────────── */
const PackageCard = ({ pkg, catImage, index, onEnquire }) => {
  const [hov, setHov] = useState(false);
  const imgSrc = pkg.image_url || catImage || null;
  const daysLabel = pkg.nights ? `${pkg.nights + 1}D / ${pkg.nights}N` : '';
  const highlights = Array.isArray(pkg.highlights) ? pkg.highlights
    : typeof pkg.highlights === 'string' ? pkg.highlights.split(',').map(h => h.trim()).filter(Boolean) : [];

  return (
    <motion.div
      className="cat-pkg-card"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Shine accent bar */}
      <div className={`cat-card-accent ${hov ? 'cat-card-accent-on' : ''}`} />

      {/* Image */}
      <div className="cat-card-img-wrap">
        {imgSrc
          ? <img src={imgSrc} alt={pkg.name} className={`cat-card-img ${hov ? 'cat-card-img-hov' : ''}`} />
          : <div className="cat-card-img cat-card-img-ph"><Ship size={40} className="text-blue-200" /></div>
        }
        <div className="cat-card-overlay" />

        {/* Badges */}
        {pkg.price && (
          <div className="cat-price-badge">
            <span className="cat-price-from">from</span>
            <span className="cat-price-amt">₹{Number(pkg.price).toLocaleString()}</span>
          </div>
        )}
        {daysLabel && <div className="cat-days-badge">{daysLabel}</div>}

        {/* Title over image */}
        <div className="cat-card-img-footer">
          <h3 className="cat-card-title">{pkg.name}</h3>
          {pkg.description && <p className="cat-card-subdesc">{pkg.description}</p>}
        </div>
      </div>

      {/* Body */}
      <div className="cat-card-body">
        {pkg.route_covering && (
          <div className="cat-route-row">
            <MapPin size={10} className="cat-route-icon" />
            <span className="cat-route-txt">{pkg.route_covering}</span>
          </div>
        )}

        {highlights.length > 0 && (
          <div className="cat-hl-wrap">
            <span className="cat-hl-label">Highlights</span>
            <div className="cat-hl-tags">
              {highlights.slice(0, 3).map((h, i) => (
                <span key={i} className="cat-hl-tag">{h}</span>
              ))}
              {highlights.length > 3 && (
                <span className="cat-hl-tag cat-hl-more">+{highlights.length - 3}</span>
              )}
            </div>
          </div>
        )}

        {pkg.start_city && (
          <p className="cat-start-city">Departs: <span>{pkg.start_city}</span></p>
        )}

        {/* Actions */}
        <div className="cat-card-actions">
          <button
            onClick={() => onEnquire(pkg)}
            className={`cat-enquire-btn ${hov ? 'cat-enquire-btn-hov' : ''}`}
          >
            <span>Enquire Now</span>
            <ArrowRight size={13} className="cat-btn-arrow" />
          </button>
          <Link to={`/package/${pkg.id}`} className="cat-view-btn">
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
const CategoryPage = ({ type = 'india' }) => {
  const { slug }    = useParams();
  const navigate    = useNavigate();

  const [cat, setCat]           = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [enquiry, setEnquiry]   = useState(null);
  const [testIdx, setTestIdx]   = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTestIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data: catData } = await supabase
        .from('tour_categories')
        .select('*')
        .eq('slug', slug)
        .eq('type', type)
        .single();

      if (!catData) {
        navigate(type === 'india' ? '/tours/india' : '/tours/international');
        return;
      }
      setCat(catData);

      const { data: pkgData } = await supabase
        .from('tour_packages')
        .select('*')
        .eq('category_id', catData.id)
        .eq('is_active', true)
        .order('display_order');

      setPackages(pkgData || []);
      setLoading(false);
    };
    load();
  }, [slug, type]);

  /* Loading skeleton */
  if (loading) {
    return (
      <div className="cat-page-root">
        <div className="cat-hero-skeleton">
          <div className="cat-skel-inner">
            <div className="cat-skel-bar" style={{ width: 120, height: 10 }} />
            <div className="cat-skel-bar" style={{ width: '60%', height: 72, marginTop: 16 }} />
            <div className="cat-skel-bar" style={{ width: '80%', height: 14, marginTop: 16 }} />
            <div className="cat-skel-bar" style={{ width: '55%', height: 14, marginTop: 8 }} />
          </div>
          <div className="cat-skel-img" />
        </div>
        <div className="cat-page-inner">
          <div className="cat-grid" style={{ marginTop: 48 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="cat-pkg-card" style={{ minHeight: 380 }}>
                <div className="cat-skel-bar" style={{ height: 210 }} />
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[70, 85, 50].map((w, j) => (
                    <div key={j} className="cat-skel-bar" style={{ height: 9, width: `${w}%` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!cat) return null;

  const backLink  = type === 'india' ? '/tours/india' : '/tours/international';
  const backLabel = type === 'india' ? 'India Tours' : 'International Tours';

  const words = cat.name.split(' ');
  const half  = Math.ceil(words.length / 2);
  const line1 = words.slice(0, half).join(' ');
  const line2 = words.slice(half).join(' ');

  return (
    <div className="cat-page-root">

      {/* ══════════════════════════════════════════
          CINEMATIC HERO SECTION
      ══════════════════════════════════════════ */}
      <div className="cat-hero">
        {/* Background image layer */}
        {cat.image_url && (
          <div className="cat-hero-bg">
            <img src={cat.image_url} alt={cat.name} className="cat-hero-bg-img" />
            <div className="cat-hero-bg-overlay" />
          </div>
        )}

        {/* Animated grid pattern */}
        <div className="cat-hero-grid" />

        {/* Floating orbs */}
        <div className="cat-hero-orb cat-hero-orb-1" />
        <div className="cat-hero-orb cat-hero-orb-2" />

        <div className="cat-page-inner cat-hero-inner">

          {/* Breadcrumb */}
          <motion.div
            className="cat-breadcrumb"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/" className="cat-bc-link">Home</Link>
            <ChevronRight size={11} />
            <Link to={backLink} className="cat-bc-link">{backLabel}</Link>
            <ChevronRight size={11} />
            <span className="cat-bc-active">{cat.name}</span>
          </motion.div>

          {/* Back button */}
          <motion.button
            onClick={() => window.history.length > 1 ? navigate(-1) : navigate(backLink)}
            className="cat-back-btn"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="cat-back-icon">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </span>
            Back
          </motion.button>

          {/* Hero content */}
          <div className="cat-hero-content">
            <motion.div
              className="cat-hero-text"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {/* Eyebrow */}
              <div className="cat-eyebrow">
                <span className="cat-eyebrow-line" />
                <span className="cat-eyebrow-txt">{cat.tagline || cat.name}</span>
              </div>

              {/* Heading */}
              <h1 className="cat-heading">
                <span className="cat-heading-line1">{line1}</span>
                {line2 && <span className="cat-heading-line2">{line2}</span>}
              </h1>

              {/* Description */}
              <p className="cat-hero-desc">
                {cat.description ||
                  `Explore the breathtaking beauty of ${cat.name} with our expertly curated packages, crafted for unforgettable memories.`}
              </p>

              {/* Stats strip */}
              <div className="cat-stats-strip">
                <div className="cat-stat">
                  <span className="cat-stat-num">{packages.length}+</span>
                  <span className="cat-stat-label">Packages</span>
                </div>
                <div className="cat-stat-divider" />
                <div className="cat-stat">
                  <span className="cat-stat-num">100%</span>
                  <span className="cat-stat-label">Customisable</span>
                </div>
                <div className="cat-stat-divider" />
                <div className="cat-stat">
                  <span className="cat-stat-num">24/7</span>
                  <span className="cat-stat-label">Support</span>
                </div>
              </div>

              {/* Inclusions pills */}
              <div className="cat-inclusions">
                {inclusions.map((inc, i) => (
                  <motion.div
                    key={i}
                    className="cat-inclusion-pill"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.07 }}
                  >
                    {inc.icon}
                    <span>{inc.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero image card */}
            <motion.div
              className="cat-hero-img-card"
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {cat.image_url
                ? <img src={cat.image_url} alt={cat.name} className="cat-hero-img" />
                : <div className="cat-hero-img cat-hero-img-ph"><Ship size={80} className="text-blue-200" /></div>
              }
              <div className="cat-hero-img-overlay" />

              {/* Floating badge on card */}
              <div className="cat-hero-img-badge">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span>Top Destination</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PACKAGES SECTION
      ══════════════════════════════════════════ */}
      <div className="cat-packages-section">
        <div className="cat-page-inner">

          {/* Section header */}
          <motion.div
            className="cat-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="cat-section-label-row">
              <span className="cat-section-line" />
              <span className="cat-section-label-txt">
                {cat.name} Packages
              </span>
              <span className="cat-section-count">{packages.length} packages</span>
            </div>
            <h2 className="cat-section-heading">
              Choose Your <span className="cat-section-heading-blue">Perfect Getaway</span>
            </h2>
          </motion.div>

          {/* Packages grid or empty */}
          {packages.length === 0 ? (
            <div className="cat-empty-state">
              <div className="cat-empty-icon"><Ship size={40} /></div>
              <p className="cat-empty-title">Packages coming soon</p>
              <p className="cat-empty-sub">
                <Link to="/contact" className="cat-empty-link">Contact us</Link> for custom itineraries
              </p>
            </div>
          ) : (
            <div className="cat-grid">
              {packages.map((pkg, idx) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  catImage={cat.image_url}
                  index={idx}
                  onEnquire={setEnquiry}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TESTIMONIAL + CTA (unchanged)
      ══════════════════════════════════════════ */}
      <div className="cat-page-inner cat-bottom-section">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Testimonial */}
          <div className="bg-white p-8 shadow-xl border border-blue-50 relative">
            <Quote className="absolute top-4 right-4 text-blue-50" size={60} />
            <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-6 border-b pb-2 inline-block">
              Client Feedback
            </h3>
            <AnimatePresence mode="wait">
              <motion.div
                key={testIdx}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-slate-600 italic text-sm leading-relaxed mb-6">
                  "{testimonials[testIdx].text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-none flex items-center justify-center text-white text-[10px] font-bold">
                    {testimonials[testIdx].init}
                  </div>
                  <p className="font-black text-slate-900 text-[11px] uppercase tracking-wider">
                    {testimonials[testIdx].name}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-1.5 mt-5">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === testIdx ? 'w-5 bg-blue-600' : 'w-1.5 bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-900 to-slate-900 p-12 relative flex flex-col justify-center rounded-none">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              Explore Your <br />
              <span className="text-cyan-400">Dream Destination!</span>
            </h2>
            <p className="text-blue-200 font-bold italic mb-8">
              You'll never forget the experience we are ready to present Joy!
            </p>
            <div className="flex gap-4">
              <Link to="/enquiry"
                className="bg-white text-slate-900 px-12 py-4 font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all inline-block">
                Click Here
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ══ STYLES ══ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

        @keyframes catSkelPulse { 0%,100%{opacity:1} 50%{opacity:.45} }
        @keyframes catOrbFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes catShimmer   { 0%{background-position:200% center} 100%{background-position:-200% center} }

        /* ROOT */
        .cat-page-root {
          font-family: 'DM Sans', sans-serif;
          background: #f8fafc;
          min-height: 100vh;
        }
        .cat-page-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── HERO ─────────────────────────────────── */
        .cat-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: #0f172a;
          overflow: hidden;
          padding-top: 96px;
          padding-bottom: 60px;
        }

        .cat-hero-bg {
          position: absolute; inset: 0; z-index: 0;
        }
        .cat-hero-bg-img {
          width: 100%; height: 100%; object-fit: cover;
          filter: saturate(1.2) brightness(0.35);
          transform: scale(1.05);
        }
        .cat-hero-bg-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg,
            rgba(15,23,42,0.95) 0%,
            rgba(15,23,42,0.7) 50%,
            rgba(15,23,42,0.5) 100%
          );
        }

        /* Grid texture */
        .cat-hero-grid {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background-image:
            linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        /* Orbs */
        .cat-hero-orb {
          position: absolute; border-radius: 50%; z-index: 1;
          filter: blur(100px); pointer-events: none;
        }
        .cat-hero-orb-1 {
          width: 600px; height: 600px;
          top: -200px; left: -150px;
          background: radial-gradient(circle, rgba(37,99,235,0.2), transparent 65%);
          animation: catOrbFloat 8s ease-in-out infinite;
        }
        .cat-hero-orb-2 {
          width: 400px; height: 400px;
          bottom: -150px; right: -100px;
          background: radial-gradient(circle, rgba(6,182,212,0.15), transparent 65%);
          animation: catOrbFloat 10s ease-in-out infinite reverse;
        }

        .cat-hero-inner {
          position: relative; z-index: 2;
          width: 100%;
        }

        /* Breadcrumb */
        .cat-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 20px;
        }
        .cat-bc-link { color: rgba(255,255,255,0.4); text-decoration: none; transition: color .2s; }
        .cat-bc-link:hover { color: #60a5fa; }
        .cat-bc-active { color: #60a5fa; }

        /* Back button */
        .cat-back-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.7);
          padding: 8px 16px;
          font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
          cursor: pointer; margin-bottom: 36px;
          backdrop-filter: blur(8px);
          transition: background .25s, color .25s, border-color .25s;
        }
        .cat-back-btn:hover {
          background: rgba(255,255,255,0.12);
          color: #fff; border-color: rgba(255,255,255,0.25);
        }
        .cat-back-icon {
          width: 24px; height: 24px;
          background: rgba(37,99,235,0.3);
          display: flex; align-items: center; justify-content: center;
          border-radius: 4px;
        }

        /* Hero layout */
        .cat-hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        @media(max-width: 900px) {
          .cat-hero-content { grid-template-columns: 1fr; gap: 40px; }
        }

        /* Hero text */
        .cat-hero-text {}

        .cat-eyebrow {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 20px;
        }
        .cat-eyebrow-line {
          width: 32px; height: 1.5px;
          background: linear-gradient(90deg, transparent, #38bdf8);
          display: block;
        }
        .cat-eyebrow-txt {
          font-size: 11px; font-weight: 600;
          letter-spacing: .3em; text-transform: uppercase;
          color: #38bdf8;
        }

        .cat-heading {
          font-family: 'Barlow Condensed', sans-serif;
          line-height: .95;
          margin-bottom: 24px;
        }
        .cat-heading-line1 {
          display: block;
          font-size: clamp(52px, 7vw, 90px);
          font-weight: 900; text-transform: uppercase;
          letter-spacing: -.02em;
          color: #fff;
        }
        .cat-heading-line2 {
          display: block;
          font-size: clamp(52px, 7vw, 90px);
          font-weight: 900; text-transform: uppercase;
          letter-spacing: -.02em;
          background: linear-gradient(135deg, #60a5fa 0%, #38bdf8 50%, #2563EB 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cat-hero-desc {
          font-size: 16px; font-weight: 400;
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
          max-width: 460px;
          margin-bottom: 32px;
        }

        /* Stats strip */
        .cat-stats-strip {
          display: flex; align-items: center; gap: 0;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          padding: 16px 24px;
          margin-bottom: 28px;
          width: fit-content;
        }
        .cat-stat { display: flex; flex-direction: column; align-items: center; padding: 0 24px; }
        .cat-stat-num {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 28px; font-weight: 900;
          color: #60a5fa; line-height: 1;
        }
        .cat-stat-label {
          font-size: 9px; font-weight: 600;
          letter-spacing: .15em; text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-top: 4px;
        }
        .cat-stat-divider {
          width: 1px; height: 36px;
          background: rgba(255,255,255,0.1);
        }

        /* Inclusion pills */
        .cat-inclusions {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .cat-inclusion-pill {
          display: flex; align-items: center; gap: 6px;
          background: rgba(37,99,235,0.15);
          border: 1px solid rgba(37,99,235,0.25);
          color: #93c5fd;
          font-size: 10px; font-weight: 600;
          letter-spacing: .08em; text-transform: uppercase;
          padding: 6px 12px; border-radius: 40px;
          backdrop-filter: blur(6px);
        }

        /* Hero image card */
        .cat-hero-img-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(37,99,235,0.2),
            0 32px 80px rgba(0,0,0,0.5),
            0 0 60px rgba(37,99,235,0.1);
          aspect-ratio: 4/3;
        }
        .cat-hero-img {
          width: 100%; height: 100%; object-fit: cover;
          display: block;
        }
        .cat-hero-img-ph {
          background: #1e3a5f;
          display: flex; align-items: center; justify-content: center;
          width: 100%; height: 100%;
        }
        .cat-hero-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(15,23,42,0.7) 100%);
        }
        .cat-hero-img-badge {
          position: absolute;
          bottom: 16px; left: 16px;
          display: flex; align-items: center; gap: 6px;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          font-size: 10px; font-weight: 700;
          letter-spacing: .1em; text-transform: uppercase;
          padding: 8px 14px; border-radius: 40px;
          backdrop-filter: blur(10px);
        }

        /* ── PACKAGES SECTION ─────────────────── */
        .cat-packages-section {
          padding: 72px 0 64px;
          background: #f8fafc;
          position: relative;
        }
        .cat-packages-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(37,99,235,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        /* Section header */
        .cat-section-header {
          margin-bottom: 40px;
        }
        .cat-section-label-row {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 12px;
        }
        .cat-section-line {
          display: block;
          width: 36px; height: 1.5px;
          background: linear-gradient(90deg, transparent, #2563EB);
        }
        .cat-section-label-txt {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px; font-weight: 800; text-transform: uppercase;
          letter-spacing: .04em; color: #0f172a;
        }
        .cat-section-count {
          font-size: 10px; font-weight: 600; letter-spacing: .1em;
          color: #2563EB;
          background: #EFF6FF; border: 1px solid #DBEAFE;
          padding: 3px 10px; border-radius: 20px;
        }
        .cat-section-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(32px, 4.5vw, 54px);
          font-weight: 900; text-transform: uppercase;
          letter-spacing: -.01em; line-height: 1;
          color: #0f172a;
        }
        .cat-section-heading-blue {
          color: #2563EB;
          position: relative;
        }

        /* Grid */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          position: relative; z-index: 1;
        }
        @media(max-width: 960px) { .cat-grid { grid-template-columns: repeat(2,1fr); } }
        @media(max-width: 560px) { .cat-grid { grid-template-columns: 1fr; } }

        /* ── PACKAGE CARD ─────────────────────── */
        .cat-pkg-card {
          position: relative;
          background: #fff;
          border: 1px solid #e8f0fc;
          border-radius: 16px;
          overflow: hidden;
          display: flex; flex-direction: column;
          cursor: pointer;
          transition: border-color .3s, box-shadow .32s, transform .3s;
        }
        .cat-pkg-card:hover {
          border-color: rgba(37,99,235,0.3);
          box-shadow:
            0 0 0 1px rgba(37,99,235,0.1),
            0 24px 60px rgba(37,99,235,0.13),
            0 8px 20px rgba(0,0,0,0.07);
          transform: translateY(-4px);
        }

        /* Top accent shimmer */
        .cat-card-accent {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #1D4ED8, #60A5FA, #06b6d4, #1D4ED8);
          background-size: 200% auto;
          transform: scaleX(0); transform-origin: left;
          transition: transform .45s ease;
          z-index: 6;
        }
        .cat-card-accent-on {
          transform: scaleX(1);
          animation: catShimmer 2s linear infinite;
        }

        /* Image */
        .cat-card-img-wrap {
          position: relative; height: 215px; overflow: hidden; flex-shrink: 0;
        }
        .cat-card-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform .6s cubic-bezier(.25,.46,.45,.94);
          display: block;
        }
        .cat-card-img-ph {
          background: #dbeafe; display: flex; align-items: center; justify-content: center;
          width: 100%; height: 100%;
        }
        .cat-card-img-hov { transform: scale(1.07); }
        .cat-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,.06) 0%, rgba(0,0,0,.22) 38%, rgba(0,0,0,.75) 100%);
        }

        /* Price badge */
        .cat-price-badge {
          position: absolute; top: 12px; left: 12px; z-index: 4;
          background: rgba(0,0,0,.62);
          border: 1px solid rgba(255,255,255,.18);
          backdrop-filter: blur(8px);
          padding: 5px 12px; border-radius: 6px;
          display: flex; flex-direction: column; align-items: flex-start;
        }
        .cat-price-from {
          font-size: 8px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase;
          color: rgba(255,255,255,.55);
        }
        .cat-price-amt {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px; font-weight: 800;
          color: #fff; line-height: 1.1;
        }
        .cat-days-badge {
          position: absolute; top: 12px; right: 12px; z-index: 4;
          background: #2563EB; color: #fff;
          font-size: 9px; font-weight: 700; letter-spacing: .1em;
          padding: 5px 10px; border-radius: 6px;
        }

        /* Image footer */
        .cat-card-img-footer {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 4;
          padding: 14px 16px;
        }
        .cat-card-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 19px; font-weight: 800; text-transform: uppercase;
          letter-spacing: .01em; color: #fff; line-height: 1.1;
          margin-bottom: 4px;
        }
        .cat-card-subdesc {
          font-size: 9.5px; color: rgba(255,255,255,.72);
          line-height: 1.45;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Body */
        .cat-card-body {
          padding: 16px; display: flex; flex-direction: column; gap: 11px; flex-grow: 1;
        }
        .cat-route-row {
          display: flex; align-items: flex-start; gap: 6px;
        }
        .cat-route-icon { color: #2563EB; flex-shrink: 0; margin-top: 1px; }
        .cat-route-txt {
          font-size: 10px; color: #2563EB; font-weight: 500;
          letter-spacing: .03em; line-height: 1.5;
        }

        .cat-hl-wrap { display: flex; flex-direction: column; gap: 6px; }
        .cat-hl-label {
          font-size: 8px; font-weight: 700; letter-spacing: .16em;
          text-transform: uppercase; color: #94a3b8;
        }
        .cat-hl-tags { display: flex; flex-wrap: wrap; gap: 4px; }
        .cat-hl-tag {
          font-size: 8.5px; font-weight: 500;
          color: #475569; background: #F1F5F9;
          border: 1px solid #E2E8F0;
          padding: 3px 9px; border-radius: 20px;
        }
        .cat-hl-more { color: #2563EB; background: #EFF6FF; border-color: #DBEAFE; }

        .cat-start-city {
          font-size: 9.5px; color: #94a3b8; letter-spacing: .04em;
        }
        .cat-start-city span { color: #475569; font-weight: 600; }

        /* Actions */
        .cat-card-actions {
          display: flex; flex-direction: column; gap: 8px;
          margin-top: auto; padding-top: 4px;
        }
        .cat-enquire-btn {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
          background: #2563EB; color: #fff; border: none; border-radius: 8px;
          padding: 12px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase;
          cursor: pointer;
          transition: background .25s, box-shadow .28s, transform .2s;
        }
        .cat-enquire-btn:hover, .cat-enquire-btn-hov {
          background: #1D4ED8;
          box-shadow: 0 8px 24px rgba(37,99,235,.35);
          transform: translateY(-1px);
        }
        .cat-btn-arrow {
          transition: transform .22s;
        }
        .cat-enquire-btn-hov .cat-btn-arrow {
          transform: translateX(3px);
        }
        .cat-view-btn {
          display: flex; align-items: center; justify-content: center;
          background: transparent; color: #2563EB;
          border: 1px solid #DBEAFE; border-radius: 8px;
          padding: 9px 16px;
          font-size: 10px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase;
          text-decoration: none;
          transition: background .2s, border-color .2s;
        }
        .cat-view-btn:hover { background: #EFF6FF; border-color: #93c5fd; }

        /* Empty state */
        .cat-empty-state {
          text-align: center; padding: 80px 0;
          color: #94a3b8;
        }
        .cat-empty-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: #EFF6FF; border: 2px solid #DBEAFE;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px; color: #93c5fd;
        }
        .cat-empty-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px; font-weight: 800;
          text-transform: uppercase; letter-spacing: .06em;
          color: #cbd5e1; margin-bottom: 8px;
        }
        .cat-empty-sub { font-size: 13px; color: #94a3b8; }
        .cat-empty-link { color: #2563EB; text-decoration: underline; }

        /* Bottom section */
        .cat-bottom-section { padding: 0 24px 72px; }

        /* Skeleton */
        .cat-skel-bar {
          background: #e2e8f0; border-radius: 6px;
          animation: catSkelPulse 1.6s ease-in-out infinite;
        }
        .cat-hero-skeleton {
          min-height: 520px; background: #0f172a;
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
          align-items: center; padding: 120px 60px 60px;
        }
        .cat-skel-inner { display: flex; flex-direction: column; gap: 0; }
        .cat-skel-img {
          height: 360px; border-radius: 16px;
          background: #1e293b;
          animation: catSkelPulse 1.6s ease-in-out infinite;
        }
      `}</style>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {enquiry && <EnquiryModal pkg={enquiry} onClose={() => setEnquiry(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default CategoryPage;