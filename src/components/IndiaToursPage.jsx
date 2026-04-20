import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, ArrowRight, ArrowLeft, X, Send, Users, Calendar, CheckCircle } from 'lucide-react';

const GOLD = '#C9A84C';

/* ─────────────────────────────────────────────────────────
   LOADER
────────────────────────────────────────────────────────── */
const Loader = () => (
  <div className="h-screen flex items-center justify-center bg-[#0a0f1e]">
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-blue-900" />
        <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-white font-black tracking-[0.3em] uppercase text-[9px]">Express Travel</span>
        <span className="text-blue-400 font-medium tracking-widest uppercase text-[8px]">Loading...</span>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────
   PACKAGE CARD
────────────────────────────────────────────────────────── */
const PackageCard = ({ pkg, index, onEnquire }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    className="group relative bg-white flex flex-col overflow-hidden border border-gray-100 hover:border-blue-300 hover:shadow-[0_12px_48px_rgba(30,64,175,0.15)] transition-all duration-500"
  >
    {/* Image */}
    <div className="relative h-56 overflow-hidden bg-slate-900 shrink-0">
      {pkg.image_url
        ? <img src={pkg.image_url} alt={pkg.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08] opacity-90 group-hover:opacity-100" />
        : <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <MapPin size={36} className="text-blue-400/40" />
          </div>
      }
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

      {/* Left blue stripe on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-bottom" />

      {/* Duration badge */}
      {(pkg.duration || pkg.nights) && (
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border-l-2 border-blue-500">
          <Clock size={9} /> {pkg.duration || `${pkg.nights}N`}
        </div>
      )}

      {/* Badge */}
      {pkg.badge && (
        <div className="absolute top-4 right-4 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1">
          {pkg.badge}
        </div>
      )}

      {/* Price */}
      {pkg.price && (
        <div className="absolute bottom-4 right-4 text-right">
          <span className="text-[8px] font-bold text-white/50 uppercase tracking-widest block leading-none mb-0.5">From</span>
          <span className="text-white font-black text-xl leading-none tracking-tight">
            ₹{Number(pkg.price).toLocaleString('en-IN')}
          </span>
        </div>
      )}
    </div>

    {/* Body */}
    <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
      {pkg.route_covering && (
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin size={9} className="text-blue-600 shrink-0" />
          <p className="text-blue-600 text-[9px] font-black uppercase tracking-widest leading-none truncate">{pkg.route_covering}</p>
        </div>
      )}

      <h3 className="text-slate-900 font-black text-[15px] uppercase tracking-tight leading-tight mb-2">{pkg.name}</h3>
      <div className="w-6 h-[2px] mb-3" style={{ background: GOLD }} />

      {pkg.description && (
        <p className="text-slate-500 text-[11px] leading-relaxed font-medium flex-1 line-clamp-2 mb-4">{pkg.description}</p>
      )}

      {pkg.highlights?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.highlights.slice(0, 3).map(h => (
            <span key={h} className="text-[8px] font-bold bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 uppercase tracking-wider">{h}</span>
          ))}
        </div>
      )}

      {pkg.start_city && (
        <p className="text-[9px] text-slate-400 mb-4 uppercase tracking-wider font-medium">
          Departs: <span className="font-black text-slate-600">{pkg.start_city}</span>
        </p>
      )}

      <button
        onClick={() => onEnquire(pkg)}
        className="group/btn w-full flex items-center justify-center gap-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest py-3 hover:bg-blue-600 transition-all duration-300 mt-auto"
      >
        Enquire Now
        <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────────────────
   ENQUIRY MODAL
────────────────────────────────────────────────────────── */
const EnquiryModal = ({ pkg, onClose }) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', travel_date: '', pax: 1, message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await supabase.from('enquiries').insert({ ...form, package_id: pkg.id });
    setDone(true);
    setSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white w-full max-w-md shadow-[0_32px_80px_rgba(0,0,0,0.5)] overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="relative bg-[#0a0f1e] px-6 pt-6 pb-5 shrink-0">
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${GOLD}, #e8c96a, ${GOLD})` }} />
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[8px] font-black uppercase tracking-[0.35em] block mb-1" style={{ color: GOLD }}>Send Enquiry</span>
              <h3 className="text-white font-black text-lg uppercase tracking-tight leading-tight max-w-[280px]">{pkg.name}</h3>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors p-1 mt-0.5 hover:bg-white/10 rounded-full">
              <X size={18} />
            </button>
          </div>
        </div>

        {done ? (
          <div className="p-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 border-2 border-blue-100 flex items-center justify-center mb-5">
              <CheckCircle size={28} className="text-blue-600" />
            </div>
            <h4 className="text-slate-900 font-black text-xl uppercase tracking-tight mb-2">Enquiry Sent!</h4>
            <div className="w-8 h-[2px] mb-3 mx-auto" style={{ background: GOLD }} />
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">Our travel experts will reach out within 24 hours.</p>
            <button onClick={onClose} className="bg-[#0a0f1e] text-white font-black uppercase tracking-widest text-[10px] px-8 py-3 hover:bg-blue-600 transition-colors duration-300">
              Close
            </button>
          </div>
        ) : (
          <div className="overflow-y-auto flex-1">
            <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
              <MField icon={<Users size={11} />} label="Full Name *" value={form.name} onChange={v => setForm({ ...form, name: v })} required placeholder="Your full name" />
              <MField icon={<Send size={11} />} label="Phone Number *" value={form.phone} onChange={v => setForm({ ...form, phone: v })} required placeholder="+91 98765 43210" type="tel" />
              <MField label="Email Address" value={form.email} onChange={v => setForm({ ...form, email: v })} placeholder="you@email.com" type="email" />
              <div className="grid grid-cols-2 gap-3">
                <MField icon={<Calendar size={11} />} label="Travel Date" value={form.travel_date} onChange={v => setForm({ ...form, travel_date: v })} type="date" />
                <MField icon={<Users size={11} />} label="Persons" value={form.pax} onChange={v => setForm({ ...form, pax: v })} type="number" min="1" />
              </div>
              <div>
                <label className="text-slate-400 text-[9px] font-black uppercase tracking-[0.25em] block mb-2">Message / Requirements</label>
                <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Any special requirements, preferred dates..."
                  className="w-full border border-gray-200 px-4 py-3 text-[12px] font-medium text-slate-800 placeholder-slate-300 focus:outline-none focus:border-blue-500 transition-colors resize-none bg-gray-50/50" />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="submit" disabled={submitting}
                  className="flex-1 bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] py-3.5 hover:bg-[#0a0f1e] disabled:opacity-40 transition-all duration-300 flex items-center justify-center gap-2">
                  {submitting
                    ? <><div className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" /> Sending...</>
                    : <><Send size={11} /> Send Enquiry</>}
                </button>
                <button type="button" onClick={onClose}
                  className="px-5 border border-gray-200 text-slate-500 font-bold text-xs uppercase tracking-wider hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const MField = ({ label, value, onChange, required, placeholder, type = 'text', min, icon }) => (
  <div>
    <label className="text-slate-400 text-[9px] font-black uppercase tracking-[0.25em] block mb-2">{label}</label>
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        required={required} placeholder={placeholder} min={min}
        className={`w-full border border-gray-200 py-3 text-[12px] font-medium text-slate-800 placeholder-slate-300 focus:outline-none focus:border-blue-500 transition-colors bg-gray-50/50 ${icon ? 'pl-9 pr-4' : 'px-4'}`} />
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────
   INDIA TOURS LIST — matches Blog page hero style
────────────────────────────────────────────────────────── */
const IndiaToursList = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.from('tour_categories')
      .select('*').eq('type', 'india').eq('is_active', true).order('display_order')
      .then(({ data }) => { setCats(data || []); setLoading(false); });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── HERO — exact Blog page style: real dark photo + centered massive title ── */}
      <div className="relative h-[100vh] min-h-[600px] overflow-hidden flex items-center justify-center">

        {/* Background: starry/mountain dark photo — using a dark gradient to mimic the blog style */}
        <div className="absolute inset-0 bg-[#0a0f1e]">
          {/* Subtle star-like dot pattern to match the blog page atmosphere */}
          <div className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.6) 0%, transparent 100%),
                                radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.4) 0%, transparent 100%),
                                radial-gradient(1px 1px at 50% 10%, rgba(255,255,255,0.5) 0%, transparent 100%),
                                radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.3) 0%, transparent 100%),
                                radial-gradient(1px 1px at 90% 40%, rgba(255,255,255,0.6) 0%, transparent 100%),
                                radial-gradient(1px 1px at 20% 90%, rgba(255,255,255,0.4) 0%, transparent 100%),
                                radial-gradient(1px 1px at 80% 15%, rgba(255,255,255,0.5) 0%, transparent 100%),
                                radial-gradient(1px 1px at 60% 50%, rgba(255,255,255,0.3) 0%, transparent 100%),
                                radial-gradient(1px 1px at 40% 35%, rgba(255,255,255,0.4) 0%, transparent 100%),
                                radial-gradient(1px 1px at 15% 55%, rgba(255,255,255,0.5) 0%, transparent 100%)`
            }}
          />
          {/* Deep blue glow — mimics the blog page mountain silhouette atmosphere */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2"
            style={{ background: 'linear-gradient(to top, rgba(10,15,30,0.95) 0%, transparent 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(30,64,175,0.15) 0%, transparent 60%)' }} />
        </div>

        {/* Centered content — exactly like Blog page */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Incredible India badge — like Blog's "Incredible India / Travel Chronicles" box */}
            <div className="border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 mb-8 flex flex-col items-center gap-1">
              <span className="text-white font-black text-base tracking-tight italic">
                Incredible <span className="text-blue-500">I</span>ndia
              </span>
              <span className="text-blue-400 text-[9px] font-bold tracking-[0.3em] uppercase">Heritage · Nature · Culture · Adventure</span>
            </div>

            {/* MASSIVE TITLE — exactly like "BLOG" on the blog page */}
            <h1 className="text-white font-black uppercase leading-none tracking-tighter"
              style={{ fontSize: 'clamp(72px, 14vw, 160px)' }}>
              INDIA
            </h1>
            <h2 className="text-blue-500 font-black uppercase leading-none tracking-tighter mt-1"
              style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
              TOURS
            </h2>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            {/* <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Scroll to Explore</span> */}
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* ── CATEGORIES SECTION ── */}
      <div className="bg-white">
        {/* Section header */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              {/* Back button */}
              <button
                onClick={() => navigate('/')}
                className="group flex items-center gap-2.5 bg-[#0a0f1e] text-white px-5 py-3 font-black uppercase tracking-widest text-[9px] hover:bg-blue-600 transition-all duration-300 shadow-md mb-8"
              >
                <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Home
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-[1px]" style={{ background: GOLD }} />
                <span className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: GOLD }}>Choose Your Destination</span>
              </div>
              <h2 className="text-slate-900 text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                Explore <span className="text-blue-600">Destinations</span>
              </h2>
            </div>
            <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest pb-1">
              {cats.length} Destinations Available
            </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-20">
            {cats.map((cat, i) => (
              <motion.div key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={`/tours/india/${cat.slug}`}
                  className="group block relative overflow-hidden border border-gray-100 hover:border-blue-300 hover:shadow-[0_8px_40px_rgba(30,64,175,0.15)] transition-all duration-400"
                >
                  <div className="h-60 overflow-hidden bg-slate-900 relative">
                    {cat.image_url
                      ? <img src={cat.image_url} alt={cat.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07] opacity-85 group-hover:opacity-100" />
                      : <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                          <MapPin size={36} className="text-blue-400/30" />
                        </div>
                    }
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <div className="w-4 h-[1px]" style={{ background: GOLD }} />
                      <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: GOLD }}>Explore</span>
                    </div>
                    <h2 className="text-white font-black text-xl uppercase tracking-tight leading-none">{cat.name}</h2>
                    {cat.tagline && (
                      <p className="text-blue-300 text-[9px] font-bold uppercase tracking-wider mt-1 opacity-80">{cat.tagline}</p>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 bg-blue-600 text-white p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 shadow-lg">
                    <ArrowRight size={13} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   INDIA TOUR DETAIL — same cinematic hero treatment
────────────────────────────────────────────────────────── */
const IndiaTourDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [cat, setCat] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data: catData } = await supabase
        .from('tour_categories').select('*').eq('slug', slug).eq('type', 'india').single();
      if (!catData) { navigate('/tours/india'); return; }
      setCat(catData);
      const { data: pkgData } = await supabase
        .from('tour_packages').select('*')
        .eq('category_id', catData.id).eq('is_active', true).order('display_order');
      setPackages(pkgData || []);
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading) return <Loader />;
  if (!cat) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans">

      {/* ── FULL-BLEED CINEMATIC HERO — like Home HeroSection ── */}
      <div className="relative h-[100vh] min-h-[600px] overflow-hidden">
        {/* Real photo background with ken-burns zoom */}
        {cat.image_url
          ? <img src={cat.image_url} alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover scale-[1.08] transition-transform duration-[8000ms] ease-out"
              style={{ animation: 'kenBurns 8s ease-out forwards' }} />
          : <div className="absolute inset-0 bg-[#0a0f1e]" />
        }

        {/* Multi-layer overlay — same feel as HeroSection */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* Gold hairline accent */}
        <div className="absolute left-12 top-0 bottom-0 w-[1px] opacity-20 hidden lg:block"
          style={{ background: `linear-gradient(to bottom, transparent 5%, ${GOLD} 40%, transparent 95%)` }} />

        {/* Centered hero content — like HeroSection layout */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px]" style={{ background: GOLD }} />
              <span className="font-black tracking-[0.4em] text-[9px] md:text-[10px] uppercase" style={{ color: GOLD }}>
                {cat.tagline || 'India Tours'}
              </span>
              <div className="w-8 h-[1px]" style={{ background: GOLD }} />
            </div>

            {/* MASSIVE TITLE — matching HeroSection's h1 scale */}
            <h1 className="text-white font-black uppercase tracking-tighter leading-none"
              style={{ fontSize: 'clamp(64px, 13vw, 150px)' }}>
              {cat.name.split(' ')[0]}
            </h1>
            {cat.name.split(' ').length > 1 && (
              <h1 className="text-blue-500 font-black uppercase tracking-tighter leading-none"
                style={{ fontSize: 'clamp(64px, 13vw, 150px)' }}>
                {cat.name.split(' ').slice(1).join(' ')}
              </h1>
            )}

            {/* Blue rule — just like HeroSection */}
            <div className="h-1 w-20 bg-blue-500 my-6" />

            {cat.description && (
              <p className="text-gray-100 text-sm md:text-base max-w-xl font-bold leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {cat.description}
              </p>
            )}
          </motion.div>

          {/* Scroll cue */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Scroll for Packages</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* ── PACKAGES SECTION ── */}
      <div className="bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">

          {/* Nav + meta */}
          <div className="flex flex-col md:flex-row md:items-center gap-5 mb-12">
            <button
              onClick={() => navigate('/tours/india')}
              className="group flex items-center gap-2.5 bg-[#0a0f1e] text-white px-5 py-3 font-black uppercase tracking-widest text-[9px] hover:bg-blue-600 transition-all duration-300 shadow-md w-fit"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-300" />
              All India Tours
            </button>

            {cat.description && (
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-lg border-l-2 pl-4 hidden md:block"
                style={{ borderColor: GOLD }}>
                {cat.description}
              </p>
            )}

            {packages.length > 0 && (
              <div className="md:ml-auto flex items-center gap-2 shrink-0 bg-white border border-gray-200 px-5 py-3 shadow-sm">
                <span className="text-blue-600 font-black text-2xl leading-none">{packages.length}</span>
                <div>
                  <span className="text-slate-900 font-black text-[10px] uppercase tracking-wider block leading-none">Packages</span>
                  <span className="text-slate-400 text-[9px] uppercase tracking-wider">Available</span>
                </div>
              </div>
            )}
          </div>

          {/* Section label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-[1px]" style={{ background: GOLD }} />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: GOLD }}>Our Curated Packages</span>
          </div>

          {packages.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-slate-200 bg-white">
              <div className="w-14 h-14 bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-5">
                <MapPin size={24} className="text-slate-300" />
              </div>
              <p className="text-slate-900 font-black uppercase tracking-tight text-base mb-1">Packages Coming Soon</p>
              <div className="w-8 h-[2px] mx-auto mb-3" style={{ background: GOLD }} />
              <p className="text-slate-400 text-sm font-medium">
                <Link to="/contact" className="text-blue-600 underline underline-offset-4">Contact us</Link> for bespoke quotes
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {packages.map((pkg, i) => (
                <PackageCard key={pkg.id} pkg={pkg} index={i} onEnquire={() => setEnquiry(pkg)} />
              ))}
            </div>
          )}

          {/* Footer strip */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-[1px]" style={{ background: GOLD }} />
              <span className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em]">Express Travel Corporate Services</span>
            </div>
            <Link to="/contact" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-slate-900 transition-colors flex items-center gap-2">
              Need a custom itinerary? <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {enquiry && <EnquiryModal pkg={enquiry} onClose={() => setEnquiry(null)} />}
      </AnimatePresence>

      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1.08); }
          100% { transform: scale(1.0); }
        }
      `}</style>
    </div>
  );
};

export { IndiaToursList, IndiaTourDetail, PackageCard, EnquiryModal };
export default IndiaTourDetail;