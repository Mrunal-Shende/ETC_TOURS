import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane, Hotel, Utensils, Activity, Car,
  Quote, Ship, Star, X, ChevronRight, MapPin, Clock, ArrowRight
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import { submitEnquiry } from '../services/enquiryService';

/* ─────────────────────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────────────────────── */
const inclusions = [
  { icon: <Plane     size={18} />, text: 'Flights'    },
  { icon: <Hotel     size={18} />, text: 'Hotels'     },
  { icon: <Utensils size={18} />, text: 'Meals'      },
  { icon: <Activity size={18} />, text: 'Activities' },
  { icon: <Car       size={18} />, text: 'Transfers'  },
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
    await Promise.all([
    supabase.from('enquiries').insert({ ...form, package_id: pkg.id }),
    submitEnquiry({
      fullName:    form.name,
      phoneNumber: form.phone,
      email:       form.email,
      fromDate:    form.travel_date,
      travelers:   form.pax,
      requirements: form.message,
      serviceType: `Package Enquiry — ${pkg.name}`,
    }),
  ]);
    setDone(true);
    setSending(false);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 pt-24 overflow-y-auto backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="bg-white w-full max-w-md shadow-2xl overflow-hidden rounded-none flex flex-col my-auto"
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
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
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
              <input type="email" placeholder="yash@email.com"
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
   UPDATED PACKAGE CARD (India Tour UI Style)
───────────────────────────────────────────────────────────── */
const PackageCard = ({ pkg, catImage, index, onEnquire }) => {
  const imgSrc = pkg.image_url || catImage || null;
  const daysLabel = pkg.nights ? `${pkg.nights + 1}D / ${pkg.nights}N` : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="flex flex-col items-center text-center h-full group"
    >
      {/* Image Box with White Border like India Tour UI */}
      <div 
        className="w-full aspect-[5/4] overflow-hidden border-[6px] border-white shadow-sm ring-1 ring-gray-100 mb-6 cursor-pointer relative"
        onClick={() => window.location.href = `/package/${pkg.id}`}
      >
        {imgSrc ? (
          <img 
            src={imgSrc} 
            alt={pkg.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full bg-slate-50 flex items-center justify-center">
            <Ship size={32} className="text-slate-200" />
          </div>
        )}
        
        {/* Days Badge */}
        {daysLabel && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-[8px] font-black uppercase px-2 py-1 tracking-widest z-10">
            {daysLabel}
          </div>
        )}

        {/* Price Overlay */}
        {pkg.price && (
          <div className="absolute bottom-0 right-0 bg-slate-900/90 text-white px-3 py-1.5 backdrop-blur-md">
            <span className="text-[7px] block leading-none opacity-60 uppercase font-bold text-left">From</span>
            <span className="text-xs font-black">₹{Number(pkg.price).toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Heading — Spaced All Caps */}
      <h2 className="text-slate-800 font-bold text-lg uppercase tracking-[0.15em] mb-2 line-clamp-1 px-2">
        {pkg.name}
      </h2>
      
      {/* Tagline / Route */}
      <div className="flex items-center justify-center gap-1.5 mb-3 text-blue-600">
        <MapPin size={10} />
        <span className="text-[9px] font-bold uppercase tracking-wider line-clamp-1">
          {pkg.route_covering || "Premium Experience"}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-500 text-[11px] leading-relaxed font-medium mb-6 px-4 line-clamp-2 flex-1">
        {pkg.description || "Discover the hidden gems of this destination with our curated tour."}
      </p>

      {/* Action Buttons */}
      <div className="mt-auto flex flex-col gap-2 w-full px-8 pb-4">
        <button 
          onClick={() => onEnquire(pkg)} 
          className="w-full bg-slate-900 text-white py-2 text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all duration-300"
        >
          Enquire Now
        </button>
        <Link 
          to={`/package/${pkg.id}`} 
          className="w-full border border-slate-800 text-slate-800 py-1.5 text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 hover:text-white transition-all duration-300 text-center"
        >
          Read More
        </Link>
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
        {cat.image_url && (
          <div className="cat-hero-bg">
            <img src={cat.image_url} alt={cat.name} className="cat-hero-bg-img" />
            <div className="cat-hero-bg-overlay" />
          </div>
        )}

        <div className="cat-hero-grid" />

        <div className="cat-hero-orb cat-hero-orb-1" />
        <div className="cat-hero-orb cat-hero-orb-2" />

        <div className="cat-page-inner cat-hero-inner">

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

          <div className="cat-hero-content">
            <motion.div
              className="cat-hero-text"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="cat-eyebrow">
                <span className="cat-eyebrow-line" />
                <span className="cat-eyebrow-txt">{cat.tagline || cat.name}</span>
              </div>

              <h1 className="cat-heading">
                <span className="cat-heading-line1">{line1}</span>
                {line2 && <span className="cat-heading-line2">{line2}</span>}
              </h1>

              <p className="cat-hero-desc">
                {cat.description ||
                  `Explore the breathtaking beauty of ${cat.name} with our expertly curated packages, crafted for unforgettable memories.`}
              </p>

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
          TESTIMONIAL + CTA
      ══════════════════════════════════════════ */}
      <div className="cat-page-inner cat-bottom-section">
        <div className="grid lg:grid-cols-3 gap-8">
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

          <div className="lg:col-span-2 bg-gradient-to-br from-blue-900 to-slate-900 p-12 relative flex flex-col justify-center rounded-none">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              Explore Your <br />
              <span className="text-cyan-400">Dream Destination!</span>
            </h2>
            <p className="text-blue-200 font-bold italic mb-8">
              You'll never forget the experience we are ready to present Joy!
            </p>
            <div className="flex gap-4">
              <Link to="/enquery"
                className="bg-white text-slate-900 px-12 py-4 font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all inline-block">
                Click Here
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        @keyframes catSkelPulse { 0%,100%{opacity:1} 50%{opacity:.45} }
        @keyframes catOrbFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        
        .cat-page-root { font-family: 'DM Sans', sans-serif; background: #f8fafc; min-height: 100vh; }
        .cat-page-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        .cat-hero { position: relative; min-height: 100vh; display: flex; align-items: center; background: #0f172a; overflow: hidden; padding-top: 96px; padding-bottom: 60px; }
        .cat-hero-bg { position: absolute; inset: 0; z-index: 0; }
        .cat-hero-bg-img { width: 100%; height: 100%; object-fit: cover; filter: saturate(1.2) brightness(0.35); transform: scale(1.05); }
        .cat-hero-bg-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.7) 50%, rgba(15,23,42,0.5) 100%); }
        .cat-hero-grid { position: absolute; inset: 0; z-index: 1; pointer-events: none; background-image: linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px); background-size: 40px 40px; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%); }
        .cat-hero-orb { position: absolute; border-radius: 50%; z-index: 1; filter: blur(100px); pointer-events: none; }
        .cat-hero-orb-1 { width: 600px; height: 600px; top: -200px; left: -150px; background: radial-gradient(circle, rgba(37,99,235,0.2), transparent 65%); animation: catOrbFloat 8s ease-in-out infinite; }
        .cat-hero-orb-2 { width: 400px; height: 400px; bottom: -150px; right: -100px; background: radial-gradient(circle, rgba(6,182,212,0.15), transparent 65%); animation: catOrbFloat 10s ease-in-out infinite reverse; }
        .cat-hero-inner { position: relative; z-index: 2; width: 100%; }
        .cat-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 20px; }
        .cat-bc-link { color: rgba(255,255,255,0.4); text-decoration: none; transition: color .2s; }
        .cat-bc-link:hover { color: #60a5fa; }
        .cat-bc-active { color: #60a5fa; }
        .cat-back-btn { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.7); padding: 8px 16px; font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; cursor: pointer; margin-bottom: 36px; backdrop-filter: blur(8px); }
        .cat-back-icon { width: 24px; height: 24px; background: rgba(37,99,235,0.3); display: flex; align-items: center; justify-content: center; border-radius: 4px; }
        .cat-hero-content { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        @media(max-width: 900px) { .cat-hero-content { grid-template-columns: 1fr; gap: 40px; } }
        .cat-eyebrow { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .cat-eyebrow-line { width: 32px; height: 1.5px; background: linear-gradient(90deg, transparent, #38bdf8); }
        .cat-eyebrow-txt { font-size: 11px; font-weight: 600; letter-spacing: .3em; text-transform: uppercase; color: #38bdf8; }
        .cat-heading { font-family: 'Barlow Condensed', sans-serif; line-height: .95; margin-bottom: 24px; }
        .cat-heading-line1 { display: block; font-size: clamp(52px, 7vw, 90px); font-weight: 900; text-transform: uppercase; letter-spacing: -.02em; color: #fff; }
        .cat-heading-line2 { display: block; font-size: clamp(52px, 7vw, 90px); font-weight: 900; text-transform: uppercase; letter-spacing: -.02em; background: linear-gradient(135deg, #60a5fa 0%, #38bdf8 50%, #2563EB 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .cat-hero-desc { font-size: 16px; font-weight: 400; color: rgba(255,255,255,0.6); line-height: 1.7; max-width: 460px; margin-bottom: 32px; }
        .cat-stats-strip { display: flex; align-items: center; gap: 0; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); padding: 16px 24px; margin-bottom: 28px; width: fit-content; }
        .cat-stat { display: flex; flex-direction: column; align-items: center; padding: 0 24px; }
        .cat-stat-num { font-family: 'Barlow Condensed', sans-serif; font-size: 28px; font-weight: 900; color: #60a5fa; line-height: 1; }
        .cat-stat-label { font-size: 9px; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-top: 4px; }
        .cat-stat-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.1); }
        .cat-inclusions { display: flex; flex-wrap: wrap; gap: 8px; }
        .cat-inclusion-pill { display: flex; align-items: center; gap: 6px; background: rgba(37,99,235,0.15); border: 1px solid rgba(37,99,235,0.25); color: #93c5fd; font-size: 10px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; padding: 6px 12px; border-radius: 40px; backdrop-filter: blur(6px); }
        .cat-hero-img-card { position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.5); aspect-ratio: 4/3; }
        .cat-hero-img { width: 100%; height: 100%; object-fit: cover; }
        .cat-hero-img-badge { position: absolute; bottom: 16px; left: 16px; display: flex; align-items: center; gap: 6px; background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.15); color: #fff; font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 8px 14px; border-radius: 40px; backdrop-filter: blur(10px); }
        .cat-packages-section { padding: 72px 0 64px; background: #f8fafc; position: relative; }
        .cat-section-header { margin-bottom: 40px; }
        .cat-section-label-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .cat-section-line { display: block; width: 36px; height: 1.5px; background: #2563EB; }
        .cat-section-label-txt { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; color: #0f172a; }
        .cat-section-count { font-size: 10px; font-weight: 600; letter-spacing: .1em; color: #2563EB; background: #EFF6FF; border: 1px solid #DBEAFE; padding: 3px 10px; border-radius: 20px; }
        .cat-section-heading { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(32px, 4.5vw, 54px); font-weight: 900; text-transform: uppercase; letter-spacing: -.01em; line-height: 1; color: #0f172a; }
        .cat-section-heading-blue { color: #2563EB; }
        .cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; position: relative; z-index: 1; }
        @media(max-width: 960px) { .cat-grid { grid-template-columns: repeat(2,1fr); } }
        @media(max-width: 560px) { .cat-grid { grid-template-columns: 1fr; } }
        .cat-empty-state { text-align: center; padding: 80px 0; color: #94a3b8; }
        .cat-bottom-section { padding: 0 24px 72px; }
        .cat-skel-bar { background: #e2e8f0; border-radius: 6px; animation: catSkelPulse 1.6s ease-in-out infinite; }
        .cat-hero-skeleton { min-height: 520px; background: #0f172a; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; padding: 120px 60px 60px; }
      `}</style>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {enquiry && <EnquiryModal pkg={enquiry} onClose={() => setEnquiry(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default CategoryPage;