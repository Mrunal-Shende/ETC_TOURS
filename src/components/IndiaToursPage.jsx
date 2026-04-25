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
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-bottom" />

      {(pkg.duration || pkg.nights) && (
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border-l-2 border-blue-500">
          <Clock size={9} /> {pkg.duration || `${pkg.nights}N`}
        </div>
      )}

      {pkg.badge && (
        <div className="absolute top-4 right-4 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1">
          {pkg.badge}
        </div>
      )}

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
   INDIA TOURS LIST
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

      {/* ── HERO SECTION ── */}
      <div className="relative h-[100vh] min-h-[600px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[#0a0f1e]">
          <div className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.6) 0%, transparent 100%),
                                radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.4) 0%, transparent 100%),
                                radial-gradient(1px 1px at 50% 10%, rgba(255,255,255,0.5) 0%, transparent 100%),
                                radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.3) 0%, transparent 100%),
                                radial-gradient(1px 1px at 90% 40%, rgba(255,255,255,0.6) 0%, transparent 100%)`
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/2"
            style={{ background: 'linear-gradient(to top, rgba(10,15,30,0.95) 0%, transparent 100%)' }} />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center">
            <div className="border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 mb-8 flex flex-col items-center gap-1">
              <span className="text-white font-black text-base tracking-tight italic">Incredible <span className="text-blue-500">I</span>ndia</span>
              <span className="text-blue-400 text-[9px] font-bold tracking-[0.3em] uppercase">Heritage · Nature · Culture · Adventure</span>
            </div>
            <h1 className="text-white font-black uppercase leading-none tracking-tighter" style={{ fontSize: 'clamp(72px, 14vw, 160px)' }}>INDIA</h1>
            <h2 className="text-blue-500 font-black uppercase leading-none tracking-tighter mt-1" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>TOURS</h2>
          </motion.div>
        </div>
      </div>

      {/* ── CATEGORIES SECTION (Updated Cards) ── */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          
          <button onClick={() => navigate('/')} className="group flex items-center gap-2.5 text-slate-400 hover:text-blue-600 px-0 py-3 font-black uppercase tracking-widest text-[9px] transition-all duration-300 mb-12">
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {cats.map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} 
                   className="flex flex-col items-center text-center h-full"> {/* h-full added for vertical alignment */}
                
                <div className="w-full aspect-[5/4] overflow-hidden border-[6px] border-white shadow-sm ring-1 ring-gray-100 mb-6 cursor-pointer" onClick={() => navigate(`/tours/india/${cat.slug}`)}>
                  {cat.image_url 
                    ? <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-slate-50 flex items-center justify-center"><MapPin size={24} className="text-slate-200" /></div>
                  }
                </div>

                <h2 className="text-slate-800 font-bold text-lg uppercase tracking-[0.2em] mb-4">{cat.name}</h2>
                
                {/* Description - flex-1 pushes the button to the bottom */}
                <p className="text-slate-500 text-[11px] leading-relaxed font-medium mb-6 px-2 line-clamp-3 flex-1">
                  {cat.description || cat.tagline || `Explore the wonders of ${cat.name}.`}
                </p>

                {/* Button Alignment - mt-auto ensures they stay in one line across cards */}
                <Link to={`/tours/india/${cat.slug}`} className="mt-auto border border-slate-800 text-slate-800 px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 hover:text-white transition-all duration-300">
                  Read More
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
   INDIA TOUR DETAIL
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
      const { data: catData } = await supabase.from('tour_categories').select('*').eq('slug', slug).eq('type', 'india').single();
      if (!catData) { navigate('/tours/india'); return; }
      setCat(catData);
      const { data: pkgData } = await supabase.from('tour_packages').select('*').eq('category_id', catData.id).eq('is_active', true).order('display_order');
      setPackages(pkgData || []);
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading) return <Loader />;
  if (!cat) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans">
      <div className="relative h-[100vh] min-h-[600px] overflow-hidden">
        {cat.image_url
          ? <img src={cat.image_url} alt={cat.name} className="absolute inset-0 w-full h-full object-cover" style={{ animation: 'kenBurns 8s ease-out forwards' }} />
          : <div className="absolute inset-0 bg-[#0a0f1e]" />
        }
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px]" style={{ background: GOLD }} />
              <span className="font-black tracking-[0.4em] text-[9px] md:text-[10px] uppercase" style={{ color: GOLD }}>{cat.tagline || 'India Tours'}</span>
              <div className="w-8 h-[1px]" style={{ background: GOLD }} />
            </div>
            <h1 className="text-white font-black uppercase tracking-tighter leading-none" style={{ fontSize: 'clamp(64px, 13vw, 150px)' }}>{cat.name}</h1>
            <div className="h-1 w-20 bg-blue-500 my-6" />
          </motion.div>
        </div>
      </div>

      <div className="bg-[#F8F9FC] py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-[1px]" style={{ background: GOLD }} />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: GOLD }}>Our Curated Packages</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {packages.map((pkg, i) => <PackageCard key={pkg.id} pkg={pkg} index={i} onEnquire={() => setEnquiry(pkg)} />)}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {enquiry && <EnquiryModal pkg={enquiry} onClose={() => setEnquiry(null)} />}
      </AnimatePresence>

      <style>{`@keyframes kenBurns { 0% { transform: scale(1.08); } 100% { transform: scale(1.0); } }`}</style>
    </div>
  );
};

export { IndiaToursList, IndiaTourDetail, PackageCard, EnquiryModal };
export default IndiaTourDetail;