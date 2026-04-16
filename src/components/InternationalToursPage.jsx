import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Globe, ArrowLeft } from 'lucide-react';
import { PackageCard, EnquiryModal } from './IndiaToursPage';

/* ── International Category List ───────────────────────────────────────── */
const InternationalList = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.from('tour_categories')
      .select('*').eq('type','international').eq('is_active',true).order('display_order')
      .then(({ data }) => { setCats(data || []); setLoading(false); });
  }, []);

  if (loading) return <Loader/>;

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* --- DARK SQUARED BACK BUTTON REDIRECTING TO HOME SECTION --- */}
        <div className="mb-10 flex justify-start">
          <button 
            // Isko niche align kiya hai aur Home page ke section par redirect karega
            onClick={() => navigate('/')} 
            className="group flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-none font-bold uppercase tracking-widest text-[11px] hover:bg-blue-600 transition-all duration-300 shadow-lg"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span className="font-black">Back</span>
          </button>
        </div>

        <div className="text-center mb-14">
          <span className="text-blue-600 text-[10px] font-bold tracking-[0.28em] uppercase block mb-3">Explore the World</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 mb-3">
            International <span className="text-blue-600">Tours</span>
          </h1>
          <div className="w-12 h-0.5 bg-blue-600 mx-auto mb-4"/>
          <p className="text-slate-500 text-sm max-w-sm mx-auto font-medium leading-relaxed italic">Discover world-class destinations with our premium packages</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cats.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Link to={`/tours/international/${cat.slug}`}
                className="group block relative overflow-hidden border border-gray-100 rounded-none hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                <div className="h-56 overflow-hidden bg-slate-100">
                  {cat.image_url
                    ? <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                    : <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center"><Globe size={48} className="text-blue-200"/></div>
                  }
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"/>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h2 className="text-white font-black text-xl uppercase tracking-tight leading-tight">{cat.name}</h2>
                  {cat.tagline && <p className="text-blue-300 text-[10px] font-bold uppercase tracking-wider mt-0.5">{cat.tagline}</p>}
                </div>
                <div className="absolute top-3 right-3 bg-blue-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Globe size={14}/>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Individual International Page ─────────────────────────────────────── */
const InternationalDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [cat, setCat]         = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading]  = useState(true);
  const [enquiry, setEnquiry]  = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data: catData } = await supabase
        .from('tour_categories').select('*').eq('slug', slug).eq('type','international').single();
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

  if (loading) return <Loader/>;
  if (!cat) return null;

  return (
    <div className="pt-32 pb-20 bg-[#f0f4ff] min-h-screen font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          {/* Detail page back button to Category List */}
          <button 
            onClick={() => navigate('/tours/international')} 
            className="flex items-center gap-3 bg-slate-900 text-white px-5 py-2.5 rounded-none font-bold uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all mb-8 group shadow-lg"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> 
            Back to International List
          </button>

          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1">
              <span className="text-blue-600 text-[10px] font-bold tracking-[0.28em] uppercase block mb-2">{cat.tagline}</span>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-none mb-4">
                {cat.name.split(' ')[0]}<br/>
                <span className="text-blue-600">{cat.name.split(' ').slice(1).join(' ')}</span>
              </h1>
              {cat.description && <p className="text-slate-700 text-base max-w-md leading-relaxed font-medium">{cat.description}</p>}
            </div>
            {cat.image_url && (
              <div className="w-full lg:w-1/2 h-72 overflow-hidden shadow-2xl rounded-none border-4 border-white">
                <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover"/>
              </div>
            )}
          </div>
        </motion.div>

        {packages.length === 0 ? (
          <div className="text-center py-20 text-slate-400 border border-dashed border-slate-200">
            <p className="text-lg font-bold mb-2 uppercase tracking-tight">Packages coming soon</p>
            <p className="text-sm"><Link to="/contact" className="text-blue-600 underline">Contact us</Link> for custom quotes</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} onEnquire={() => setEnquiry(pkg)}/>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {enquiry && <EnquiryModal pkg={enquiry} onClose={() => setEnquiry(null)}/>}
      </AnimatePresence>
    </div>
  );
};

const Loader = () => (
  <div className="h-screen flex items-center justify-center bg-white">
    <div className="text-blue-600 font-black tracking-widest uppercase text-sm animate-pulse">Loading...</div>
  </div>
);

export { InternationalList, InternationalDetail };
export default InternationalDetail;