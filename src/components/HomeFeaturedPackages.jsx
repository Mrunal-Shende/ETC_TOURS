import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Ship, MapPin, ArrowRight } from 'lucide-react';
import { submitEnquiry } from '../services/enquiryService';

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

/* ── Enquiry Modal — Updated Size ───────────────────────────── */
const EnquiryModal = ({ pkg, onClose }) => {
  const [form, setForm]       = useState({ name:'', phone:'', email:'', travel_date:'', pax:1, message:'' });
  const [sending, setSending] = useState(false);
  const [done, setDone]       = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setSending(true);

    try {
      await submitEnquiry({
        fullName: form.name,
        phoneNumber: form.phone,
        email: form.email,
        fromDate: form.travel_date,
        travelers: form.pax,
        requirements: form.message,
        packageName: pkg.name,
        serviceType: "holiday"
      });

      setDone(true);

    } catch (err) {
      console.error("GAS Error:", err);
      alert("Submission failed");
    }

    setSending(false);
  };

  const F = { 
    label:{ display:'block', color:'#64748b', fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:'.08em', marginBottom:4 }, 
    input:{ width:'100%', border:'1px solid #e5e7eb', padding:'8px 10px', fontSize:13, color:'#1e293b', outline:'none', boxSizing:'border-box', background:'#fcfdfe' } 
  };

  return (
    <motion.div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={e => e.target===e.currentTarget && onClose()}>
      <motion.div className="bg-white w-full max-w-sm shadow-2xl overflow-hidden border-t-8 border-blue-600"
        initial={{ scale:.95, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:.95 }}>
        
        <div className="bg-slate-900 text-white px-5 py-4 flex items-start justify-between">
          <div>
            <h3 className="font-black text-base uppercase tracking-tight">Quick Enquiry</h3>
            <p className="text-blue-300 text-[10px] font-bold mt-0.5 uppercase tracking-wider line-clamp-1">{pkg.name}</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white text-lg leading-none mt-0.5">✕</button>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-blue-50 flex items-center justify-center mx-auto mb-4 text-blue-600 text-xl font-black rounded-full">✓</div>
            <h3 className="font-black text-slate-900 text-lg mb-1">Enquiry Sent!</h3>
            <p className="text-slate-500 text-xs mb-6">Our team will contact you shortly.</p>
            <button onClick={onClose} className="bg-blue-600 text-white px-8 py-2.5 font-black text-[9px] uppercase tracking-widest hover:bg-blue-700 transition-colors">Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-5 space-y-3">
            {[{l:'Full Name *',k:'name',t:'text',r:true,p:'Your name'},{l:'Phone *',k:'phone',t:'tel',r:true,p:'+91 98765 43210'},{l:'Email',k:'email',t:'email',r:true,p:'you@email.com'}].map(f=>(
              <div key={f.k}><label style={F.label}>{f.l}</label><input type={f.t} required={f.r} placeholder={f.p} value={form[f.k]} onChange={set(f.k)} style={F.input}/></div>
            ))}
            
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              <div><label style={F.label}>Travel Date</label><input type="date" value={form.travel_date} onChange={set('travel_date')} style={F.input}/></div>
              <div><label style={F.label}>Persons</label><input type="number" min="1" value={form.pax} onChange={set('pax')} style={F.input}/></div>
            </div>

            <div><label style={F.label}>Message</label><textarea rows={2} placeholder="Requirements..." value={form.message} onChange={set('message')} style={{...F.input,resize:'none',display:'block'}}/></div>
            
            <div style={{ display:'flex', gap:8, paddingTop:4 }}>
              <button type="submit" disabled={sending} style={{ flex:1, background:'#2563EB', color:'#fff', border:'none', padding:'12px 16px', fontWeight:800, fontSize:9, letterSpacing:'.15em', textTransform:'uppercase', cursor:'pointer', opacity:sending?.6:1 }}>
                {sending ? 'Sending...' : 'Send Now'}
              </button>
              <button type="button" onClick={onClose} style={{ padding:'10px 14px', border:'1px solid #e5e7eb', background:'transparent', color:'#64748b', fontWeight:600, fontSize:12, cursor:'pointer' }}>Cancel</button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ── Package Card — UI Preserved ─────── */
const PackageCard = ({ pkg, index, onEnquire }) => {
  const bColor = badgeColor[(pkg.badge||'').toUpperCase()] || '#2563EB';
  const daysLabel  = pkg.nights ? `${pkg.nights+1}D/${pkg.nights}N` : (pkg.duration_label || '');
  
  const catType    = pkg.tour_categories?.type;
  const catSlug    = pkg.tour_categories?.slug;
  const detailLink = catType === 'india' ? `/tours/india/${catSlug}` : `/tours/international/${catSlug}`;

  return (
    <motion.div
      layout
      initial={{ opacity:0, y:24 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, scale:0.94 }}
      transition={{ duration:.4, delay:index*.05 }}
      className="flex flex-col items-center text-center h-full group"
    >
      <div 
        className="w-full aspect-[5/4] overflow-hidden border-[6px] border-white shadow-sm ring-1 ring-gray-100 mb-6 cursor-pointer relative"
        onClick={() => window.location.href = detailLink}
      >
        {pkg.image_url ? (
          <img src={pkg.image_url} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full bg-slate-50 flex items-center justify-center"><Ship size={32} className="text-slate-200" /></div>
        )}
        
        {daysLabel && <div className="absolute top-2 right-2 bg-blue-600 text-white text-[8px] font-black uppercase px-2 py-1 tracking-widest z-10">{daysLabel}</div>}
        {pkg.badge && <div className="absolute top-2 left-2 text-white text-[7px] font-black uppercase px-2 py-1 tracking-widest z-10 shadow-sm" style={{ background: bColor }}>{pkg.badge}</div>}
        
        {pkg.price && (
          <div className="absolute bottom-0 right-0 bg-slate-900/90 text-white px-3 py-1.5 backdrop-blur-md">
            <span className="text-[7px] block leading-none opacity-60 uppercase font-bold text-left">From</span>
            <span className="text-xs font-black">₹{Number(pkg.price).toLocaleString()}</span>
          </div>
        )}
      </div>

      <h2 className="text-slate-800 font-bold text-lg uppercase tracking-[0.15em] mb-2 line-clamp-1 px-2">{pkg.name}</h2>
      
      <div className="flex items-center justify-center gap-1.5 mb-3 text-blue-600">
        <MapPin size={10} />
        <span className="text-[9px] font-bold uppercase tracking-wider line-clamp-1">
          {pkg.route_covering || pkg.tour_categories?.name}
        </span>
      </div>

      <p className="text-slate-500 text-[11px] leading-relaxed font-medium mb-6 px-4 line-clamp-2 flex-1">
        {pkg.description || "Handpicked experience for your dream vacation."}
      </p>

      <div className="mt-auto flex flex-col gap-2 w-full px-8 pb-4">
        <button 
          onClick={() => onEnquire(pkg)} 
          className="w-full bg-slate-900 text-white py-2 text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all duration-300"
        >
          Enquire Now
        </button>
        <Link 
          to={detailLink} 
          className="w-full border border-slate-800 text-slate-800 py-1.5 text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 hover:text-white transition-all duration-300 text-center"
        >
          Read More
        </Link>
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

  // Function to get View More link based on filter
  const getViewMoreLink = () => {
    if (filter === 'INTERNATIONAL') return '/tours/international';
    return '/tours/india'; // Default for ALL and DOMESTIC
  };

  return (
    <div className="pkg-root">
      <div className="pkg-ambient" aria-hidden="true">
        <div className="pkg-orb pkg-orb-1" />
        <div className="pkg-orb pkg-orb-2" />
        <div className="pkg-dotgrid" />
      </div>

      <section className="pkg-section">
        <motion.div className="pkg-header" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
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

        <motion.div className="pkg-filters" initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          {FILTERS.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`pkg-filter ${filter === cat ? 'pkg-filter-act' : ''}`}>
              {filter === cat && <motion.span layoutId="pkgPill" className="pkg-filter-bg" transition={{ type:'spring', stiffness:400, damping:30 }} />}
              <span className="pkg-filter-txt">{cat}</span>
            </button>
          ))}
        </motion.div>

        <div className="pkg-section-label">
          <span className="pkg-section-label-line" />
          <span className="pkg-section-label-txt">{catLabel[filter]}</span>
          <span className="pkg-section-label-count">{loading ? '...' : `${filtered.length} packages`}</span>
        </div>

        {loading ? (
          <div className="pkg-grid">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col items-center"><div style={{ width:'100%', height:200, background:'#f1f5f9' }} className="pkg-skel rounded-xl mb-4"/></div>
            ))}
          </div>
        ) : (
          <>
            <motion.div layout className="pkg-grid">
              <AnimatePresence mode="popLayout">
                {filtered.map((pkg, i) => (
                  <PackageCard key={pkg.id} pkg={pkg} index={i} onEnquire={setEnquiry} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* View More Button Added Here */}
            <div className="flex justify-center mt-16">
              <Link 
                to={getViewMoreLink()} 
                className="group flex items-center gap-3 bg-slate-900 text-white px-10 py-4 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-blue-600 transition-all duration-300 shadow-xl"
              >
                Explore More Packages
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </>
        )}
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@300;400;500;700&display=swap');
        @keyframes skelpulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        .pkg-skel { background:#f1f5f9; animation: skelpulse 1.5s ease-in-out infinite; }
        .pkg-root { position:relative; background:#fff; overflow:hidden; font-family:'DM Sans',sans-serif; }
        .pkg-ambient { position:absolute; inset:0; pointer-events:none; z-index:0; }
        .pkg-orb { position:absolute; border-radius:50%; filter:blur(90px); }
        .pkg-orb-1 { width:560px; height:560px; top:-200px; left:-160px; background:radial-gradient(circle,rgba(37,99,235,.06),transparent 70%); }
        .pkg-dotgrid { position:absolute; inset:0; background-image:radial-gradient(rgba(37,99,235,.05) 1px,transparent 1px); background-size:26px 26px; }
        .pkg-section { position:relative; z-index:1; max-width:1280px; margin:0 auto; padding:52px 20px 80px; }
        .pkg-header { text-align:center; margin-bottom:30px; }
        .pkg-eyebrow { display:inline-flex; align-items:center; gap:11px; margin-bottom:14px; }
        .pkg-eyebrow-line { display:block; width:28px; height:1px; background:linear-gradient(90deg,transparent,#2563EB); }
        .pkg-eyebrow-text { font-size:10px; font-weight:500; letter-spacing:.28em; text-transform:uppercase; color:#2563EB; }
        .pkg-heading { font-family:'Barlow Condensed',sans-serif; font-size:clamp(36px,5.5vw,62px); font-weight:900; text-transform:uppercase; letter-spacing:-.01em; line-height:1; color:#0f172a; }
        .pkg-heading-blue { color:#2563EB; position:relative; display:inline-block; }
        .pkg-underline { position:absolute; bottom:-5px; left:-4px; width:calc(100% + 8px); height:12px; }
        .pkg-subhead { font-size:12px; color:#94a3b8; letter-spacing:.05em; margin-top:8px; }
        .pkg-filters { display:flex; flex-wrap:wrap; justify-content:center; gap:8px; margin-bottom:40px; }
        .pkg-filter { position:relative; padding:9px 24px; font-size:10px; font-weight:600; letter-spacing:.18em; text-transform:uppercase; border:1px solid #e2e8f0; background:transparent; color:#94a3b8; cursor:pointer; border-radius:2px; }
        .pkg-filter-bg { position:absolute; inset:0; background:#2563EB; border-radius:2px; }
        .pkg-filter-txt { position:relative; z-index:1; }
        .pkg-filter-act { color:#fff !important; border-color:#2563EB; }
        .pkg-section-label { display:flex; align-items:center; gap:12px; margin-bottom:32px; }
        .pkg-section-label-line { flex:0 0 32px; height:1px; background:#2563EB; }
        .pkg-section-label-txt { font-family:'Barlow Condensed',sans-serif; font-size:18px; font-weight:800; text-transform:uppercase; color:#0f172a; }
        .pkg-section-label-count { font-size:10px; font-weight:500; color:#2563EB; background:#EFF6FF; border:1px solid #DBEAFE; padding:3px 10px; border-radius:20px; }
        .pkg-grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:40px; }
        @media(max-width:1024px){ .pkg-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:640px){ .pkg-grid { grid-template-columns:1fr; } }
      `}</style>

      <AnimatePresence>
        {enquiry && <EnquiryModal pkg={enquiry} onClose={() => setEnquiry(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default HomeFeaturedPackages;