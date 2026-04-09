import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, ChevronDown, ChevronUp,
  MapPin, Clock, Users, CheckCircle, XCircle,
  Phone, Send, X, Star, Hotel,
  Plane, Utensils, Car, Activity, Info, Image
} from 'lucide-react';
import { supabase } from '../supabaseClient';

/* ─── Enquiry Modal ──────────────────────────────────────────────────────── */
const EnquiryModal = ({ pkg, onClose }) => {
  const [form, setForm]       = useState({ name:'', phone:'', email:'', travel_date:'', pax:1, message:'' });
  const [sending, setSending] = useState(false);
  const [done, setDone]       = useState(false);
  const set = k => e => setForm({ ...form, [k]: e.target.value });

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
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="bg-white w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        initial={{ scale:0.95, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.95 }}
      >
        <div className="bg-slate-900 text-white px-6 py-5 flex items-start justify-between">
          <div>
            <h3 className="font-black text-lg uppercase tracking-tight">Enquire Now</h3>
            <p className="text-blue-300 text-[10px] font-bold mt-0.5 uppercase tracking-wider line-clamp-1">
              {pkg?.name}
            </p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white mt-1"><X size={20}/></button>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <Star size={28} className="text-blue-600"/>
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
            {[
              { label:'Full Name *', key:'name',  type:'text',  req:true,  ph:'Your name'       },
              { label:'Phone *',     key:'phone', type:'tel',   req:true,  ph:'+91 98765 43210' },
              { label:'Email',       key:'email', type:'email', req:false, ph:'you@email.com'   },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1.5">{f.label}</label>
                <input type={f.type} required={f.req} placeholder={f.ph}
                  value={form[f.key]} onChange={set(f.key)}
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-400 transition-colors"/>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1.5">Travel Date</label>
                <input type="date" value={form.travel_date} onChange={set('travel_date')}
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-400"/>
              </div>
              <div>
                <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1.5">Persons</label>
                <input type="number" min="1" value={form.pax} onChange={set('pax')}
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-400"/>
              </div>
            </div>
            <div>
              <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1.5">Message</label>
              <textarea rows={3} placeholder="Any special requirements..."
                value={form.message} onChange={set('message')}
                className="w-full border border-gray-200 px-3 py-2 text-sm text-slate-800 resize-none focus:outline-none focus:border-blue-400"/>
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
      </motion.div>
    </motion.div>
  );
};

/* ─── Day Accordion ──────────────────────────────────────────────────────── */
const DayCard = ({ day, index }) => {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors ${
          open ? 'bg-blue-600' : 'bg-white hover:bg-gray-50'
        }`}
      >
        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 flex-shrink-0 ${
          open ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
        }`}>
          Day {day.day_number}
        </span>
        <span className={`font-black text-sm uppercase tracking-tight flex-1 text-left ${
          open ? 'text-white' : 'text-slate-800'
        }`}>
          {day.title}
        </span>
        {open
          ? <ChevronUp size={16} className="text-white/80 flex-shrink-0"/>
          : <ChevronDown size={16} className="text-slate-400 flex-shrink-0"/>}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height:0, opacity:0 }}
            animate={{ height:'auto', opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:0.28 }}
            className="overflow-hidden"
          >
            <div className="px-5 py-4 bg-blue-50/30 border-t border-blue-100">
              <p className="text-slate-600 text-sm leading-relaxed">{day.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────────────────────── */
const PackageDetail = () => {
  const { packageId } = useParams();
  const navigate      = useNavigate();

  const [pkg, setPkg]         = useState(null);
  const [cat, setCat]         = useState(null);
  const [loading, setLoading] = useState(true);
  const [enquiry, setEnquiry] = useState(false);
  const [lightbox, setLightbox] = useState(null); // gallery lightbox

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const { data: pkgData } = await supabase
        .from('tour_packages')
        .select('*')
        .eq('id', packageId)
        .single();

      if (!pkgData) { navigate(-1); return; }
      setPkg(pkgData);

      if (pkgData.category_id) {
        const { data: catData } = await supabase
          .from('tour_categories')
          .select('name, slug, type, image_url')
          .eq('id', pkgData.category_id)
          .single();
        setCat(catData);
      }
      setLoading(false);
    };
    load();
  }, [packageId]);

  /* ── loading skeleton ── */
  if (loading) return (
    <div className="pt-32 min-h-screen bg-[#f0f9ff] font-sans">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-4">
        <div className="h-4 w-48 bg-gray-200 animate-pulse"/>
        <div className="h-10 w-3/4 bg-gray-200 animate-pulse"/>
        <div className="h-80 w-full bg-gray-200 animate-pulse"/>
      </div>
    </div>
  );

  if (!pkg) return null;

  /* ── parse columns ── */

  // itinerary — stored as JSONB array: [{day_number, title, description}]
  const itinerary = Array.isArray(pkg.itinerary) ? pkg.itinerary : [];

  // inclusions — stored as TEXT, one item per line
  const inclusions = pkg.inclusions
    ? pkg.inclusions.split('\n').map(s => s.trim()).filter(Boolean)
    : [];

  // exclusions — stored as TEXT, one item per line
  const exclusions = pkg.exclusions
    ? pkg.exclusions.split('\n').map(s => s.trim()).filter(Boolean)
    : [];

  // gallery — stored as TEXT, comma separated URLs
  const galleryImages = pkg.gallery
    ? pkg.gallery.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  /* ── navigation helpers ── */
  const catLink  = cat
    ? (cat.type === 'india'
        ? `/tours/india/${cat.slug}`
        : `/tours/international/${cat.slug}`)
    : '/';
  const catLabel = cat?.name || 'Tours';

  return (
    <div className="pt-32 pb-20 bg-[#f0f9ff] font-sans">
      <div className="max-w-5xl mx-auto px-4 md:px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 flex-wrap">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={11}/>
          <Link to={catLink} className="hover:text-blue-600 transition-colors">{catLabel}</Link>
          <ChevronRight size={11}/>
          <span className="text-blue-600">{pkg.name}</span>
        </div>

        {/* ── Hero image ── */}
        <div className="relative w-full h-[280px] md:h-[400px] overflow-hidden mb-8 shadow-2xl">
          {(pkg.image_url || cat?.image_url) ? (
            <img
              src={pkg.image_url || cat?.image_url}
              alt={pkg.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-100 flex items-center justify-center">
              <MapPin size={64} className="text-blue-200"/>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>

          {pkg.badge && (
            <div className="absolute top-4 left-4 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5">
              {pkg.badge}
            </div>
          )}
          {pkg.nights && (
            <div className="absolute top-4 right-4 bg-black/60 text-white text-[11px] font-bold px-3 py-1.5 backdrop-blur-sm">
              {pkg.nights + 1}D / {pkg.nights}N
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
            <h1 className="text-white font-black text-xl md:text-4xl uppercase tracking-tight leading-tight mb-2">
              {pkg.name}
            </h1>
            {pkg.route_covering && (
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-blue-300 flex-shrink-0"/>
                <p className="text-blue-200 text-xs font-bold">{pkg.route_covering}</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Quick info bar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Clock,  label:'Duration',      val: pkg.nights ? `${pkg.nights+1}D / ${pkg.nights}N` : '—' },
            { icon: MapPin, label:'Starting from',  val: pkg.start_city || '—'  },
            { icon: MapPin, label:'Ending at',      val: pkg.end_city   || '—'  },
            { icon: Users,  label:'Price',          val: pkg.price ? `₹${Number(pkg.price).toLocaleString()}` : 'On Request' },
          ].map(({ icon: Icon, label, val }) => (
            <div key={label} className="bg-white border border-gray-100 p-4 shadow-sm">
              <Icon size={15} className="text-blue-600 mb-2"/>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
              <p className="text-slate-800 font-black text-sm mt-0.5 leading-tight">{val}</p>
            </div>
          ))}
        </div>

        {/* ── Two column layout ── */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT — main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Overview */}
            {pkg.description && (
              <div className="bg-white border border-gray-100 p-6 shadow-sm">
                <h2 className="section-title">Overview</h2>
                <p className="text-slate-600 text-sm leading-relaxed">{pkg.description}</p>
              </div>
            )}

            {/* Itinerary accordion */}
            {itinerary.length > 0 && (
              <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="section-title mb-0">Day-by-Day Itinerary</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {itinerary.map((day, i) => (
                    <DayCard key={i} day={day} index={i}/>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <div className="bg-white border border-gray-100 p-6 shadow-sm">
                <h2 className="section-title">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {galleryImages.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setLightbox(url)}
                      className="relative h-32 overflow-hidden group"
                    >
                      <img src={url} alt={`Gallery ${i+1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={e => e.target.parentElement.style.display='none'}/>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Image size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity"/>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions */}
            {inclusions.length > 0 && (
              <div className="bg-white border border-gray-100 p-6 shadow-sm">
                <h2 className="section-title">Inclusions</h2>
                <ul className="space-y-2.5">
                  {inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={15} className="text-emerald-500 flex-shrink-0 mt-0.5"/>
                      <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exclusions */}
            {exclusions.length > 0 && (
              <div className="bg-white border border-gray-100 p-6 shadow-sm">
                <h2 className="section-title">Exclusions</h2>
                <ul className="space-y-2.5">
                  {exclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <XCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5"/>
                      <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Details — always shown */}
            <div className="bg-slate-900 p-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                <Info size={15} className="text-blue-400"/> Key Details
              </h2>
              <ul className="space-y-3">
                {[
                  'Rates are 10% commissionable',
                  'All government taxes are included',
                  'No GST input',
                  'Rates subject to availability at the time of booking',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={14} className="text-blue-400 flex-shrink-0 mt-0.5"/>
                    <span className="text-slate-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-400 text-xs mt-5 pt-4 border-t border-slate-700">
                For any inquiries or assistance, feel free to reach out.
              </p>
            </div>

          </div>

          {/* RIGHT — sticky sidebar */}
          <div className="space-y-5">

            {/* Enquiry card */}
            <div className="bg-white border border-gray-100 shadow-lg p-6 sticky top-28">
              {pkg.price && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Starting from</p>
                  <p className="text-3xl font-black text-blue-600">
                    ₹{Number(pkg.price).toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-400">per person</p>
                </div>
              )}

              {/* Inclusion icons */}
              <div className="flex gap-3 py-4 border-b border-gray-100 mb-4 flex-wrap">
                {[
                  { icon: Plane,    label:'Flights'    },
                  { icon: Hotel,    label:'Hotels'     },
                  { icon: Utensils, label:'Meals'      },
                  { icon: Activity, label:'Activities' },
                  { icon: Car,      label:'Transfers'  },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} title={label}
                    className="text-slate-300 hover:text-blue-500 transition-colors cursor-default">
                    <Icon size={18}/>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setEnquiry(true)}
                className="w-full bg-blue-600 text-white py-3.5 font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mb-3"
              >
                <Send size={13}/> Enquire Now
              </button>

              <Link to="/contact"
                className="w-full border-2 border-slate-900 text-slate-900 py-3 font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2">
                <Phone size={13}/> Contact Us
              </Link>

              {pkg.start_city && (
                <p className="text-center text-[10px] text-slate-400 mt-4">
                  Starting from <span className="font-bold text-slate-600">{pkg.start_city}</span>
                </p>
              )}
            </div>

            {/* Highlights */}
            {pkg.highlights?.length > 0 && (
              <div className="bg-white border border-gray-100 p-5 shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Highlights</h3>
                <ul className="space-y-2">
                  {pkg.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"/>
                      <span className="text-slate-600 text-xs font-medium">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>

        {/* Back button */}
        <div className="mt-10">
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">
            <ChevronRight size={13} className="rotate-180"/> Back to Packages
          </button>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox}
              alt="Gallery"
              className="max-w-full max-h-[90vh] object-contain shadow-2xl"
              initial={{ scale:0.9 }} animate={{ scale:1 }} exit={{ scale:0.9 }}
            />
            <button onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white">
              <X size={28}/>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Enquiry Modal ── */}
      <AnimatePresence>
        {enquiry && <EnquiryModal pkg={pkg} onClose={() => setEnquiry(false)}/>}
      </AnimatePresence>

      <style>{`
        .section-title {
          font-size: 16px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          color: #0f172a;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f1f5f9;
        }
      `}</style>
    </div>
  );
};

export default PackageDetail;