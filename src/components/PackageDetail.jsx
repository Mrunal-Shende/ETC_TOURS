import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ChevronRight, ChevronDown, ChevronUp,
  MapPin, Clock, Users, CheckCircle, XCircle,
  Phone, Send, X, Star, Hotel,
  Activity, ZoomIn, Info, Shield, Check, Calendar,
  ArrowRight, Plane, BedDouble, Utensils
} from 'lucide-react';
import { supabase } from '../supabaseClient';

/* ═══════════════════════════════════════════════
   SAFE DATA HELPERS
═══════════════════════════════════════════════ */
const safeLines  = (v) => (v && typeof v === 'string' ? v.split('\n').filter(Boolean) : []);
const safeCommas = (v) => (v && typeof v === 'string' ? v.split(',').map(s => s.trim()).filter(Boolean) : []);
const safeArray  = (v) => (Array.isArray(v) ? v : []);
const safeJSON   = (v) => {
  if (Array.isArray(v)) return v;
  if (v && typeof v === 'string') {
    try { const p = JSON.parse(v); return Array.isArray(p) ? p : []; }
    catch { return []; }
  }
  return [];
};
const fmtPrice = (v) => { const n = Number(v); return (isNaN(n) || n === 0) ? null : '₹' + n.toLocaleString('en-IN'); };

/* ═══════════════════════════════════════════════
   SECTION TITLE
═══════════════════════════════════════════════ */
const SectionTitle = ({ children, icon: Icon }) => (
  <div className="mb-6 sm:mb-8">
    <div className="flex items-center gap-3 mb-2">
      {Icon && (
        <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded shrink-0">
          <Icon size={15} className="text-white" />
        </div>
      )}
      <h2
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        className="text-[#0a1628] font-black text-2xl sm:text-3xl uppercase tracking-tight leading-none"
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
    <div className="relative pl-10 sm:pl-12 pb-4 last:pb-0">
      <div className="absolute left-[18px] top-8 bottom-0 w-px bg-slate-200" />
      <div className={`absolute left-0 top-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center z-10 border-2 border-white shadow font-black text-xs text-white transition-colors duration-200 ${open ? 'bg-blue-600' : 'bg-[#0a1628]'}`}>
        {index + 1}
      </div>
      <div className={`rounded-xl border transition-all duration-200 ${open ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}>
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left px-4 sm:px-5 py-4 gap-4">
          <h3 className={`font-black text-xs sm:text-sm uppercase tracking-wide leading-snug ${open ? 'text-blue-600' : 'text-[#0a1628]'}`}>
            {day.title || `Day ${index + 1}`}
          </h3>
          <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${open ? 'bg-blue-50' : 'bg-slate-100'}`}>
            {open ? <ChevronUp size={13} className="text-blue-600" /> : <ChevronDown size={13} className="text-slate-500" />}
          </div>
        </button>
        {open && (
          <div className="px-4 sm:px-5 pb-5">
            <div className="h-px w-full bg-slate-100 mb-4" />
            <p className="text-slate-600 text-sm leading-relaxed">{day.description || ''}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AccommodationTable = ({ rows }) => {
  if (!rows || rows.length === 0) return null;
  const formatMealPlan = (plan) => {
    const map = { CP: 'Breakfast', MAP: 'Breakfast + Dinner', AP: 'All Meals', EP: 'Room Only', BB: 'Bed & Breakfast' };
    return map[plan] || plan || '—';
  };

  const hasA = rows.some(r => r.cat_a);
  const hasB = rows.some(r => r.cat_b);
  const hasC = rows.some(r => r.cat_c);
  const hasMeal = rows.some(r => r.meal_plan);

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <div className="bg-[#0a1628] px-5 py-3.5 flex items-center gap-2.5">
        <BedDouble size={14} className="text-blue-500" />
        <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif" }} className="text-white font-black text-lg uppercase italic tracking-tight">Accommodation</h4>
      </div>
      <div className="overflow-x-auto bg-white">
        <table className="w-full min-w-[500px] text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-4 py-3 text-[10px] font-black text-[#0a1628] uppercase tracking-wider">City</th>
              <th className="text-center px-4 py-3 text-[10px] font-black text-[#0a1628] uppercase tracking-wider">Nights</th>
              {hasA && <th className="text-center px-4 py-3 text-[10px] font-black text-[#0a1628] uppercase tracking-wider">Category A</th>}
              {hasB && <th className="text-center px-4 py-3 text-[10px] font-black text-[#0a1628] uppercase tracking-wider">Category B</th>}
              {hasC && <th className="text-center px-4 py-3 text-[10px] font-black text-[#0a1628] uppercase tracking-wider">Category C</th>}
              {hasMeal && <th className="text-center px-4 py-3 text-[10px] font-black text-[#0a1628] uppercase tracking-wider">Plan</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={`border-b border-slate-100 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                <td className="px-4 py-3.5 font-bold text-[#0a1628]">{row.city || '—'}</td>
                <td className="px-4 py-3.5 text-center"><span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0a1628] text-white font-black text-[10px]">{row.nights ?? '—'}</span></td>
                {hasA && <td className="px-4 py-3.5 text-center text-slate-600 text-xs">{row.cat_a || '—'}</td>}
                {hasB && <td className="px-4 py-3.5 text-center text-slate-600 text-xs">{row.cat_b || '—'}</td>}
                {hasC && <td className="px-4 py-3.5 text-center text-slate-600 text-xs">{row.cat_c || '—'}</td>}
                {hasMeal && <td className="px-4 py-3.5 text-center text-blue-700 font-bold text-[10px] uppercase">{formatMealPlan(row.meal_plan)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
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

  const field = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault(); setSending(true);
    try {
      await supabase.from('enquiries').insert({ ...form, package_id: pkg?.id });
      setDone(true);
    } catch { alert('Error sending request.'); }
    finally { setSending(false); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0a1628]/90 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="bg-[#0a1628] px-6 py-4 flex justify-between items-center">
          <h2 style={{ fontFamily:"'Barlow Condensed', sans-serif" }} className="text-white text-2xl font-black uppercase italic">Enquire Now</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20} /></button>
        </div>
        <div className="p-6 overflow-y-auto">
          {done ? (
            <div className="text-center py-6">
              <CheckCircle size={48} className="text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-black uppercase text-[#0a1628]">Request Received!</h3>
              <p className="text-slate-500 text-sm mt-2 mb-6">Our travel experts will contact you shortly.</p>
              <button onClick={onClose} className="w-full py-3 bg-[#0a1628] text-white font-black uppercase text-xs rounded-xl">Close</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <input required placeholder="Full Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none" value={form.name} onChange={field('name')} />
              <input required placeholder="Phone Number" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none" value={form.phone} onChange={field('phone')} />
              <div className="grid grid-cols-2 gap-3">
                <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" value={form.travel_date} onChange={field('travel_date')} />
                <input type="number" min="1" placeholder="Pax" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" value={form.pax} onChange={field('pax')} />
              </div>
              <textarea rows={3} placeholder="Any special requirements..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none resize-none" value={form.message} onChange={field('message')} />
              <button type="submit" disabled={sending} className="w-full py-4 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-blue-700 transition-all">
                {sending ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   STAT CARD
═══════════════════════════════════════════════ */
const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 hover:border-blue-200 transition-all">
    <Icon size={14} className="text-blue-600 mb-2" />
    <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="text-xs sm:text-sm font-black text-[#0a1628] mt-0.5 leading-tight">{value}</p>
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
        const { data: p, error: pErr } = await supabase.from('tour_packages').select('*').eq('id', packageId).single();
        if (pErr || !p) { setStatus('error'); return; }
        setPkg(p);
        if (p.category_id) {
          const { data: c } = await supabase.from('tour_categories').select('*').eq('id', p.category_id).single();
          if (c) setCat(c);
        }
        setStatus('ok');
      } catch { setStatus('error'); }
    })();
  }, [packageId]);

  if (status === 'loading') return <div className="min-h-screen bg-white flex items-center justify-center font-bold text-slate-400">Loading Journey...</div>;

  if (status === 'error' || !pkg) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-black uppercase text-[#0a1628]">Package Not Found</h2>
      <button onClick={() => navigate('/tours/india')} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold uppercase text-xs">Back to Tours</button>
    </div>
  );

  const nights         = Number(pkg.nights) || 0;
  const days           = nights + 1;
  const itinerary      = safeArray(pkg.itinerary);
  const inclusionsLines = safeLines(pkg.inclusions);
  const exclusions     = safeLines(pkg.exclusions);
  const keyDetails     = safeLines(pkg.key_details);
  const highlights     = safeLines(pkg.highlights);
  const gallery        = safeCommas(pkg.gallery);
  const accommodation  = safeJSON(pkg.accommodation);
  const heroImage      = pkg.image_url || cat?.image_url || null;
  const startCity      = pkg.start_city || null;
  const endCity        = pkg.end_city && pkg.end_city !== pkg.start_city ? pkg.end_city : null;

  return (
    <div className="min-h-screen bg-white">

      {/* ════════════════════════════════════════
          HERO - RESPONSIVE TEXT SIZE
      ════════════════════════════════════════ */}
      <div className="relative w-full h-[50vh] sm:h-[85vh] min-h-[400px] overflow-hidden bg-[#0a1628] flex items-center justify-center">
        {heroImage && (
          <img src={heroImage} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0a1628 5%, transparent 95%)' }} />

        {/* Back Button */}
        <div className="absolute top-24 sm:top-28 left-4 sm:left-10 z-20">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 bg-black/30 hover:bg-black/50 border border-white/20 text-white rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all">
            <ArrowLeft size={12} /> Back
          </button>
        </div>

        {/* Dynamic Heading - Responsive via clamp */}
        <div className="relative z-10 text-center max-w-5xl px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {cat?.name && (
              <p className="text-blue-400 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] mb-3 sm:mb-4">{cat.name}</p>
            )}
            <h1 
              style={{ 
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(32px, 8vw, 72px)" // Chota mobile me 32px, bade me 72px max
              }}
              className="text-white font-black uppercase tracking-tighter leading-[1.1] sm:leading-[1]"
            >
              {pkg.name}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          STICKY BAR
      ════════════════════════════════════════ */}
      <div className="sticky top-0 z-50 bg-[#0a1628] border-b border-white/5 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 py-3 sm:py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-6 overflow-hidden">
            <span className="text-white/90 text-[10px] sm:text-xs font-black uppercase tracking-widest whitespace-nowrap">{days}D / {nights}N</span>
            <div className="flex items-center gap-2 text-blue-400 truncate">
               <MapPin size={12} className="shrink-0" />
               <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide truncate">{startCity} {endCity && `→ ${endCity}`}</span>
            </div>
          </div>
          <button onClick={() => setEnquiry(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-8 py-2.5 sm:py-3 font-black text-[10px] sm:text-[11px] uppercase tracking-widest rounded-lg transition-all whitespace-nowrap">
            Book Now
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════
          MAIN CONTENT - GRID RESPONSIVE
      ════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT COLUMN */}
          <main className="lg:col-span-8 space-y-12 sm:space-y-14">
            <section>
              <SectionTitle icon={Info}>Overview</SectionTitle>
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-8">{pkg.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {nights > 0 && <StatCard icon={Clock} label="Duration" value={`${days}D / ${nights}N`} />}
                {startCity && <StatCard icon={MapPin} label="Starts From" value={startCity} />}
                {pkg.tour_type && <StatCard icon={Activity} label="Tour Type" value={pkg.tour_type} />}
                {pkg.accommodation_type && <StatCard icon={Hotel} label="Stay" value={pkg.accommodation_type} />}
              </div>
            </section>

            {highlights.length > 0 && (
              <section>
                <SectionTitle icon={Star}>Highlights</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"><Check size={14} className="text-blue-600 mt-1 shrink-0" /><span className="text-xs sm:text-sm font-semibold text-[#0a1628]">{h}</span></div>
                  ))}
                </div>
              </section>
            )}

            {itinerary.length > 0 && (
              <section>
                <SectionTitle icon={Activity}>Itinerary</SectionTitle>
                <div className="space-y-1">{itinerary.map((day, i) => <DayCard key={i} day={day} index={i} />)}</div>
              </section>
            )}

            {accommodation.length > 0 && (
              <section>
                <SectionTitle icon={BedDouble}>Accommodation</SectionTitle>
                <AccommodationTable rows={accommodation} />
              </section>
            )}

            <section>
              <SectionTitle icon={CheckCircle}>Inclusions & Exclusions</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h4 className="text-[10px] font-black uppercase text-blue-600 mb-4 tracking-widest">Inclusions</h4>
                  <ul className="space-y-3">
                    {inclusionsLines.map((item, i) => (
                      <li key={i} className="text-xs text-slate-700 flex gap-2"><span>•</span> {item}</li>
                    ))}
                  </ul>
                </div>
                {exclusions.length > 0 && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 opacity-80">
                     <h4 className="text-[10px] font-black uppercase text-red-500 mb-4 tracking-widest">Exclusions</h4>
                     <ul className="space-y-3">
                       {exclusions.map((item, i) => (<li key={i} className="text-xs text-slate-500 flex gap-2"><span>•</span> {item}</li>))}
                     </ul>
                  </div>
                )}
              </div>
            </section>

            {gallery.length > 0 && (
              <section>
                <SectionTitle icon={ZoomIn}>Photo Gallery</SectionTitle>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 auto-rows-[120px] sm:auto-rows-[170px]">
                  {gallery.map((url, i) => (
                    <div key={i} onClick={() => setLightbox(url)} className={`overflow-hidden rounded-xl bg-slate-100 cursor-zoom-in ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                      <img src={url} className="w-full h-full object-cover hover:scale-105 transition-all duration-500" alt="" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* RIGHT COLUMN - SIDEBAR */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-[80px] space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h4 className="font-black text-[#0a1628] text-sm uppercase tracking-tight mb-4 text-center sm:text-left">Plan Your Journey</h4>
                <div className="space-y-3">
                  <button onClick={() => setEnquiry(true)} className="w-full py-4 bg-[#0a1628] text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">Send Enquiry Now</button>
                  <a href="tel:+914422722279" className="w-full py-3.5 border border-slate-200 text-[#0a1628] font-black uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"><Phone size={12}/> Call Travel Expert</a>
                </div>
              </div>

              {keyDetails.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h4 className="font-black text-[#0a1628] text-[11px] uppercase tracking-widest mb-4 border-b pb-2">Travel Logistics</h4>
                  <ul className="space-y-4">
                    {keyDetails.map((detail, i) => (
                      <li key={i} className="flex gap-3 text-xs font-semibold text-slate-600 leading-snug"><Check size={12} className="text-blue-600 mt-0.5 shrink-0"/> {detail}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-2xl bg-blue-600 p-6 text-white shadow-xl shadow-blue-100">
                <Shield className="mb-3 opacity-50" size={20} />
                <h4 className="font-black text-xs uppercase tracking-widest">Verified Operator</h4>
                <p className="text-[10px] font-medium mt-1 leading-relaxed opacity-90">Ministry of Tourism approved. Professional handlers with 24/7 on-ground support across India.</p>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
            <img src={lightbox} className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" alt="" />
            <button className="absolute top-6 right-6 text-white/70 hover:text-white"><X size={32}/></button>
          </div>
        )}
      </AnimatePresence>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {enquiry && <EnquiryModal pkg={pkg} onClose={() => setEnquiry(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default PackageDetail;