// import React, { useEffect, useState } from 'react';
// import { supabase } from '../supabaseClient';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { MapPin, Clock, ArrowRight, Star } from 'lucide-react';

// const HomeFeaturedPackages = () => {
//   const [packages, setPackages] = useState([]);
//   const [filter, setFilter]     = useState('ALL');
//   const [loading, setLoading]   = useState(true);

//   useEffect(() => {
//     supabase
//       .from('tour_packages')
//       .select('*, tour_categories(name, type, slug)')
//       .eq('is_featured', true)
//       .eq('is_active', true)
//       .order('display_order')
//       .limit(12)
//       .then(({ data }) => { setPackages(data || []); setLoading(false); });
//   }, []);

//   const TABS = ['ALL', 'DOMESTIC', 'INTERNATIONAL'];

//   const filtered = packages.filter(p => {
//     if (filter === 'ALL') return true;
//     if (filter === 'DOMESTIC') return p.tour_categories?.type === 'india';
//     return p.tour_categories?.type === 'international';
//   });

//   return (
//     <section className="py-14 md:py-20 bg-white font-sans">
//       <div className="max-w-7xl mx-auto px-4 md:px-6">

//         {/* Header */}
//         <div className="flex flex-col items-center text-center mb-10">
//           <span className="text-blue-600 font-bold tracking-[0.22em] text-[10px] uppercase mb-2 italic">
//             Our Customers Favourite
//           </span>
//           <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-2 text-slate-900">
//             Popular <span className="text-blue-600">Tour Packages</span>
//           </h2>
//           <div className="w-12 h-0.5 bg-blue-600 mx-auto mb-3"/>
//           <p className="text-slate-400 text-[11px] md:text-xs max-w-xs leading-tight">
//             Handpicked packages for unforgettable travel experiences
//           </p>
//         </div>

//         {/* Filter tabs */}
//         <div className="flex justify-center gap-2 flex-wrap mb-8">
//           {TABS.map(tab => (
//             <button key={tab} onClick={() => setFilter(tab)}
//               className={`px-5 py-2 text-[9px] font-bold tracking-widest uppercase transition-all duration-300 ${
//                 filter === tab ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400 hover:bg-white border border-gray-100'
//               }`}>
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Grid */}
//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="h-72 bg-gray-100 animate-pulse rounded-none"/>
//             ))}
//           </div>
//         ) : (
//           <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             <AnimatePresence mode="popLayout">
//               {filtered.map((pkg, i) => (
//                 <FeaturedCard key={pkg.id} pkg={pkg} index={i}/>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         )}

//         {/* View All */}
//         <div className="text-center mt-10 flex justify-center gap-4 flex-wrap">
//           <Link to="/tours/india"
//             className="inline-flex items-center gap-2 border-2 border-slate-900 text-slate-900 px-8 py-3 text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
//             View India Tours <ArrowRight size={13}/>
//           </Link>
//           <Link to="/tours/international"
//             className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 text-[9px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
//             View International <ArrowRight size={13}/>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// const FeaturedCard = ({ pkg, index }) => {
//   // Build the correct link: India → /tours/india/[slug], International → /tours/international/[slug]
//   const type  = pkg.tour_categories?.type;
//   const slug  = pkg.tour_categories?.slug;
//   const detailLink = type === 'india'
//     ? `/tours/india/${slug}`
//     : `/tours/international/${slug}`;

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, scale: 0.96 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.93, transition: { duration: 0.15 } }}
//       transition={{ duration: 0.38, delay: index * 0.05 }}
//       className="group bg-white flex flex-col border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300"
//     >
//       {/* Image */}
//       <div className="relative h-44 bg-gray-50 overflow-hidden flex items-center justify-center">
//         {pkg.image_url
//           ? <img src={pkg.image_url} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
//           : <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center"><MapPin size={32} className="text-blue-200"/></div>
//         }
//         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"/>

//         {pkg.badge && (
//           <div className="absolute top-0 left-0 bg-blue-600 text-white text-[7px] px-3 py-1 font-black uppercase tracking-widest">
//             {pkg.badge}
//           </div>
//         )}
//         {pkg.nights && (
//           <div className="absolute top-0 right-0 bg-slate-900/80 text-white text-[8px] px-2 py-1 flex items-center gap-1">
//             <Clock size={9}/> {pkg.nights}N
//           </div>
//         )}

//         {/* Category tag at bottom */}
//         <div className="absolute bottom-2 left-2">
//           <span className="text-[8px] font-bold text-white/80 uppercase tracking-wider">{pkg.tour_categories?.name}</span>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="p-4 flex flex-col flex-grow">
//         <h3 className="text-sm font-black text-gray-900 uppercase leading-tight tracking-tighter mb-1">{pkg.name}</h3>

//         {pkg.route_covering && (
//           <div className="flex items-start gap-1 mb-2">
//             <MapPin size={9} className="text-blue-500 flex-shrink-0 mt-0.5"/>
//             <p className="text-blue-600 text-[9px] font-bold leading-tight line-clamp-1">{pkg.route_covering}</p>
//           </div>
//         )}

//         {pkg.highlights?.length > 0 && (
//           <div className="flex flex-wrap gap-1 mb-3">
//             {pkg.highlights.slice(0,2).map(h => (
//               <span key={h} className="text-[8px] bg-slate-50 border border-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">{h}</span>
//             ))}
//           </div>
//         )}

//         {pkg.price && (
//           <p className="text-[9px] text-slate-400 mb-1">
//             Starting from: <span className="text-blue-600 font-black text-sm">₹{Number(pkg.price).toLocaleString()}</span>
//           </p>
//         )}

//         <div className="mt-auto pt-3 border-t border-gray-50">
//           <Link to={detailLink}
//             className="w-full bg-gray-900 text-white py-2.5 text-[9px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
//             View Details <ArrowRight size={11}/>
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default HomeFeaturedPackages;


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

/* ── Badge colours — same as original ───────────────────────── */
const badgeColor = {
  SPIRITUAL:'#7C3AED', POPULAR:'#2563EB', EXTENDED:'#0F766E',
  FEATURED:'#B45309',  ADVENTURE:'#B91C1C', HERITAGE:'#92400E',
  INTERNATIONAL:'#1D4ED8', LUXURY:'#6D28D9', BEACHES:'#0369A1',
  COMBO:'#047857', DIVINE:'#7C3AED', PILGRIMAGE:'#9D174D',
  ROMANTIC:'#BE185D', QUICK:'#0369A1', SEASONAL:'#047857',
  NATURE:'#15803D', COMPLETE:'#1E40AF', SCENIC:'#0891B2',
  CULTURAL:'#92400E', 'BEST SELLER':'#DC2626', 'CITY TOUR':'#6D28D9',
  EXPLORER:'#B45309', SHORT:'#6B7280', UNIQUE:'#7C3AED',
};

const FILTERS = ['ALL', 'DOMESTIC', 'INTERNATIONAL'];
const catLabel = { ALL:'All Packages', DOMESTIC:'Domestic Tours', INTERNATIONAL:'International Tours' };

/* ── Enquiry Modal ───────────────────────────────────────────── */
const EnquiryModal = ({ pkg, onClose }) => {
  const [form, setForm]       = useState({ name:'', phone:'', email:'', travel_date:'', pax:1, message:'' });
  const [sending, setSending] = useState(false);
  const [done, setDone]       = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async e => {
    e.preventDefault(); setSending(true);
    await supabase.from('enquiries').insert({ ...form, package_id: pkg.id });
    setDone(true); setSending(false);
  };

  const F = { label:{ display:'block', color:'#64748b', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:6 }, input:{ width:'100%', border:'1px solid #e5e7eb', padding:'10px 12px', fontSize:14, color:'#1e293b', outline:'none', boxSizing:'border-box' } };

  return (
    <motion.div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={e => e.target===e.currentTarget && onClose()}>
      <motion.div className="bg-white w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        initial={{ scale:.95, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:.95 }}>
        <div className="bg-slate-900 text-white px-6 py-5 flex items-start justify-between">
          <div>
            <h3 className="font-black text-lg uppercase tracking-tight">Enquire Now</h3>
            <p className="text-blue-300 text-[10px] font-bold mt-0.5 uppercase tracking-wider line-clamp-1">{pkg.name}</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white text-xl leading-none mt-0.5">✕</button>
        </div>
        {done ? (
          <div className="p-8 text-center">
            <div className="w-14 h-14 bg-blue-50 flex items-center justify-center mx-auto mb-4 text-blue-600 text-2xl font-black">✓</div>
            <h3 className="font-black text-slate-900 text-xl mb-2">Enquiry Sent!</h3>
            <p className="text-slate-500 text-sm mb-6">Our team will contact you within 24 hours.</p>
            <button onClick={onClose} className="bg-blue-600 text-white px-8 py-3 font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-colors">Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-4">
            {[{l:'Full Name *',k:'name',t:'text',r:true,p:'Your name'},{l:'Phone *',k:'phone',t:'tel',r:true,p:'+91 98765 43210'},{l:'Email',k:'email',t:'email',r:false,p:'you@email.com'}].map(f=>(
              <div key={f.k}><label style={F.label}>{f.l}</label><input type={f.t} required={f.r} placeholder={f.p} value={form[f.k]} onChange={set(f.k)} style={F.input}/></div>
            ))}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div><label style={F.label}>Travel Date</label><input type="date" value={form.travel_date} onChange={set('travel_date')} style={F.input}/></div>
              <div><label style={F.label}>Persons</label><input type="number" min="1" value={form.pax} onChange={set('pax')} style={F.input}/></div>
            </div>
            <div><label style={F.label}>Message</label><textarea rows={3} placeholder="Any special requirements..." value={form.message} onChange={set('message')} style={{...F.input,resize:'none',display:'block'}}/></div>
            <div style={{ display:'flex', gap:10, paddingTop:4 }}>
              <button type="submit" disabled={sending} style={{ flex:1, background:'#2563EB', color:'#fff', border:'none', padding:'12px 16px', fontWeight:700, fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', cursor:'pointer', opacity:sending?.6:1 }}>
                {sending ? 'Sending...' : 'Send Enquiry'}
              </button>
              <button type="button" onClick={onClose} style={{ padding:'12px 18px', border:'1px solid #e5e7eb', background:'transparent', color:'#64748b', fontWeight:500, fontSize:14, cursor:'pointer' }}>Cancel</button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ── Package Card — PIXEL PERFECT match of old Fleet.jsx ─────── */
const PackageCard = ({ pkg, index, onEnquire }) => {
  const [hov, setHov] = useState(false);
  const bColor = badgeColor[(pkg.badge||'').toUpperCase()] || '#2563EB';

  const daysLabel  = pkg.nights ? `${pkg.nights+1}D/${pkg.nights}N` : (pkg.duration_label || '');
  const priceLabel = pkg.price  ? `₹${Number(pkg.price).toLocaleString()}` : '';
  const highlights = Array.isArray(pkg.highlights) ? pkg.highlights
    : typeof pkg.highlights === 'string' ? pkg.highlights.split(',').map(h=>h.trim()).filter(Boolean) : [];

  const catType    = pkg.tour_categories?.type;
  const catSlug    = pkg.tour_categories?.slug;
  const detailLink = catType === 'india' ? `/tours/india/${catSlug}` : `/tours/international/${catSlug}`;

  return (
    <motion.div
      layout
      initial={{ opacity:0, y:24 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, scale:0.94, transition:{ duration:.17 } }}
      transition={{ duration:.4, delay:index*.05, ease:[.25,.46,.45,.94] }}
      className="pkg-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Top accent — identical */}
      <div className={`pkg-accent ${hov ? 'pkg-accent-on' : ''}`} />

      {/* Image section — identical */}
      <div className="pkg-img-wrap">
        {pkg.image_url
          ? <img src={pkg.image_url} alt={pkg.name} className={`pkg-img ${hov ? 'pkg-img-hov' : ''}`}/>
          : <div className="pkg-img pkg-img-ph"/>
        }
        <div className="pkg-img-overlay" />
        {priceLabel && <div className="pkg-price-badge">{priceLabel}</div>}
        {daysLabel  && <div className="pkg-days-badge">{daysLabel}</div>}
        {pkg.badge  && <div className="pkg-badge" style={{ background:bColor }}>{pkg.badge.toUpperCase()}</div>}
        <div className="pkg-img-title">
          <h3 className="pkg-title">{pkg.name}</h3>
          {pkg.description && <p className="pkg-desc">{pkg.description}</p>}
        </div>
      </div>

      {/* Body — identical */}
      <div className="pkg-body">
        {pkg.route_covering && (
          <div className="pkg-route">
            <svg className="pkg-route-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="pkg-route-text">{pkg.route_covering}</span>
          </div>
        )}

        {highlights.length > 0 && (
          <div className="pkg-highlights-wrap">
            <span className="pkg-hl-label">HIGHLIGHTS:</span>
            <div className="pkg-highlights">
              {highlights.map(h => <span key={h} className="pkg-hl-tag">{h}</span>)}
            </div>
          </div>
        )}

        {pkg.start_city && (
          <div className="pkg-starting">Starting from: <span>{pkg.start_city}</span></div>
        )}

        {/* CTA — identical style + Enquire Now */}
        <div style={{ marginTop:'auto', display:'flex', flexDirection:'column', gap:7 }}>
          <button onClick={() => onEnquire(pkg)} className={`pkg-cta ${hov ? 'pkg-cta-hov' : ''}`}>
            <span>Enquire Now</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

          {catSlug && (
            <Link to={detailLink} className="pkg-view-link">View All Packages</Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main Component ──────────────────────────────────────────── */
const HomeFeaturedPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('ALL');
  const [enquiry, setEnquiry]   = useState(null);

  useEffect(() => {
    supabase
      .from('tour_packages')
      .select('*, tour_categories(name, type, slug)')
      .eq('is_featured', true)
      .eq('is_active', true)
      .order('display_order')
      .limit(12)
      .then(({ data }) => { setPackages(data || []); setLoading(false); });
  }, []);

  const filtered = packages.filter(p => {
    if (filter === 'ALL')           return true;
    if (filter === 'DOMESTIC')      return p.tour_categories?.type === 'india';
    if (filter === 'INTERNATIONAL') return p.tour_categories?.type === 'international';
    return true;
  });

  return (
    <div className="pkg-root">
      <div className="pkg-ambient" aria-hidden="true">
        <div className="pkg-orb pkg-orb-1" />
        <div className="pkg-orb pkg-orb-2" />
        <div className="pkg-dotgrid" />
      </div>

      <section className="pkg-section">

        {/* Header — identical */}
        <motion.div className="pkg-header"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:.52, ease:[.25,.46,.45,.94] }}>
          <div className="pkg-eyebrow">
            <span className="pkg-eyebrow-line" />
            <span className="pkg-eyebrow-text">Handpicked Journeys</span>
            <span className="pkg-eyebrow-line pkg-eyebrow-r" />
          </div>
          <h2 className="pkg-heading">
            Our <span className="pkg-heading-blue">
              Tour Packages
              <svg className="pkg-underline" viewBox="0 0 260 12" fill="none" preserveAspectRatio="none">
                <path d="M3 9 Q65 3 130 7 Q195 11 257 5" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" fill="none"/>
              </svg>
            </span>
          </h2>
          <p className="pkg-subhead">Curated experiences for every kind of traveller</p>
        </motion.div>

        {/* Filters — identical */}
        <motion.div className="pkg-filters"
          initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:.44, delay:.1 }}>
          {FILTERS.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`pkg-filter ${filter === cat ? 'pkg-filter-act' : ''}`}>
              {filter === cat && (
                <motion.span layoutId="pkgPill" className="pkg-filter-bg"
                  transition={{ type:'spring', stiffness:400, damping:30 }} />
              )}
              <span className="pkg-filter-txt">{cat}</span>
            </button>
          ))}
        </motion.div>

        {/* Section label — identical */}
        <motion.div key={filter} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} className="pkg-section-label">
          <span className="pkg-section-label-line" />
          <span className="pkg-section-label-txt">{catLabel[filter]}</span>
          <span className="pkg-section-label-count">{loading ? '...' : `${filtered.length} packages`}</span>
        </motion.div>

        {/* Loading skeletons */}
        {loading && (
          <div className="pkg-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="pkg-card" style={{ minHeight:380 }}>
                <div style={{ height:210, background:'#f1f5f9' }} className="pkg-skel"/>
                <div style={{ padding:'14px 15px', display:'flex', flexDirection:'column', gap:10 }}>
                  {[60,80,40].map((w,j) => <div key={j} className="pkg-skel" style={{ height:9, width:`${w}%`, borderRadius:4 }}/>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid — identical structure */}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'60px 0', color:'#94a3b8' }}>
            <p style={{ fontSize:14, fontWeight:700 }}>No featured packages yet.</p>
            <p style={{ fontSize:12, marginTop:6 }}>
              Go to <Link to="/admin/packages" style={{ color:'#2563EB' }}>Admin → Packages</Link> and toggle ⭐ on any package.
            </p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <>
            <motion.div layout className="pkg-grid">
              <AnimatePresence mode="popLayout">
                {filtered.map((pkg, i) => (
                  <PackageCard key={pkg.id} pkg={pkg} index={i} onEnquire={setEnquiry} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* View all buttons */}
            <div className="pkg-view-all">
              <Link to="/tours/india" className="pkg-view-btn pkg-view-btn-outline">View India Tours →</Link>
              <Link to="/tours/international" className="pkg-view-btn pkg-view-btn-solid">View International →</Link>
            </div>
          </>
        )}

      </section>

      {/* ══ STYLES — copied exactly from old Fleet.jsx ══ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes skelpulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        .pkg-skel { background:#f1f5f9; animation: skelpulse 1.5s ease-in-out infinite; }

        .pkg-root { position:relative; background:#fff; overflow:hidden; font-family:'DM Sans',sans-serif; }

        .pkg-ambient { position:absolute; inset:0; pointer-events:none; z-index:0; }
        .pkg-orb { position:absolute; border-radius:50%; filter:blur(90px); }
        .pkg-orb-1 { width:560px; height:560px; top:-200px; left:-160px; background:radial-gradient(circle,rgba(37,99,235,.06),transparent 70%); }
        .pkg-orb-2 { width:420px; height:420px; bottom:-140px; right:-120px; background:radial-gradient(circle,rgba(37,99,235,.05),transparent 70%); }
        .pkg-dotgrid { position:absolute; inset:0; background-image:radial-gradient(rgba(37,99,235,.05) 1px,transparent 1px); background-size:26px 26px; mask-image:radial-gradient(ellipse 75% 55% at 50% 50%,black 25%,transparent 100%); }

        .pkg-section { position:relative; z-index:1; max-width:1280px; margin:0 auto; padding:52px 20px 80px; }

        .pkg-header { text-align:center; margin-bottom:30px; }
        .pkg-eyebrow { display:inline-flex; align-items:center; gap:11px; margin-bottom:14px; }
        .pkg-eyebrow-line { display:block; width:28px; height:1px; background:linear-gradient(90deg,transparent,#2563EB); }
        .pkg-eyebrow-r { background:linear-gradient(90deg,#2563EB,transparent); }
        .pkg-eyebrow-text { font-size:10px; font-weight:500; letter-spacing:.28em; text-transform:uppercase; color:#2563EB; }
        .pkg-heading { font-family:'Barlow Condensed',sans-serif; font-size:clamp(36px,5.5vw,62px); font-weight:900; text-transform:uppercase; letter-spacing:-.01em; line-height:1; color:#0f172a; margin-bottom:10px; }
        .pkg-heading-blue { color:#2563EB; position:relative; display:inline-block; }
        .pkg-underline { position:absolute; bottom:-5px; left:-4px; width:calc(100% + 8px); height:12px; overflow:visible; }
        .pkg-subhead { font-size:12px; color:#94a3b8; letter-spacing:.05em; margin-top:8px; }

        .pkg-filters { display:flex; flex-wrap:wrap; justify-content:center; gap:8px; margin-bottom:28px; }
        .pkg-filter { position:relative; padding:9px 24px; font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; letter-spacing:.18em; text-transform:uppercase; border:1px solid #e2e8f0; background:transparent; color:#94a3b8; cursor:pointer; border-radius:2px; overflow:hidden; transition:color .2s,border-color .2s; }
        .pkg-filter-bg { position:absolute; inset:0; background:#2563EB; border-radius:2px; z-index:0; }
        .pkg-filter-txt { position:relative; z-index:1; }
        .pkg-filter-act { color:#fff !important; border-color:#2563EB; }
        .pkg-filter:not(.pkg-filter-act):hover { color:#2563EB; border-color:#93c5fd; }

        .pkg-section-label { display:flex; align-items:center; gap:12px; margin-bottom:28px; }
        .pkg-section-label-line { flex:0 0 32px; height:1px; background:linear-gradient(90deg,transparent,#2563EB); }
        .pkg-section-label-txt { font-family:'Barlow Condensed',sans-serif; font-size:18px; font-weight:800; text-transform:uppercase; letter-spacing:.04em; color:#0f172a; }
        .pkg-section-label-count { font-size:10px; font-weight:500; color:#2563EB; background:#EFF6FF; border:1px solid #DBEAFE; padding:3px 10px; border-radius:20px; letter-spacing:.08em; }

        .pkg-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
        @media(max-width:960px){ .pkg-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:560px){ .pkg-grid { grid-template-columns:1fr; } }

        /* Card — EXACT copy from old Fleet.jsx */
        .pkg-card { position:relative; background:#fff; border:1px solid #eaf0f8; border-radius:14px; overflow:hidden; display:flex; flex-direction:column; cursor:pointer; transition:border-color .3s,box-shadow .32s; }
        .pkg-card:hover { border-color:rgba(37,99,235,.25); box-shadow:0 0 0 1px rgba(37,99,235,.09),0 20px 48px rgba(37,99,235,.11),0 6px 16px rgba(0,0,0,.06); }
        .pkg-accent { position:absolute; top:0; left:0; right:0; height:2.5px; background:linear-gradient(90deg,#1D4ED8,#60A5FA,#1D4ED8); transform:scaleX(0); transform-origin:left; transition:transform .4s ease; z-index:6; }
        .pkg-accent-on { transform:scaleX(1); }

        .pkg-img-wrap { position:relative; height:210px; overflow:hidden; flex-shrink:0; }
        .pkg-img { width:100%; height:100%; object-fit:cover; transition:transform .6s cubic-bezier(.25,.46,.45,.94); }
        .pkg-img-ph { background:#f1f5f9; display:flex; align-items:center; justify-content:center; }
        .pkg-img-hov { transform:scale(1.06); }
        .pkg-img-overlay { position:absolute; inset:0; background:linear-gradient(180deg,rgba(0,0,0,.08) 0%,rgba(0,0,0,.28) 40%,rgba(0,0,0,.72) 100%); }

        .pkg-price-badge { position:absolute; top:12px; left:12px; z-index:4; background:rgba(0,0,0,.65); color:#fff; font-size:12px; font-weight:700; padding:4px 10px; border-radius:4px; backdrop-filter:blur(6px); border:1px solid rgba(255,255,255,.18); letter-spacing:.02em; }
        .pkg-days-badge  { position:absolute; top:12px; right:12px; z-index:4; background:#2563EB; color:#fff; font-size:10px; font-weight:700; padding:4px 10px; border-radius:4px; letter-spacing:.08em; }
        .pkg-badge { position:absolute; bottom:68px; left:12px; z-index:4; color:#fff; font-size:7px; font-weight:700; letter-spacing:.22em; text-transform:uppercase; padding:3px 9px; border-radius:3px; }

        .pkg-img-title { position:absolute; bottom:0; left:0; right:0; z-index:4; padding:12px 14px; }
        .pkg-title { font-family:'Barlow Condensed',sans-serif; font-size:18px; font-weight:800; text-transform:uppercase; letter-spacing:.01em; color:#fff; line-height:1.1; margin-bottom:4px; }
        .pkg-desc { font-size:9.5px; color:rgba(255,255,255,.8); line-height:1.45; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }

        .pkg-body { padding:14px 15px 16px; display:flex; flex-direction:column; gap:10px; flex-grow:1; }

        .pkg-route { display:flex; align-items:flex-start; gap:6px; }
        .pkg-route-icon { width:12px; height:12px; flex-shrink:0; margin-top:1px; color:#2563EB; }
        .pkg-route-text { font-size:9.5px; color:#2563EB; font-weight:500; letter-spacing:.02em; line-height:1.45; }

        .pkg-highlights-wrap { display:flex; flex-direction:column; gap:5px; }
        .pkg-hl-label { font-size:8px; font-weight:700; color:#64748b; letter-spacing:.14em; }
        .pkg-highlights { display:flex; flex-wrap:wrap; gap:4px; }
        .pkg-hl-tag { font-size:8.5px; font-weight:500; color:#475569; background:#F1F5F9; border:1px solid #E2E8F0; padding:3px 8px; border-radius:20px; }

        .pkg-starting { font-size:9px; color:#94a3b8; letter-spacing:.04em; }
        .pkg-starting span { color:#475569; font-weight:500; }

        .pkg-cta { width:100%; display:flex; align-items:center; justify-content:center; gap:8px; background:#2563EB; color:#fff; border:none; border-radius:7px; padding:12px 16px; font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; letter-spacing:.18em; text-transform:uppercase; cursor:pointer; transition:transform .2s,box-shadow .28s,background .25s; }
        .pkg-cta:hover,.pkg-cta-hov { background:#1D4ED8; box-shadow:0 8px 22px rgba(37,99,235,.32); transform:translateY(-1px); }
        .pkg-cta span,.pkg-cta svg { position:relative; z-index:1; }
        .pkg-cta svg { transition:transform .22s; }
        .pkg-cta-hov svg { transform:translateX(3px); }

        .pkg-view-link { display:flex; align-items:center; justify-content:center; background:transparent; color:#2563EB; border:1px solid #DBEAFE; border-radius:7px; padding:9px 16px; font-size:10px; font-weight:600; letter-spacing:.18em; text-transform:uppercase; text-decoration:none; transition:background .2s; }
        .pkg-view-link:hover { background:#EFF6FF; }

        .pkg-view-all { display:flex; justify-content:center; gap:12px; margin-top:40px; flex-wrap:wrap; }
        .pkg-view-btn { display:inline-flex; align-items:center; gap:8px; padding:12px 32px; font-weight:800; font-size:10px; letter-spacing:.2em; text-transform:uppercase; text-decoration:none; transition:all .2s; }
        .pkg-view-btn-outline { border:2px solid #0f172a; color:#0f172a; background:transparent; }
        .pkg-view-btn-outline:hover { background:#0f172a; color:#fff; }
        .pkg-view-btn-solid { background:#2563EB; color:#fff; border:2px solid #2563EB; }
        .pkg-view-btn-solid:hover { background:#1D4ED8; border-color:#1D4ED8; }
      `}</style>

      <AnimatePresence>
        {enquiry && <EnquiryModal pkg={enquiry} onClose={() => setEnquiry(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default HomeFeaturedPackages;