// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Plane, Hotel, Utensils, Activity, Car,
//   Quote, Ship, Star, X, ChevronRight
// } from 'lucide-react';
// import { supabase } from '../supabaseClient';

// /* ─────────────────────────────────────────────────────────────
//    STATIC — same arrays as original AndamanPage
// ───────────────────────────────────────────────────────────── */
// const inclusions = [
//   { icon: <Plane    size={18} />, text: 'Flights'    },
//   { icon: <Hotel    size={18} />, text: 'Hotels'     },
//   { icon: <Utensils size={18} />, text: 'Meals'      },
//   { icon: <Activity size={18} />, text: 'Activities' },
//   { icon: <Car      size={18} />, text: 'Transfers'  },
// ];

// const testimonials = [
//   {
//     init: 'JM', name: 'Jestin Mathew',
//     text: 'We would like to appreciate your good office for arranging travel trip to Maldives for our Director, Mr Walfred Tagor...',
//   },
//   {
//     init: 'RB', name: 'Ramesh Babu',
//     text: 'Dear Sir, We had arranged a vehicle for Mr. Swithun Manoharan - Executive Vice President. The service was impeccable.',
//   },
//   {
//     init: 'SK', name: 'Santosh Krinsky',
//     text: 'I wanted to take the opportunity to thank you for your efforts in making our trip so comfortable and memorable.',
//   },
// ];

// /* ─────────────────────────────────────────────────────────────
//    ENQUIRY MODAL
// ───────────────────────────────────────────────────────────── */
// const EnquiryModal = ({ pkg, onClose }) => {
//   const [form, setForm]       = useState({ name: '', phone: '', email: '', travel_date: '', pax: 1, message: '' });
//   const [sending, setSending] = useState(false);
//   const [done, setDone]       = useState(false);

//   const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSending(true);
//     await supabase.from('enquiries').insert({ ...form, package_id: pkg.id });
//     setDone(true);
//     setSending(false);
//   };

//   return (
//     <motion.div
//       className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
//       initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//     >
//       <motion.div
//         className="bg-white w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto rounded-none"
//         initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
//       >
//         {/* Header */}
//         <div className="bg-slate-900 text-white px-6 py-5 flex items-start justify-between">
//           <div>
//             <h3 className="font-black text-lg uppercase tracking-tight">Enquire Now</h3>
//             <p className="text-blue-300 text-[10px] font-bold mt-0.5 uppercase tracking-wider line-clamp-1">{pkg.name}</p>
//           </div>
//           <button onClick={onClose} className="text-white/60 hover:text-white mt-1"><X size={20} /></button>
//         </div>

//         {done ? (
//           <div className="p-8 text-center">
//             <div className="w-16 h-16 bg-blue-50 flex items-center justify-center mx-auto mb-4">
//               <Star size={28} className="text-blue-600" />
//             </div>
//             <h3 className="font-black text-slate-900 text-xl mb-2">Enquiry Sent!</h3>
//             <p className="text-slate-500 text-sm mb-6">Our team will contact you within 24 hours.</p>
//             <button onClick={onClose}
//               className="bg-blue-600 text-white px-8 py-3 font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors">
//               Close
//             </button>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="p-6 space-y-4">
//             <div>
//               <label className="field-label">Full Name *</label>
//               <input type="text" required placeholder="Your name"
//                 value={form.name} onChange={set('name')} className="field-input" />
//             </div>
//             <div>
//               <label className="field-label">Phone *</label>
//               <input type="tel" required placeholder="+91 98765 43210"
//                 value={form.phone} onChange={set('phone')} className="field-input" />
//             </div>
//             <div>
//               <label className="field-label">Email</label>
//               <input type="email" placeholder="you@email.com"
//                 value={form.email} onChange={set('email')} className="field-input" />
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label className="field-label">Travel Date</label>
//                 <input type="date" value={form.travel_date} onChange={set('travel_date')} className="field-input" />
//               </div>
//               <div>
//                 <label className="field-label">No. of Persons</label>
//                 <input type="number" min="1" value={form.pax} onChange={set('pax')} className="field-input" />
//               </div>
//             </div>
//             <div>
//               <label className="field-label">Message</label>
//               <textarea rows={3} placeholder="Any special requirements..."
//                 value={form.message} onChange={set('message')}
//                 className="field-input resize-none" />
//             </div>
//             <div className="flex gap-3 pt-1">
//               <button type="submit" disabled={sending}
//                 className="flex-1 bg-blue-600 text-white py-3 font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 disabled:bg-blue-300 transition-colors">
//                 {sending ? 'Sending...' : 'Send Enquiry'}
//               </button>
//               <button type="button" onClick={onClose}
//                 className="px-5 border border-gray-200 text-slate-500 font-medium text-sm hover:bg-gray-50 transition-colors">
//                 Cancel
//               </button>
//             </div>
//           </form>
//         )}

//         <style>{`
//           .field-label { display:block; color:#64748b; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; margin-bottom:6px; }
//           .field-input  { width:100%; border:1px solid #e5e7eb; padding:10px 12px; font-size:14px; color:#1e293b; outline:none; transition:border-color .2s; }
//           .field-input:focus { border-color:#3b82f6; }
//         `}</style>
//       </motion.div>
//     </motion.div>
//   );
// };

// /* ─────────────────────────────────────────────────────────────
//    MAIN COMPONENT
//    Replaces: AndamanPage, KeralaPage, KashmirPage, GoaPage,
//              HimachalPage, TamilNaduPage, AndhraPage,
//              KarnatakaPage, MaharashtraPage, SikkimPage,
//              NorthEastPage, UttarakhandPage + all international

//    Props:
//      type="india"          → fetches from tour_categories WHERE type='india'
//      type="international"  → fetches from tour_categories WHERE type='international'
// ───────────────────────────────────────────────────────────── */
// const CategoryPage = ({ type = 'india' }) => {
//   const { slug }    = useParams();
//   const navigate    = useNavigate();

//   const [cat, setCat]           = useState(null);
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading]   = useState(true);
//   const [enquiry, setEnquiry]   = useState(null);
//   const [testIdx, setTestIdx]   = useState(0);

//   /* rotate testimonials */
//   useEffect(() => {
//     const t = setInterval(() => setTestIdx(i => (i + 1) % testimonials.length), 5000);
//     return () => clearInterval(t);
//   }, []);

//   /* fetch category + packages */
//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);

//       const { data: catData } = await supabase
//         .from('tour_categories')
//         .select('*')
//         .eq('slug', slug)
//         .eq('type', type)
//         .single();

//       if (!catData) {
//         navigate(type === 'india' ? '/tours/india' : '/tours/international');
//         return;
//       }
//       setCat(catData);

//       const { data: pkgData } = await supabase
//         .from('tour_packages')
//         .select('*')
//         .eq('category_id', catData.id)
//         .eq('is_active', true)
//         .order('display_order');

//       setPackages(pkgData || []);
//       setLoading(false);
//     };
//     load();
//   }, [slug, type]);

//   /* ── Loading skeleton ── */
//   if (loading) {
//     return (
//       <div className="pt-32 pb-16 bg-[#f0f9ff] font-sans min-h-screen">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
//             <div className="w-full lg:w-1/2 space-y-4">
//               <div className="h-3 w-40 bg-gray-200 animate-pulse" />
//               <div className="h-16 w-3/4 bg-gray-200 animate-pulse" />
//               <div className="h-4 w-full bg-gray-100 animate-pulse" />
//               <div className="h-4 w-2/3 bg-gray-100 animate-pulse" />
//             </div>
//             <div className="w-full lg:w-1/2 h-[350px] bg-gray-200 animate-pulse" />
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="bg-white shadow-lg h-72 animate-pulse border-b-4 border-gray-100" />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!cat) return null;

//   /* Split name for two-line heading */
//   const words = cat.name.split(' ');
//   const half  = Math.ceil(words.length / 2);
//   const line1 = words.slice(0, half).join(' ');
//   const line2 = words.slice(half).join(' ');

//   const backLink  = type === 'india' ? '/tours/india'         : '/tours/international';
//   const backLabel = type === 'india' ? 'India Tours'          : 'International Tours';

//   return (
//     <div className="pt-32 pb-16 bg-[#f0f9ff] font-sans">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 mb-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
//           <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
//           <ChevronRight size={11} />
//           <Link to={backLink} className="hover:text-blue-600 transition-colors">{backLabel}</Link>
//           <ChevronRight size={11} />
//           <span className="text-blue-600">{cat.name}</span>
//         </div>

//         {/* ══════════════════════════════════════════
//             HERO — matches AndamanPage exactly
//         ══════════════════════════════════════════ */}
//         <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">

//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="w-full lg:w-1/2"
//           >
//             <div className="flex items-center gap-3 mb-4">
//               <span className="h-[2px] w-12 bg-cyan-600" />
//               <span className="text-cyan-600 font-bold uppercase tracking-[0.3em] text-[10px]">
//                 {cat.tagline || cat.name}
//               </span>
//             </div>

//             <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-4 tracking-tighter">
//               {line1}<br />
//               <span className="text-blue-700 uppercase">{line2}</span>
//             </h1>

//             <p className="text-lg font-medium text-slate-500 max-w-md leading-relaxed">
//               {cat.description ||
//                 `Explore the breathtaking beauty of ${cat.name} with our expertly curated packages, crafted for unforgettable memories.`}
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="w-full lg:w-1/2 h-[350px] relative rounded-none overflow-hidden shadow-2xl"
//           >
//             {cat.image_url ? (
//               <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
//             ) : (
//               <div className="w-full h-full bg-blue-100 flex items-center justify-center">
//                 <Ship size={80} className="text-blue-200" />
//               </div>
//             )}
//             <div className="absolute inset-0 bg-blue-900/10" />
//           </motion.div>
//         </div>

//         {/* ══════════════════════════════════════════
//             PACKAGE GRID — matches AndamanPage exactly
//         ══════════════════════════════════════════ */}
//         {packages.length === 0 ? (
//           <div className="text-center py-20 mb-20">
//             <Ship size={48} className="text-blue-200 mx-auto mb-4" />
//             <p className="text-slate-400 font-bold text-lg uppercase tracking-widest">Packages coming soon</p>
//             <p className="text-slate-400 text-sm mt-2">
//               <Link to="/contact" className="text-blue-600 underline">Contact us</Link> for custom itineraries
//             </p>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
//             {packages.map((pkg, idx) => (
//               <motion.div
//                 key={pkg.id}
//                 whileHover={{ y: -10 }}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.07 }}
//                 className="bg-white p-6 border-b-4 border-blue-600 shadow-lg flex flex-col justify-between"
//               >
//                 <div>
//                   {/* Icon — same as AndamanPage */}
//                   <div className="bg-blue-50 w-10 h-10 rounded-none flex items-center justify-center mb-4">
//                     <Ship className="text-blue-600" size={20} />
//                   </div>

//                   {/* Duration — same style as pkg.duration in AndamanPage */}
//                   <h3 className="text-blue-700 font-black text-xl mb-2">
//                     {pkg.nights
//                       ? `${pkg.nights + 1} DAYS / ${pkg.nights} NIGHTS`
//                       : pkg.name}
//                   </h3>

//                   {/* Route — same style as pkg.route in AndamanPage */}
//                   <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight mb-6 min-h-[48px] leading-tight">
//                     {pkg.route_covering || '—'}
//                   </p>
//                 </div>

//                 <div className="space-y-4">
//                   {/* Inclusions — exact same as AndamanPage */}
//                   <div className="flex flex-wrap gap-2 py-4 border-t border-slate-50">
//                     {inclusions.map((inc, i) => (
//                       <div key={i} title={inc.text}
//                         className="text-slate-300 hover:text-blue-500 transition-colors">
//                         {inc.icon}
//                       </div>
//                     ))}
//                   </div>

//                   {/* Button — exact same as AndamanPage */}
//                   <button
//                     onClick={() => setEnquiry(pkg)}
//                     className="w-full py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-colors"
//                   >
//                     More Details
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* ══════════════════════════════════════════
//             TESTIMONIAL + CTA — matches AndamanPage exactly
//         ══════════════════════════════════════════ */}
//         <div className="grid lg:grid-cols-3 gap-8">

//           {/* Testimonial — same as AndamanPage */}
//           <div className="bg-white p-8 shadow-xl border border-blue-50 relative">
//             <Quote className="absolute top-4 right-4 text-blue-50" size={60} />
//             <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-6 border-b pb-2 inline-block">
//               Client Feedback
//             </h3>

//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={testIdx}
//                 initial={{ opacity: 0, x: 10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -10 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <p className="text-slate-600 italic text-sm leading-relaxed mb-6">
//                   "{testimonials[testIdx].text}"
//                 </p>
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-blue-600 rounded-none flex items-center justify-center text-white text-[10px] font-bold">
//                     {testimonials[testIdx].init}
//                   </div>
//                   <p className="font-black text-slate-900 text-[11px] uppercase tracking-wider">
//                     {testimonials[testIdx].name}
//                   </p>
//                 </div>
//               </motion.div>
//             </AnimatePresence>

//             {/* Dot navigation */}
//             <div className="flex gap-1.5 mt-5">
//               {testimonials.map((_, i) => (
//                 <button key={i} onClick={() => setTestIdx(i)}
//                   className={`h-1.5 rounded-full transition-all duration-300 ${
//                     i === testIdx ? 'w-5 bg-blue-600' : 'w-1.5 bg-gray-200'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* CTA — exact same as AndamanPage */}
//           <div className="lg:col-span-2 bg-gradient-to-br from-blue-900 to-slate-900 p-12 relative flex flex-col justify-center rounded-none">
//             <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
//               Explore Your <br />
//               <span className="text-cyan-400">Dream Destination!</span>
//             </h2>
//             <p className="text-blue-200 font-bold italic mb-8">
//               You'll never forget the experience we are ready to present Joy!
//             </p>
//             <div className="flex gap-4">
//               <Link to="/enquiry"
//                 className="bg-white text-slate-900 px-12 py-4 font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all inline-block">
//                 Click Here
//               </Link>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* Enquiry Modal */}
//       <AnimatePresence>
//         {enquiry && <EnquiryModal pkg={enquiry} onClose={() => setEnquiry(null)} />}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default CategoryPage;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane, Hotel, Utensils, Activity, Car,
  Quote, Ship, Star, X, ChevronRight
} from 'lucide-react';
import { supabase } from '../supabaseClient';

/* ─────────────────────────────────────────────────────────────
   STATIC — same arrays as original AndamanPage
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
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="bg-white w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto rounded-none"
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
      >
        {/* Header */}
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
   MAIN COMPONENT
   Replaces: AndamanPage, KeralaPage, KashmirPage, GoaPage,
             HimachalPage, TamilNaduPage, AndhraPage,
             KarnatakaPage, MaharashtraPage, SikkimPage,
             NorthEastPage, UttarakhandPage + all international

   Props:
     type="india"          → fetches from tour_categories WHERE type='india'
     type="international"  → fetches from tour_categories WHERE type='international'
───────────────────────────────────────────────────────────── */
const CategoryPage = ({ type = 'india' }) => {
  const { slug }    = useParams();
  const navigate    = useNavigate();

  const [cat, setCat]           = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [enquiry, setEnquiry]   = useState(null);
  const [testIdx, setTestIdx]   = useState(0);

  /* rotate testimonials */
  useEffect(() => {
    const t = setInterval(() => setTestIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  /* fetch category + packages */
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

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="pt-32 pb-16 bg-[#f0f9ff] font-sans min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="h-3 w-40 bg-gray-200 animate-pulse" />
              <div className="h-16 w-3/4 bg-gray-200 animate-pulse" />
              <div className="h-4 w-full bg-gray-100 animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-100 animate-pulse" />
            </div>
            <div className="w-full lg:w-1/2 h-[350px] bg-gray-200 animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white shadow-lg h-72 animate-pulse border-b-4 border-gray-100" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!cat) return null;

  /* Split name for two-line heading */
  const words = cat.name.split(' ');
  const half  = Math.ceil(words.length / 2);
  const line1 = words.slice(0, half).join(' ');
  const line2 = words.slice(half).join(' ');

  const backLink  = type === 'india' ? '/tours/india'         : '/tours/international';
  const backLabel = type === 'india' ? 'India Tours'          : 'International Tours';

  return (
    <div className="pt-32 pb-16 bg-[#f0f9ff] font-sans">
      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={11} />
          <Link to={backLink} className="hover:text-blue-600 transition-colors">{backLabel}</Link>
          <ChevronRight size={11} />
          <span className="text-blue-600">{cat.name}</span>
        </div>

        {/* ══════════════════════════════════════════
            HERO — matches AndamanPage exactly
        ══════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-12 bg-cyan-600" />
              <span className="text-cyan-600 font-bold uppercase tracking-[0.3em] text-[10px]">
                {cat.tagline || cat.name}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-4 tracking-tighter">
              {line1}<br />
              <span className="text-blue-700 uppercase">{line2}</span>
            </h1>

            <p className="text-lg font-medium text-slate-500 max-w-md leading-relaxed">
              {cat.description ||
                `Explore the breathtaking beauty of ${cat.name} with our expertly curated packages, crafted for unforgettable memories.`}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-1/2 h-[350px] relative rounded-none overflow-hidden shadow-2xl"
          >
            {cat.image_url ? (
              <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                <Ship size={80} className="text-blue-200" />
              </div>
            )}
            <div className="absolute inset-0 bg-blue-900/10" />
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            PACKAGE GRID — card style from screenshot 2
        ══════════════════════════════════════════ */}
        {packages.length === 0 ? (
          <div className="text-center py-20 mb-20">
            <Ship size={48} className="text-blue-200 mx-auto mb-4" />
            <p className="text-slate-400 font-bold text-lg uppercase tracking-widest">Packages coming soon</p>
            <p className="text-slate-400 text-sm mt-2">
              <Link to="/contact" className="text-blue-600 underline">Contact us</Link> for custom itineraries
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {packages.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="bg-white shadow-lg overflow-hidden flex flex-col group hover:shadow-xl transition-shadow duration-300"
              >
                {/* ── Image with overlays ── */}
                <div className="relative h-[200px] overflow-hidden flex-shrink-0">
                  {pkg.image_url ? (
                    <img
                      src={pkg.image_url}
                      alt={pkg.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* fallback: use category image */
                    cat.image_url ? (
                      <img
                        src={cat.image_url}
                        alt={pkg.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                        <Ship size={48} className="text-blue-200" />
                      </div>
                    )
                  )}

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Price badge — top left */}
                  {pkg.price && (
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-[11px] font-bold px-3 py-1 backdrop-blur-sm">
                      ₹{Number(pkg.price).toLocaleString()}
                    </div>
                  )}

                  {/* Days badge — top right */}
                  {pkg.nights && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 tracking-wider">
                      {pkg.nights + 1}D/{pkg.nights}N
                    </div>
                  )}

                  {/* Package name over image — bottom */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                    <h3 className="text-white font-black text-base leading-tight uppercase tracking-tight line-clamp-2">
                      {pkg.name}
                    </h3>
                    {pkg.description && (
                      <p className="text-white/75 text-[10px] mt-1 leading-snug line-clamp-2">
                        {pkg.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* ── Card Body ── */}
                <div className="p-4 flex flex-col flex-grow">

                  {/* Route */}
                  {pkg.route_covering && (
                    <div className="flex items-start gap-1.5 mb-3">
                      <svg className="w-3 h-3 text-blue-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
                      <p className="text-blue-600 text-[10px] font-bold leading-tight">
                        {pkg.route_covering}
                      </p>
                    </div>
                  )}

                  {/* Highlights */}
                  {pkg.highlights?.length > 0 && (
                    <div className="mb-3">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Highlights:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.highlights.slice(0, 3).map((h, i) => (
                          <span key={i} className="text-[9px] font-medium bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded-sm">
                            {h}
                          </span>
                        ))}
                        {pkg.highlights.length > 3 && (
                          <span className="text-[9px] font-medium bg-slate-50 border border-slate-100 text-slate-400 px-2 py-0.5 rounded-sm">
                            +{pkg.highlights.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Starting from */}
                  {pkg.start_city && (
                    <p className="text-[10px] text-slate-400 mb-3">
                      Starting from: <span className="font-bold text-slate-600">{pkg.start_city}</span>
                    </p>
                  )}

                  {/* CTA — matches screenshot 2 style */}
                  <button
                    onClick={() => setEnquiry(pkg)}
                    className="mt-auto w-full py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group/btn"
                  >
                    Enquire Now
                    <svg className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════════
            TESTIMONIAL + CTA — matches AndamanPage exactly
        ══════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Testimonial — same as AndamanPage */}
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

            {/* Dot navigation */}
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

          {/* CTA — exact same as AndamanPage */}
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

      {/* Enquiry Modal */}
      <AnimatePresence>
        {enquiry && <EnquiryModal pkg={enquiry} onClose={() => setEnquiry(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default CategoryPage;