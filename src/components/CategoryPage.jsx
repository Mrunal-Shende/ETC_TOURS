import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane, Hotel, Utensils, Activity, Car,
  Quote, Ship, Star, X, ChevronRight, Info, MapPin, Calendar, IndianRupee
} from 'lucide-react';
import { supabase } from '../supabaseClient';

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
   ENQUIRY MODAL
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
      className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="bg-white w-full max-w-md shadow-2xl overflow-hidden rounded-xl"
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
            <div className="w-16 h-16 bg-blue-50 flex items-center justify-center mx-auto mb-4 rounded-full">
              <Star size={28} className="text-blue-600" />
            </div>
            <h3 className="font-black text-slate-900 text-xl mb-2">Enquiry Sent!</h3>
            <p className="text-slate-500 text-sm mb-6">Our team will contact you within 24 hours.</p>
            <button onClick={onClose}
              className="bg-blue-600 text-white px-8 py-3 font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors rounded-lg">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="field-label">Full Name *</label>
              <input type="text" required placeholder="Your name" value={form.name} onChange={set('name')} className="field-input" />
            </div>
            <div>
              <label className="field-label">Phone *</label>
              <input type="tel" required placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} className="field-input" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="field-label">Travel Date</label>
                <input type="date" value={form.travel_date} onChange={set('travel_date')} className="field-input" />
              </div>
              <div>
                <label className="field-label">Persons</label>
                <input type="number" min="1" value={form.pax} onChange={set('pax')} className="field-input" />
              </div>
            </div>
            <div>
              <label className="field-label">Message</label>
              <textarea rows={3} placeholder="Any special requirements..." value={form.message} onChange={set('message')} className="field-input resize-none" />
            </div>
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={sending}
                className="flex-1 bg-blue-600 text-white py-3 font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-colors rounded-lg">
                {sending ? 'Sending...' : 'Send Enquiry'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   VIEW DETAILS MODAL
───────────────────────────────────────────────────────────── */
const DetailsModal = ({ pkg, onClose, onEnquire }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/80 z-[110] flex items-center justify-center p-4 backdrop-blur-md"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl flex flex-col shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="relative h-64 flex-shrink-0">
          <img src={pkg.image_url || '/placeholder.jpg'} alt={pkg.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 hover:bg-black p-2 rounded-full text-white transition-all"><X size={20}/></button>
          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">{pkg.name}</h2>
            <div className="flex flex-wrap gap-3 mt-2">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 bg-blue-950/50 px-3 py-1 rounded-full uppercase"><Calendar size={12}/> {pkg.nights}N / {pkg.nights + 1}D</span>
              {pkg.price && <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full uppercase"><IndianRupee size={12}/> ₹{Number(pkg.price).toLocaleString()}</span>}
            </div>
          </div>
        </div>

        <div className="overflow-y-auto p-6 md:p-8 space-y-6 bg-slate-50">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Detailed Route</h4>
            <div className="flex items-start gap-3 text-slate-700">
              <MapPin className="text-red-500 mt-0.5 flex-shrink-0" size={18}/>
              <p className="text-sm font-bold leading-relaxed uppercase">{pkg.route_covering || 'Route details update soon.'}</p>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-3">Key Highlights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pkg.highlights && pkg.highlights.length > 0 ? (
                pkg.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-3 border border-slate-100 rounded-lg shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className="text-[12px] text-slate-600 font-bold uppercase tracking-tight">{h}</span>
                  </div>
                ))
              ) : <p className="text-slate-400 italic text-sm">Highlights info coming soon.</p>}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Package Description</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">{pkg.description || 'Embark on a beautifully curated journey with Express Travel. We ensure premium stays and seamless transfers.'}</p>
          </div>
        </div>

        <div className="p-4 bg-white border-t flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 text-slate-500 font-bold text-xs uppercase hover:bg-slate-100 rounded-lg">Close</button>
          <button onClick={() => { onClose(); onEnquire(pkg); }} className="bg-blue-600 text-white px-10 py-3 font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all rounded-lg shadow-lg shadow-blue-200">Enquire Now</button>
        </div>
      </motion.div>
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
  const [viewPkg, setViewPkg]   = useState(null); // State for View Details
  const [testIdx, setTestIdx]   = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTestIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data: catData } = await supabase.from('tour_categories').select('*').eq('slug', slug).eq('type', type).single();
      if (!catData) {
        navigate(type === 'india' ? '/tours/india' : '/tours/international');
        return;
      }
      setCat(catData);
      const { data: pkgData } = await supabase.from('tour_packages').select('*').eq('category_id', catData.id).eq('is_active', true).order('display_order');
      setPackages(pkgData || []);
      setLoading(false);
    };
    load();
  }, [slug, type, navigate]);

  if (loading) {
    return (
      <div className="pt-32 pb-16 bg-[#f0f9ff] min-h-screen flex items-center justify-center font-black text-blue-600 uppercase tracking-widest animate-pulse">
        Loading Experiences...
      </div>
    );
  }

  if (!cat) return null;

  return (
    <div className="pt-32 pb-16 bg-[#f0f9ff] font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-12 bg-cyan-600" />
              <span className="text-cyan-600 font-bold uppercase tracking-[0.3em] text-[10px]">{cat.tagline || cat.name}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-[0.9]">
              {cat.name.split(' ')[0]} <br />
              <span className="text-blue-700">{cat.name.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-lg font-medium text-slate-500 max-w-md leading-relaxed">{cat.description || `Expertly curated ${cat.name} packages.`}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full lg:w-1/2 h-[380px] relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-blue-900/10" />
          </motion.div>
        </div>

        {/* PACKAGE GRID */}
        {packages.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-slate-200">
             <Ship size={48} className="text-slate-300 mx-auto mb-4" />
             <p className="text-slate-400 font-black uppercase tracking-widest">Coming Soon</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {packages.map((pkg, idx) => (
              <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 overflow-hidden flex flex-col group border border-slate-100 hover:border-blue-200 transition-colors"
              >
                <div className="relative h-60 overflow-hidden">
                  <img src={pkg.image_url || cat.image_url} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  {pkg.nights && <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">{pkg.nights + 1}D / {pkg.nights}N</div>}
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <h3 className="font-black text-lg uppercase tracking-tight leading-tight line-clamp-2">{pkg.name}</h3>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                   <div className="flex items-start gap-2 mb-4">
                      <MapPin size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-tight line-clamp-2">{pkg.route_covering || 'Incredible Route'}</p>
                   </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {inclusions.slice(0, 3).map((inc, i) => (
                      <div key={i} title={inc.text} className="w-7 h-7 flex items-center justify-center bg-slate-50 rounded text-slate-400">{inc.icon}</div>
                    ))}
                  </div>

                  <div className="space-y-2 mt-auto">
                    <button onClick={() => setViewPkg(pkg)}
                      className="w-full py-3 bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all rounded-lg flex items-center justify-center gap-2">
                      <Info size={14}/> View Details
                    </button>
                    <button onClick={() => setEnquiry(pkg)}
                      className="w-full py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all rounded-lg shadow-lg shadow-blue-100">
                      Enquire Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* FEEDBACK SECTION */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 shadow-xl rounded-3xl border border-blue-50 relative overflow-hidden">
            <Quote className="absolute -top-4 -right-4 text-blue-50/50" size={120} />
            <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-8 border-b pb-2 inline-block">Client Feedback</h3>
            <AnimatePresence mode="wait">
              <motion.div key={testIdx} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }}>
                <p className="text-slate-600 italic text-sm leading-relaxed mb-6">"{testimonials[testIdx].text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 flex items-center justify-center text-white text-xs font-black rounded-xl">{testimonials[testIdx].init}</div>
                  <p className="font-black text-slate-900 text-[11px] uppercase tracking-wider">{testimonials[testIdx].name}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-2 bg-gradient-to-br from-blue-900 to-slate-900 p-12 flex flex-col justify-center rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 relative z-10">Explore Your <br /><span className="text-cyan-400">Dream Destination!</span></h2>
            <p className="text-blue-200 font-bold italic mb-8 relative z-10">Experience the Joy of hassle-free travel with our experts.</p>
            <Link to="/enquiry" className="bg-white text-slate-900 px-12 py-4 font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all self-start rounded-full relative z-10">Click Here</Link>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {viewPkg && <DetailsModal pkg={viewPkg} onClose={() => setViewPkg(null)} onEnquire={setEnquiry} />}
        {enquiry && <EnquiryModal pkg={enquiry} onClose={() => setEnquiry(null)} />}
      </AnimatePresence>

      <style>{`
        .field-label { display:block; color:#64748b; font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:.06em; margin-bottom:6px; }
        .field-input  { width:100%; border:1px solid #e2e8f0; padding:12px; font-size:14px; color:#1e293b; outline:none; transition:all .2s; border-radius:8px; background:#f8fafc; }
        .field-input:focus { border-color:#3b82f6; background:white; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }
      `}</style>
    </div>
  );
};

export default CategoryPage;