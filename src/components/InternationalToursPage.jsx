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
   INTERNATIONAL LIST — Updated to match requested UI
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

      {/* ── HERO — Unchanged ── */}
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

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center">
            <div className="border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 mb-8 flex flex-col items-center gap-1">
              <span className="text-white font-black text-base tracking-tight italic">
                Express Travel <span className="text-blue-500">Worldwide</span>
              </span>
              <span className="text-blue-400 text-[9px] font-bold tracking-[0.3em] uppercase">Europe · Asia · Americas · Africa · Middle East</span>
            </div>
            <h1 className="text-white font-black uppercase leading-none tracking-tighter" style={{ fontSize: 'clamp(52px, 10vw, 120px)' }}>INTERNATIONAL</h1>
            <h2 className="text-blue-500 font-black uppercase leading-none tracking-tighter mt-1" style={{ fontSize: 'clamp(52px, 10vw, 120px)' }}>TOURS</h2>
          </motion.div>
        </div>
      </div>

      {/* ── CATEGORIES SECTION (Updated UI) ── */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-20">
          
          <button onClick={() => navigate('/')} className="group flex items-center gap-2.5 text-slate-400 hover:text-blue-600 px-0 py-3 font-black uppercase tracking-widest text-[9px] transition-all duration-300 mb-12">
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {cats.map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="flex flex-col items-center text-center h-full">
                
                {/* Image Box with Border like image UI */}
                <div className="w-full aspect-[5/4] overflow-hidden border-[6px] border-white shadow-sm ring-1 ring-gray-100 mb-6 cursor-pointer" onClick={() => navigate(`/tours/international/${cat.slug}`)}>
                  {cat.image_url 
                    ? <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-slate-50 flex items-center justify-center"><Globe size={24} className="text-slate-200" /></div>
                  }
                </div>

                <h2 className="text-slate-800 font-bold text-lg uppercase tracking-[0.2em] mb-4">{cat.name}</h2>
                
                {/* Description */}
                <p className="text-slate-500 text-[11px] leading-relaxed font-medium mb-6 px-2 line-clamp-3 flex-1">
                  {cat.description || cat.tagline || `Experience the best of ${cat.name} with our premium tours.`}
                </p>

                {/* READ MORE Button - Aligned in one line */}
                <Link to={`/tours/international/${cat.slug}`} className="mt-auto border border-slate-800 text-slate-800 px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 hover:text-white transition-all duration-300">
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
   INTERNATIONAL DETAIL — Unchanged Hero
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

      {/* ── Hero Section — Unchanged ── */}
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
              <span className="font-black tracking-[0.4em] text-[9px] md:text-[10px] uppercase" style={{ color: GOLD }}>{cat.tagline || 'International Tours'}</span>
              <div className="w-8 h-[1px]" style={{ background: GOLD }} />
            </div>
            <h1 className="text-white font-black uppercase tracking-tighter leading-none" style={{ fontSize: 'clamp(56px, 11vw, 130px)' }}>{cat.name}</h1>
            <div className="h-1 w-20 bg-blue-500 my-6" />
          </motion.div>
        </div>
      </div>

      {/* ── Packages Section ── */}
      <div className="bg-[#F8F9FC] py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-[1px]" style={{ background: GOLD }} />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: GOLD }}>Our Curated Packages</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} onEnquire={() => setEnquiry(pkg)} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {enquiry && <EnquiryModal pkg={enquiry} onClose={() => setEnquiry(null)} />}
      </AnimatePresence>

      <style>{` @keyframes kenBurns { 0% { transform: scale(1.08); } 100% { transform: scale(1.0); } } `}</style>
    </div>
  );
};

export { InternationalList, InternationalDetail };
export default InternationalDetail;