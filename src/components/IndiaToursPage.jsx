import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Star, ArrowLeft } from 'lucide-react';

/* ── Category Landing (no slug) ─────────────────────────────────────────── */
const IndiaToursList = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.from('tour_categories')
      .select('*')
      .eq('type', 'india')
      .eq('is_active', true)
      .order('display_order')
      .then(({ data }) => { setCats(data || []); setLoading(false); });
  }, []);

  if (loading) return <Loader/>;

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* --- BACK BUTTON REDIRECTING TO TOURS --- */}
        <div className="mb-10 flex justify-start">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-none font-bold uppercase tracking-widest text-[11px] hover:bg-blue-600 transition-all duration-300 shadow-lg group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back 
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-blue-600 text-[10px] font-bold tracking-[0.28em] uppercase block mb-3">Explore India</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 mb-3">
            India <span className="text-blue-600">Tours</span>
          </h1>
          <div className="w-12 h-0.5 bg-blue-600 mx-auto mb-4"/>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">Select a destination to explore curated packages</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cats.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/tours/india/${cat.slug}`}
                className="group block relative overflow-hidden rounded-none border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                <div className="h-52 overflow-hidden bg-slate-100">
                  {cat.image_url
                    ? <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                    : <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center"><MapPin size={40} className="text-blue-200"/></div>
                  }
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"/>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="text-white font-black text-lg uppercase tracking-tight leading-tight">{cat.name}</h2>
                  {cat.tagline && <p className="text-blue-300 text-[10px] font-bold uppercase tracking-wider mt-0.5">{cat.tagline}</p>}
                </div>
                <div className="absolute top-3 right-3 bg-blue-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={14}/>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Individual Destination Page ─────────────────────────────────────────── */
const IndiaTourDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [cat, setCat]           = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [enquiry, setEnquiry]   = useState(null); 

  useEffect(() => {
    const load = async () => {
      const { data: catData } = await supabase
        .from('tour_categories').select('*').eq('slug', slug).eq('type','india').single();
      if (!catData) { navigate('/tours/india'); return; }
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
  }, [slug]);

  if (loading) return <Loader/>;
  if (!cat) return null;

  return (
    <div className="pt-32 pb-20 bg-[#f0f9ff] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          
          {/* BACK BUTTON REDIRECTING TO LIST */}
          <button 
            onClick={() => navigate('/tours/india')} 
            className="flex items-center gap-3 bg-slate-900 text-white px-5 py-2.5 rounded-none font-bold uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all mb-8 group shadow-lg"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/>
            Back to List
          </button>

          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1">
              <span className="text-blue-600 text-[10px] font-bold tracking-[0.28em] uppercase block mb-2">{cat.tagline}</span>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-none mb-4">
                {cat.name.split(' ')[0]}<br/>
                <span className="text-blue-600">{cat.name.split(' ').slice(1).join(' ')}</span>
              </h1>
              {cat.description && <p className="text-slate-500 text-base max-w-md leading-relaxed">{cat.description}</p>}
            </div>
            {cat.image_url && (
              <div className="w-full lg:w-1/2 h-72 overflow-hidden shadow-2xl">
                <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover"/>
              </div>
            )}
          </div>
        </motion.div>

        {/* Packages */}
        {packages.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg font-bold mb-2">Packages coming soon</p>
            <p className="text-sm">Please check back or <Link to="/contact" className="text-blue-600 underline">contact us</Link></p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} onEnquire={() => setEnquiry(pkg)}/>
            ))}
          </div>
        )}
      </div>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {enquiry && <EnquiryModal pkg={enquiry} onClose={() => setEnquiry(null)}/>}
      </AnimatePresence>
    </div>
  );
};

/* ── Package Card ──────────────────────────────────────────────────────────── */
const PackageCard = ({ pkg, index, onEnquire }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.06 }}
    className="bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group flex flex-col"
  >
    {/* Image */}
    <div className="relative h-48 bg-slate-100 overflow-hidden">
      {pkg.image_url
        ? <img src={pkg.image_url} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
        : <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center"><MapPin size={36} className="text-blue-200"/></div>
      }
      {pkg.badge && (
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1">{pkg.badge}</span>
      )}
      {pkg.nights && (
        <span className="absolute top-3 right-3 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-1 flex items-center gap-1">
          <Clock size={10}/> {pkg.nights}N
        </span>
      )}
    </div>

    {/* Body */}
    <div className="p-5 flex flex-col flex-grow">
      <h3 className="font-black text-slate-900 text-base uppercase tracking-tight leading-tight mb-1">{pkg.name}</h3>

      {pkg.route_covering && (
        <div className="flex items-start gap-1.5 mb-3">
          <MapPin size={11} className="text-blue-500 flex-shrink-0 mt-0.5"/>
          <p className="text-blue-600 text-[10px] font-bold leading-tight">{pkg.route_covering}</p>
        </div>
      )}

      {pkg.description && (
        <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">{pkg.description}</p>
      )}

      {pkg.highlights?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.highlights.slice(0, 3).map(h => (
            <span key={h} className="text-[9px] font-medium bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{h}</span>
          ))}
        </div>
      )}

      {pkg.start_city && (
        <p className="text-[10px] text-slate-400 mb-4">Starting from: <span className="font-bold text-slate-600">{pkg.start_city}</span></p>
      )}

      <div className="mt-auto flex gap-2">
        {pkg.price && (
          <div className="flex flex-col justify-center">
            <p className="text-[9px] text-slate-400 uppercase tracking-wider">Starting</p>
            <p className="text-blue-600 font-black text-base">₹{Number(pkg.price).toLocaleString()}</p>
          </div>
        )}
        <button onClick={onEnquire}
          className="flex-1 bg-slate-900 text-white py-2.5 text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
          Enquire Now <ArrowRight size={12}/>
        </button>
      </div>
    </div>
  </motion.div>
);

/* ── Enquiry Modal ─────────────────────────────────────────────────────────── */
const EnquiryModal = ({ pkg, onClose }) => {
  const [form, setForm] = useState({ name:'', phone:'', email:'', travel_date:'', pax:1, message:'' });
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
    <motion.div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div className="bg-white w-full max-w-md rounded-none shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}>
        <div className="bg-slate-900 text-white px-6 py-5">
          <h3 className="font-black text-lg uppercase tracking-tight">Enquire Now</h3>
          <p className="text-blue-300 text-xs font-bold mt-0.5 uppercase tracking-wider">{pkg.name}</p>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star size={28} className="text-emerald-600"/>
            </div>
            <h3 className="font-black text-slate-900 text-xl mb-2">Enquiry Sent!</h3>
            <p className="text-slate-500 text-sm mb-6">Our team will contact you within 24 hours.</p>
            <button onClick={onClose} className="bg-blue-600 text-white px-8 py-3 font-bold text-sm uppercase tracking-wider hover:bg-blue-700 transition-colors">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <Field label="Full Name *" value={form.name} onChange={v => setForm({...form, name:v})} required placeholder="Your name"/>
            <Field label="Phone *" value={form.phone} onChange={v => setForm({...form, phone:v})} required placeholder="+91 98765 43210" type="tel"/>
            <Field label="Email" value={form.email} onChange={v => setForm({...form, email:v})} placeholder="you@email.com" type="email"/>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Travel Date" value={form.travel_date} onChange={v => setForm({...form, travel_date:v})} type="date"/>
              <Field label="No. of Persons" value={form.pax} onChange={v => setForm({...form, pax:v})} type="number" min="1"/>
            </div>
            <div>
              <label className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-1.5">Message</label>
              <textarea rows={3} value={form.message} onChange={e => setForm({...form, message:e.target.value})}
                placeholder="Any special requirements..."
                className="w-full border border-gray-200 px-3 py-2 text-sm text-slate-800 resize-none focus:outline-none focus:border-blue-400"/>
            </div>
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={submitting}
                className="flex-1 bg-blue-600 text-white py-3 font-black uppercase tracking-widest text-xs hover:bg-blue-700 disabled:bg-blue-300 transition-colors">
                {submitting ? 'Sending...' : 'Send Enquiry'}
              </button>
              <button type="button" onClick={onClose}
                className="px-5 border border-gray-200 text-slate-500 font-medium text-sm hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

const Field = ({ label, value, onChange, required, placeholder, type='text', min }) => (
  <div>
    <label className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-1.5">{label}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)}
      required={required} placeholder={placeholder} min={min}
      className="w-full border border-gray-200 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-400 transition-colors"/>
  </div>
);

const Loader = () => (
  <div className="h-screen flex items-center justify-center">
    <div className="text-blue-600 font-black tracking-widest uppercase text-sm animate-pulse">Loading...</div>
  </div>
);

/* ── Exports ─────────────────────────────────────────────────────────────── */
export { IndiaToursList, IndiaTourDetail, PackageCard, EnquiryModal };
export default IndiaTourDetail;