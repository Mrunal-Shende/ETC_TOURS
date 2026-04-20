import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, ArrowLeft, Globe } from 'lucide-react';
import { PackageCard, EnquiryModal } from './IndiaToursPage';

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
   INTERNATIONAL LIST — matches Blog page hero style
────────────────────────────────────────────────────────── */
const InternationalList = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.from('tour_categories')
      .select('*').eq('type', 'international').eq('is_active', true).order('display_order')
      .then(({ data }) => { setCats(data || []); setLoading(false); });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── HERO — dark full-screen with centered massive text ── */}
      <div className="relative h-[100vh] min-h-[600px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[#0a0f1e]">
          <div className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.6) 0%, transparent 100%),
                                radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.4) 0%, transparent 100%),
                                radial-gradient(1px 1px at 50% 10%, rgba(255,255,255,0.5) 0%, transparent 100%),
                                radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.3) 0%, transparent 100%),
                                radial-gradient(1px 1px at 90% 40%, rgba(255,255,255,0.6) 0%, transparent 100%),
                                radial-gradient(1px 1px at 20% 90%, rgba(255,255,255,0.4) 0%, transparent 100%),
                                radial-gradient(1px 1px at 80% 15%, rgba(255,255,255,0.5) 0%, transparent 100%),
                                radial-gradient(1px 1px at 60% 50%, rgba(255,255,255,0.3) 0%, transparent 100%)`
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/2"
            style={{ background: 'linear-gradient(to top, rgba(10,15,30,0.95) 0%, transparent 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 50% 70%, rgba(30,64,175,0.2) 0%, transparent 65%)' }} />
        </div>

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Badge box — like Blog page */}
            <div className="border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 mb-8 flex flex-col items-center gap-1">
              <span className="text-white font-black text-base tracking-tight italic">
                Express Travel <span className="text-blue-500">Worldwide</span>
              </span>
              <span className="text-blue-400 text-[9px] font-bold tracking-[0.3em] uppercase">Europe · Asia · Americas · Africa · Middle East</span>
            </div>

            {/* MASSIVE TITLE */}
            <h1 className="text-white font-black uppercase leading-none tracking-tighter"
              style={{ fontSize: 'clamp(52px, 10vw, 120px)' }}>
              INTERNATIONAL
            </h1>
            <h2 className="text-blue-500 font-black uppercase leading-none tracking-tighter mt-1"
              style={{ fontSize: 'clamp(52px, 10vw, 120px)' }}>
              TOURS
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            {/* <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest"></span> */}
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* ── CATEGORIES SECTION ── */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-20">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
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
                World <span className="text-blue-600">Destinations</span>
              </h2>
            </div>
            <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest pb-1">
              {cats.length} Destinations Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cats.map((cat, i) => (
              <motion.div key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={`/tours/international/${cat.slug}`}
                  className="group block relative overflow-hidden border border-gray-100 hover:border-blue-300 hover:shadow-[0_8px_40px_rgba(30,64,175,0.15)] transition-all duration-400"
                >
                  <div className="h-60 overflow-hidden bg-slate-900 relative">
                    {cat.image_url
                      ? <img src={cat.image_url} alt={cat.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07] opacity-85 group-hover:opacity-100" />
                      : <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                          <Globe size={40} className="text-blue-400/30" />
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
   INTERNATIONAL DETAIL — same cinematic hero
────────────────────────────────────────────────────────── */
const InternationalDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [cat, setCat] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data: catData } = await supabase
        .from('tour_categories').select('*').eq('slug', slug).eq('type', 'international').single();
      if (!catData) { navigate('/tours/international'); return; }
      setCat(catData);
      const { data: pkgData } = await supabase
        .from('tour_packages').select('*')
        .eq('category_id', catData.id).eq('is_active', true).order('display_order');
      setPackages(pkgData || []);
      setLoading(false);
    };
    load();
  }, [slug, navigate]);

  if (loading) return <Loader />;
  if (!cat) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans">

      {/* ── FULL-BLEED CINEMATIC HERO ── */}
      <div className="relative h-[100vh] min-h-[600px] overflow-hidden">
        {cat.image_url
          ? <img src={cat.image_url} alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ animation: 'kenBurns 8s ease-out forwards' }} />
          : <div className="absolute inset-0 bg-[#0a0f1e]" />
        }

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        <div className="absolute left-12 top-0 bottom-0 w-[1px] opacity-20 hidden lg:block"
          style={{ background: `linear-gradient(to bottom, transparent 5%, ${GOLD} 40%, transparent 95%)` }} />

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px]" style={{ background: GOLD }} />
              <span className="font-black tracking-[0.4em] text-[9px] md:text-[10px] uppercase" style={{ color: GOLD }}>
                {cat.tagline || 'International Tours'}
              </span>
              <div className="w-8 h-[1px]" style={{ background: GOLD }} />
            </div>

            <h1 className="text-white font-black uppercase tracking-tighter leading-none"
              style={{ fontSize: 'clamp(56px, 11vw, 130px)' }}>
              {cat.name.split(' ')[0]}
            </h1>
            {cat.name.split(' ').length > 1 && (
              <h1 className="text-blue-500 font-black uppercase tracking-tighter leading-none"
                style={{ fontSize: 'clamp(56px, 11vw, 130px)' }}>
                {cat.name.split(' ').slice(1).join(' ')}
              </h1>
            )}

            <div className="h-1 w-20 bg-blue-500 my-6" />

            {cat.description && (
              <p className="text-gray-100 text-sm md:text-base max-w-xl font-bold leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {cat.description}
              </p>
            )}
          </motion.div>

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

          <div className="flex flex-col md:flex-row md:items-center gap-5 mb-12">
            <button
              onClick={() => navigate('/tours/international')}
              className="group flex items-center gap-2.5 bg-[#0a0f1e] text-white px-5 py-3 font-black uppercase tracking-widest text-[9px] hover:bg-blue-600 transition-all duration-300 shadow-md w-fit"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-300" />
              All International Tours
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

          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-[1px]" style={{ background: GOLD }} />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: GOLD }}>Our Curated Packages</span>
          </div>

          {packages.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-slate-200 bg-white">
              <div className="w-14 h-14 bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-5">
                <Globe size={24} className="text-slate-300" />
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

export { InternationalList, InternationalDetail };
export default InternationalDetail;