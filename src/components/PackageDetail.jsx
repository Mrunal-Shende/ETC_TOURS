import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ChevronRight, ChevronDown, ChevronUp,
  MapPin, Clock, Users, CheckCircle, XCircle,
  Phone, Send, X, Star, Hotel,
  Activity, ZoomIn, Info, Shield, Check, Calendar,
  ArrowRight, Plane
} from 'lucide-react';
import { supabase } from '../supabaseClient';

/* ═══════════════════════════════════════════════
   SAFE DATA HELPERS
═══════════════════════════════════════════════ */
const safeLines  = (v) => (v && typeof v === 'string' ? v.split('\n').filter(Boolean) : []);
const safeCommas = (v) => (v && typeof v === 'string' ? v.split(',').map(s => s.trim()).filter(Boolean) : []);
const safeArray  = (v) => (Array.isArray(v) ? v : []);
const fmtPrice   = (v) => { const n = Number(v); return (isNaN(n) || n === 0) ? null : '₹' + n.toLocaleString('en-IN'); };

/* ═══════════════════════════════════════════════
   SECTION TITLE
═══════════════════════════════════════════════ */
const SectionTitle = ({ children, icon: Icon }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-2">
      {Icon && (
        <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded shrink-0">
          <Icon size={15} className="text-white" />
        </div>
      )}
      <h2
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        className="text-[#0a1628] font-black text-3xl uppercase tracking-tight italic leading-none"
      >
        {children}
      </h2>
    </div>
    <div className="h-[3px] w-14 bg-blue-600 ml-11" />
  </div>
);

/* ═══════════════════════════════════════════════
   DAY CARD
═══════════════════════════════════════════════ */
const DayCard = ({ day, index }) => {
  const [open, setOpen] = useState(index === 0);
  if (!day) return null;
  return (
    <div className="relative pl-12 pb-4 last:pb-0">
      <div className="absolute left-[18px] top-8 bottom-0 w-px bg-slate-200" />
      <div className={`absolute left-0 top-3 w-9 h-9 rounded-full flex items-center justify-center z-10 border-2 border-white shadow font-black text-xs text-white transition-colors duration-200 ${open ? 'bg-blue-600' : 'bg-[#0a1628]'}`}>
        {index + 1}
      </div>
      <div className={`rounded-xl border transition-all duration-200 ${open ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between text-left px-5 py-4 gap-4"
        >
          <h3 className={`font-black text-sm uppercase tracking-wide leading-snug ${open ? 'text-blue-600' : 'text-[#0a1628]'}`}>
            {day.title || `Day ${index + 1}`}
          </h3>
          <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${open ? 'bg-blue-50' : 'bg-slate-100'}`}>
            {open
              ? <ChevronUp size={13} className="text-blue-600" />
              : <ChevronDown size={13} className="text-slate-500" />}
          </div>
        </button>
        {open && (
          <div className="px-5 pb-5">
            <div className="h-px w-full bg-slate-100 mb-4" />
            <p className="text-slate-600 text-sm leading-relaxed">{day.description || ''}</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   ENQUIRY MODAL
═══════════════════════════════════════════════ */
const EnquiryModal = ({ pkg, onClose }) => {
  const [form, setForm] = useState({ name:'', phone:'', email:'', travel_date:'', pax:1, message:'' });
  const [sending, setSending] = useState(false);
  const [done, setDone]       = useState(false);
  const [err,  setErr]        = useState('');

  const field = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault(); setSending(true); setErr('');
    try {
      const { error } = await supabase.from('enquiries').insert({ ...form, package_id: pkg?.id });
      if (error) throw error;
      setDone(true);
    } catch { setErr('Something went wrong. Please try again.'); }
    finally { setSending(false); }
  };

  const inputCls = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400";
  const labelCls = "block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5";

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
        <div className="bg-[#0a1628] px-7 py-5 flex justify-between items-center shrink-0">
          <div>
            <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Express Travel</p>
            <h2 style={{ fontFamily:"'Barlow Condensed', sans-serif" }} className="text-white text-3xl font-black uppercase italic leading-none">
              Get a Custom Quote
            </h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-all">
            <X size={17} />
          </button>
        </div>

        <div className="px-7 py-6 overflow-y-auto">
          {done ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={36} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-black text-[#0a1628] uppercase mb-2">Request Sent!</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">Our team will get back to you within 24 hours.</p>
              <button onClick={onClose} className="w-full py-3 bg-[#0a1628] text-white font-black uppercase tracking-widest text-sm rounded-xl hover:bg-blue-600 transition-all">Close</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div><label className={labelCls}>Full Name *</label><input required placeholder="Your full name" className={inputCls} value={form.name} onChange={field('name')} /></div>
              <div><label className={labelCls}>Phone Number *</label><input required placeholder="+91 XXXXX XXXXX" className={inputCls} value={form.phone} onChange={field('phone')} /></div>
              <div><label className={labelCls}>Email Address</label><input type="email" placeholder="your@email.com" className={inputCls} value={form.email} onChange={field('email')} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>Travel Date</label><input type="date" className={inputCls} value={form.travel_date} onChange={field('travel_date')} /></div>
                <div><label className={labelCls}>No. of Pax</label><input type="number" min="1" placeholder="1" className={inputCls} value={form.pax} onChange={field('pax')} /></div>
              </div>
              <div><label className={labelCls}>Special Requirements</label><textarea rows={3} placeholder="Any special requests..." className={inputCls + ' resize-none'} value={form.message} onChange={field('message')} /></div>
              {err && <p className="text-red-500 text-xs font-semibold bg-red-50 px-3 py-2 rounded-lg">{err}</p>}
              <button type="submit" disabled={sending} className="w-full py-4 bg-blue-600 text-white font-black uppercase tracking-[0.15em] text-sm rounded-xl hover:bg-[#0a1628] transition-all disabled:opacity-60">
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

/* ═══════════════════════════════════════════════
   HERO CHIP
═══════════════════════════════════════════════ */
const HeroChip = ({ icon: Icon, label }) => (
  <div className="inline-flex items-center gap-2 bg-black/30 border border-white/20 rounded-full px-4 py-1.5">
    <Icon size={13} className="text-blue-300 shrink-0" />
    <span className="text-white text-xs font-bold tracking-wide">{label}</span>
  </div>
);

/* ═══════════════════════════════════════════════
   STAT CARD (sidebar mini)
═══════════════════════════════════════════════ */
const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
    <Icon size={16} className="text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="text-sm font-black text-[#0a1628] mt-0.5 leading-snug">{value}</p>
  </div>
);

/* ═══════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════ */
const PackageDetail = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();

  const [pkg,      setPkg]      = useState(null);
  const [cat,      setCat]      = useState(null);
  const [status,   setStatus]   = useState('loading');
  const [enquiry,  setEnquiry]  = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!packageId) { setStatus('error'); return; }
    (async () => {
      try {
        const { data: p, error: pErr } = await supabase
          .from('tour_packages').select('*').eq('id', packageId).single();
        if (pErr || !p) { setStatus('error'); return; }
        setPkg(p);
        if (p.category_id) {
          const { data: c } = await supabase
            .from('tour_categories').select('*').eq('id', p.category_id).single();
          if (c) setCat(c);
        }
        setStatus('ok');
      } catch (ex) {
        console.error('PackageDetail:', ex);
        setStatus('error');
      }
    })();
  }, [packageId]);

  /* LOADING */
  if (status === 'loading') return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-400 text-sm font-medium">Loading package…</p>
    </div>
  );

  /* ERROR */
  if (status === 'error' || !pkg) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-5 px-6 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
        <XCircle size={32} className="text-slate-400" />
      </div>
      <div>
        <h2 className="text-2xl font-black text-[#0a1628] uppercase mb-2">Package Not Found</h2>
        <p className="text-slate-500 text-sm">This package may have been removed or the link is invalid.</p>
      </div>
      <button onClick={() => navigate('/tours/india')}
        className="flex items-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#0a1628] transition-all">
        <ArrowLeft size={15} /> Back to Tours
      </button>
    </div>
  );

  /* PARSE ALL FIELDS */
  const nights         = Number(pkg.nights) || 0;
  const days           = nights + 1;
  const priceStr       = fmtPrice(pkg.price);
  const itinerary      = safeArray(pkg.itinerary);
  const inclusions     = safeLines(pkg.inclusions);
  const exclusions     = safeLines(pkg.exclusions);
  const keyDetails     = safeLines(pkg.key_details);
  const highlights     = safeLines(pkg.highlights);
  const notes          = safeLines(pkg.notes);
  const gallery        = safeCommas(pkg.gallery);
  const validityText   = pkg.validity_text || null;
  const heroImage      = pkg.image_url || cat?.image_url || null;
  const startCity      = pkg.start_city || null;
  const endCity        = pkg.end_city && pkg.end_city !== pkg.start_city ? pkg.end_city : null;
  const routeLabel     = startCity && endCity ? `${startCity} → ${endCity}` : startCity || endCity || null;

  return (
    <div className="min-h-screen bg-white">

      {/* ════════════════════════════════════════════
          HERO — crisp image, bottom-only dark fade
      ════════════════════════════════════════════ */}
      <div className="relative w-full h-[65vh] min-h-[480px] overflow-hidden bg-[#0a1628]">

        {/* Full-quality hero image — NO blur, NO filter */}
        {heroImage && (
          <img
            src={heroImage}
            alt={pkg.name}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}

        {/* Thin bottom fade only — keeps image clear */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #0a1628 0%, rgba(10,22,40,0.55) 35%, transparent 65%)' }}
        />

        {/* Back button */}
        <div className="absolute top-28 left-6 sm:left-10 z-20">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-black/25 hover:bg-black/40 border border-white/20 text-white rounded-full pl-3 pr-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all"
          >
            <ArrowLeft size={13} /> Back
          </button>
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              {cat?.name && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="block w-8 h-[2px] bg-blue-400" />
                  <span className="text-blue-300 text-[11px] font-bold uppercase tracking-[0.22em]">{cat.name}</span>
                </div>
              )}

              <h1
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                className="text-white font-black uppercase italic tracking-tight leading-[0.82] text-5xl sm:text-[4.5rem] md:text-[5.5rem]"
              >
                {pkg.name}
              </h1>

              {/* Chips row */}
              <div className="flex flex-wrap gap-2 mt-5">
                {nights > 0 && <HeroChip icon={Clock} label={`${days} Days / ${nights} Nights`} />}
                {/* Route with arrow — shows both start and end clearly */}
                {startCity && endCity ? (
                  <div className="inline-flex items-center gap-2 bg-black/30 border border-white/20 rounded-full px-4 py-1.5">
                    <MapPin size={13} className="text-blue-300 shrink-0" />
                    <span className="text-white text-xs font-bold">{startCity}</span>
                    <ArrowRight size={12} className="text-blue-300" />
                    <span className="text-white text-xs font-bold">{endCity}</span>
                  </div>
                ) : startCity ? (
                  <HeroChip icon={MapPin} label={startCity} />
                ) : null}
                {pkg.tour_type && <HeroChip icon={Activity} label={pkg.tour_type} />}
                {pkg.min_pax && <HeroChip icon={Users} label={`Min ${pkg.min_pax} Pax`} />}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          STICKY BAR
      ════════════════════════════════════════════ */}
      {/* <div className="sticky top-0 z-50 bg-[#0a1628] border-b border-white/5 shadow-xl shadow-black/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3.5 flex items-center justify-between gap-4">
          

          <div className="flex items-center gap-5 ml-auto">
            <div className="text-right">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.18em] block leading-none mb-1">Starting From</span>
              <span style={{ fontFamily:"'Barlow Condensed', sans-serif" }} className="text-[1.75rem] font-black text-white italic leading-none">
                {priceStr || 'On Request'}
              </span>
            </div>
            <button
              onClick={() => setEnquiry(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 font-black text-[11px] uppercase tracking-[0.18em] rounded-lg transition-all whitespace-nowrap"
            >
              Book Now →
            </button>
          </div>
        </div>
      </div> */}

      {/* ════════════════════════════════════════════
          BREADCRUMB
      ════════════════════════════════════════════ */}
      {/* <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-2.5 flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="text-[11px] font-semibold text-slate-400 hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={10} className="text-slate-300" />
          <Link to="/tours/india" className="text-[11px] font-semibold text-slate-400 hover:text-blue-600 transition-colors">India Tours</Link>
          {cat?.name && (
            <>
              <ChevronRight size={10} className="text-slate-300" />
              <span className="text-[11px] font-semibold text-slate-400">{cat.name}</span>
            </>
          )}
          <ChevronRight size={10} className="text-slate-300" />
          <span className="text-[11px] font-bold text-[#0a1628] truncate max-w-[200px]">{pkg.name}</span>
        </div>
      </div> */}

      {/* ════════════════════════════════════════════
          VALIDITY BANNER — shown only if field exists
      ════════════════════════════════════════════ */}
      {/* {validityText && (
        <div className="border-b border-blue-100 bg-gradient-to-r from-[#0a1628] to-[#0f2040]">
           */}
          {/* TOP VALIDITY BAR */}
          {/* <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3.5 flex items-center gap-3">
            
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <Calendar size={14} className="text-white" />
              </div>
              <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] hidden sm:block">
                Validity
              </span>
            </div>

            <div className="w-px h-5 bg-white/10 hidden sm:block" />

            <p className="text-white/90 text-sm font-semibold leading-snug">
              {validityText}
            </p>

          </div>
        </div>
      )} */}


      {/* ════════════════════════════════════════════
          STICKY BAR (SEPARATE)
      ════════════════════════════════════════════ */}
      <div className="sticky top-0 z-50 bg-[#0a1628] border-b border-white/5 shadow-xl shadow-black/30">

        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3.5 flex items-center justify-between gap-4">

          {/* ════════════════════════════════════════════
            VALIDITY BANNER — shown only if field exists
        ════════════════════════════════════════════ */}
          {validityText && (
            <div className="border-b border-blue-100 bg-gradient-to-r from-[#0a1628] to-[#0f2040]">
              
              {/* TOP VALIDITY BAR */}
              <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3.5 flex items-center gap-3">
                
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Calendar size={14} className="text-white" />
                  </div>
                  <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] hidden sm:block">
                    Validity
                  </span>
                </div>

                <div className="w-px h-5 bg-white/10 hidden sm:block" />

                <p className="text-white/90 text-sm font-semibold leading-snug">
                  {validityText}
                </p>

              </div>
            </div>
          )}

          {/* LEFT SIDE EMPTY or TITLE */}
          <div></div>

          {/* RIGHT SIDE CONTENT */}
          <div className="flex items-center gap-5 ml-auto">
            <div className="text-right">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.18em] block leading-none mb-1">
                Starting From
              </span>
              <span className="text-[1.75rem] font-black text-white italic leading-none">
                {priceStr || 'On Request'}
              </span>
            </div>

            <button
              onClick={() => setEnquiry(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 font-black text-[11px] uppercase tracking-[0.18em] rounded-lg transition-all whitespace-nowrap"
            >
              Book Now →
            </button>
          </div>

        </div>
        
      </div>

      {/* ════════════════════════════════════════════
          MAIN CONTENT — 8 / 4 grid
      ════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14">
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-14">

          {/* ── LEFT COLUMN ── */}
          <main className="lg:col-span-8 space-y-14">

            {/* OVERVIEW */}
            <section>
              <SectionTitle icon={Info}>Overview</SectionTitle>
              {pkg.description && (
                <p className="text-slate-600 text-[15px] leading-relaxed mb-8">{pkg.description}</p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {nights > 0   && <StatCard icon={Clock}    label="Duration"       value={`${days}D / ${nights}N`} />}
                {startCity    && <StatCard icon={MapPin}   label="Starts From"    value={startCity} />}
                {endCity      && <StatCard icon={MapPin}   label="Ends At"        value={endCity} />}
                {pkg.tour_type && <StatCard icon={Activity} label="Tour Type"      value={pkg.tour_type} />}
                {pkg.accommodation_type && <StatCard icon={Hotel} label="Accommodation" value={pkg.accommodation_type} />}
              </div>
            </section>

            {/* HIGHLIGHTS */}
            {highlights.length > 0 && (
              <section>
                <SectionTitle icon={Star}>Highlights</SectionTitle>
                <div className="grid sm:grid-cols-2 gap-3">
                  {highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 hover:border-blue-300 hover:bg-blue-50/40 transition-all">
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} className="text-white" />
                      </div>
                      <span className="text-sm font-semibold text-[#0a1628] leading-snug">{h}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ITINERARY */}
            {itinerary.length > 0 && (
              <section>
                <SectionTitle icon={Activity}>Day-by-Day Itinerary</SectionTitle>
                <div className="mt-2 space-y-1">
                  {itinerary.map((day, i) => (
                    <DayCard key={i} day={day} index={i} />
                  ))}
                </div>
              </section>
            )}

            {/* INCLUSIONS & EXCLUSIONS — premium navy/slate theme */}
            {(inclusions.length > 0 || exclusions.length > 0) && (
              <section>
                <SectionTitle icon={CheckCircle}>Inclusions & Exclusions</SectionTitle>
                <div className="grid md:grid-cols-2 gap-5">

                  {inclusions.length > 0 && (
                    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                      {/* header — dark navy */}
                      <div className="bg-[#0a1628] px-5 py-3.5 flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                          <Check size={13} className="text-white" />
                        </div>
                        <h4 style={{ fontFamily:"'Barlow Condensed', sans-serif" }}
                          className="text-white font-black text-lg uppercase italic tracking-tight">
                          What's Included
                        </h4>
                      </div>
                      <div className="bg-white p-5">
                        <ul className="space-y-3">
                          {inclusions.map((item, i) => (
                            <li key={i} className="flex gap-3 items-start group">
                              <div className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                              </div>
                              <span className="text-sm font-medium text-slate-700 leading-snug group-hover:text-[#0a1628] transition-colors">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {exclusions.length > 0 && (
                    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                      {/* header — medium dark */}
                      <div className="bg-slate-700 px-5 py-3.5 flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-slate-500 flex items-center justify-center">
                          <X size={13} className="text-white" />
                        </div>
                        <h4 style={{ fontFamily:"'Barlow Condensed', sans-serif" }}
                          className="text-white font-black text-lg uppercase italic tracking-tight">
                          Not Included
                        </h4>
                      </div>
                      <div className="bg-white p-5">
                        <ul className="space-y-3">
                          {exclusions.map((item, i) => (
                            <li key={i} className="flex gap-3 items-start">
                              <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                              </div>
                              <span className="text-sm font-medium text-slate-500 leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                </div>
              </section>
            )}

            {/* PHOTO GALLERY */}
            {gallery.length > 0 && (
              <section>
                <SectionTitle icon={ZoomIn}>Photo Gallery</SectionTitle>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 auto-rows-[170px]">
                  {gallery.map((url, i) => (
                    <div
                      key={i}
                      onClick={() => setLightbox(url)}
                      className={`overflow-hidden rounded-xl bg-slate-100 cursor-zoom-in group relative ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                    >
                      <img
                        src={url}
                        alt={`Gallery ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#0a1628]/0 group-hover:bg-[#0a1628]/25 transition-all duration-300 flex items-center justify-center">
                        <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg" />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 font-medium mt-2.5">Click any image to view full size</p>
              </section>
            )}

            {/* IMPORTANT NOTES */}
            {notes.length > 0 && (
              <section>
                <SectionTitle icon={Info}>Important Notes</SectionTitle>
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="bg-slate-900 px-5 py-3.5">
                    <p className="text-slate-300 text-[11px] font-bold uppercase tracking-widest">Please read carefully before booking</p>
                  </div>
                  <div className="bg-white p-5">
                    <ul className="space-y-3">
                      {notes.map((note, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2" />
                          <span className="text-sm font-medium text-slate-600 leading-relaxed">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

          </main>

          {/* ── SIDEBAR ── */}
          <aside className="lg:col-span-4">
            <div className="sticky top-[68px] space-y-5">

              {/* PRICE + ENQUIRE */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <div className="bg-[#0a1628] px-6 py-5">
                  <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5">Package Price</p>
                  <div className="flex items-end gap-2 flex-wrap">
                    <span style={{ fontFamily:"'Barlow Condensed', sans-serif" }}
                      className="text-[2.2rem] font-black text-white italic leading-none">
                      {priceStr || 'On Request'}
                    </span>
                    {pkg.price_per && <span className="text-slate-400 text-sm font-medium pb-0.5">/ {pkg.price_per}</span>}
                  </div>
                  {pkg.price_note && <p className="text-slate-400 text-xs mt-2 leading-snug">{pkg.price_note}</p>}

                  {/* route display in sidebar too */}
                  {(startCity || endCity) && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                      <Plane size={12} className="text-blue-400 shrink-0" />
                      {startCity && endCity ? (
                        <span className="text-white/70 text-xs font-semibold flex items-center gap-1.5">
                          {startCity} <ArrowRight size={10} className="text-blue-400" /> {endCity}
                        </span>
                      ) : (
                        <span className="text-white/70 text-xs font-semibold">{startCity || endCity}</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="bg-white px-6 py-5">
                  <button
                    onClick={() => setEnquiry(true)}
                    className="w-full py-3.5 bg-blue-600 hover:bg-[#0a1628] text-white font-black text-[11px] uppercase tracking-[0.18em] rounded-xl transition-all"
                  >
                    Enquire Now →
                  </button>
                  <p className="text-center text-slate-400 text-[11px] font-medium mt-3">Free consultation · No hidden charges</p>
                </div>
              </div>

              {/* VALIDITY (sidebar echo) */}
              {/* {validityText && (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Calendar size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Package Validity</p>
                    <p className="text-sm font-semibold text-[#0a1628] leading-snug">{validityText}</p>
                  </div>
                </div>
              )} */}

              {/* TRAVEL LOGISTICS */}
              {keyDetails.length > 0 && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <div className="bg-slate-900 px-5 py-3.5">
                    <h4 style={{ fontFamily:"'Barlow Condensed', sans-serif" }}
                      className="text-white font-black text-xl uppercase italic tracking-tight">
                      Travel Logistics
                    </h4>
                  </div>
                  <div className="bg-white px-5 py-3">
                    <ul className="divide-y divide-slate-100">
                      {keyDetails.map((detail, i) => (
                        <li key={i} className="flex gap-3 py-3 items-start">
                          <div className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          </div>
                          <span className="text-[13px] text-slate-600 leading-snug font-medium">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* VERIFIED OPERATOR */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-[#0a1628] rounded-xl flex items-center justify-center shrink-0">
                    <Shield size={17} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-black text-[#0a1628] text-sm uppercase tracking-tight">Verified Operator</h4>
                    <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                      Ministry of Tourism approved. Professional handlers & 24/7 support across all destinations.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                  {['IATA', 'IATO', 'NLA', 'SKAL'].map(c => (
                    <span key={c} className="text-[10px] font-black text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md tracking-wide">{c}</span>
                  ))}
                </div>
              </div>

              {/* NEED HELP */}
              <div className="rounded-2xl bg-[#0a1628] p-5">
                <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Need Help Planning?</p>
                <div className="space-y-2">
                  <a href="tel:+914422722279"
                    className="flex items-center gap-3 bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl px-4 py-3 transition-all group">
                    <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                      <Phone size={14} className="text-white" />
                    </div>
                    <div>
                      <span className="text-white text-sm font-bold block leading-none">Call Us Now</span>
                      <span className="text-blue-400 text-[11px] font-medium">+91-44-2827 2279</span>
                    </div>
                  </a>
                  <button onClick={() => setEnquiry(true)}
                    className="w-full flex items-center gap-3 bg-blue-600 hover:bg-blue-700 rounded-xl px-4 py-3 transition-all">
                    <div className="w-7 h-7 bg-white/15 rounded-lg flex items-center justify-center shrink-0">
                      <Send size={14} className="text-white" />
                    </div>
                    <span className="text-white text-sm font-bold">Send Enquiry</span>
                  </button>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/96 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.18 }}
              src={lightbox}
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              alt="Gallery"
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all border border-white/10"
            >
              <X size={19} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ENQUIRY MODAL */}
      <AnimatePresence>
        {enquiry && <EnquiryModal pkg={pkg} onClose={() => setEnquiry(false)} />}
      </AnimatePresence>

    </div>
  );
};

export default PackageDetail;