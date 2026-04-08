import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Plane, Hotel, Utensils, Activity, Car, Ship, Star, Quote, ChevronRight } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const DomesticListingPage = () => {
  const { categoryName } = useParams(); 
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testiIndex, setTestiIndex] = useState(0);

  const iconMap = {
    Flights: <Plane size={18} />,
    Hotels: <Hotel size={18} />,
    Meals: <Utensils size={18} />,
    Activities: <Activity size={18} />,
    Transfers: <Car size={18} />,
  };

   const testimonials = [ 
    { name: "Jestin Mathew", text: "We would like to appreciate your good office for arranging travel trip to Maldives for our Director..." },
    { name: "Ramesh Babu", text: "Dear Sir, We had arranged a vehicle for Mr. Swithun Manoharan - Executive Vice President..." },
    { name: "Santosh Krinsky", text: "I wanted to take the opportunity to write to you and thank you for your efforts..." }
  ];

  useEffect(() => {
  const fetchTours = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('domestic')
      .select('*')
      // ilike use karne se 'Andaman' aur 'andaman' dono match ho jayenge
      .ilike('category', categoryName) 
      .eq('is_active', true);
    
    if (data) {
      console.log("Fetched Data:", data); // Check karne ke liye
      setPackages(data);
    }
    setLoading(false);
  };
  if(categoryName) fetchTours();
}, [categoryName]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestiIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (loading) return <div className="h-screen flex items-center justify-center font-black uppercase tracking-widest text-slate-400">Loading...</div>;

  return (
    <div className="pt-32 pb-16 bg-[#f0f9ff] font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-9">
        
        {/* --- DYNAMIC SECTION: ONLY SHOWS IF BACKEND HAS DATA --- */}
        {packages.length > 0 && (
          <>
            <div className="flex flex-col lg:flex-row gap-12 items-center mb-16 border-b border-slate-100 pb-16">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-[2px] w-12 bg-blue-600"></span>
                  <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px]"> PREMIMUM TOUR</span>
               <span className="h-[2px] w-12 bg-blue-600"></span> </div>
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none">
  {categoryName} <br/>
                   <span className="text-blue-700">
    {categoryName?.toLowerCase() === 'andaman' ? 'ISLANDS' : 'TOUR PACKAGES'}
  </span>
</h1>
                <p className="text-lg font-medium text-slate-500 max-w-md leading-relaxed italic">
                  Explore the pristine beauty and curated packages for {categoryName}.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full lg:w-1/2 h-[380px] relative overflow-hidden shadow-2xl">
                <img src={packages[0]?.image_url} alt={categoryName} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-blue-900/5"></div>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
              {packages.map((item, idx) => (
                <motion.div key={idx} whileHover={{ y: -8 }} className="bg-white border-b-4 border-blue-600 shadow-xl flex flex-col overflow-hidden group">
                  <div className="h-44 overflow-hidden relative">
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-3 left-3 bg-white/90 p-2"><Ship className="text-blue-600" size={14} /></div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-blue-700 font-black text-lg mb-1 uppercase leading-tight">{item.duration}</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight mb-6 h-10 leading-snug">{item.title}</p>

                    <div className="flex justify-between items-center py-4 border-t border-slate-50 mb-4">
                      {(item.inclusions || ["Flights", "Hotels", "Meals", "Activities", "Transfers"]).map((inc, i) => (
                        <div key={i} title={inc} className="text-slate-300 hover:text-blue-500 transition-colors">
                          {iconMap[inc]}
                        </div>
                      ))}
                    </div>
                    <Link to={`/tour/${item.slug}`} className="w-full text-center py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      More Details <ChevronRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* --- STATIC BOTTOM SECTION (ALWAYS SHOWS) --- */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch mt-10">
          {/* TESTIMONIAL CARD */}
          <div className="bg-white border border-gray-100 shadow-2xl relative overflow-hidden h-[350px] flex flex-col">
            <div className="bg-blue-600 py-3 px-8 w-[70%] rounded-r-full shadow-lg relative z-20 -ml-2 mt-6">
              <span className="text-white font-bold tracking-wider uppercase text-xs">Testimonials</span>
            </div>
            <div className="p-8 pt-4 flex flex-col h-full justify-between relative z-10">
              <AnimatePresence mode="wait">
                <motion.div key={testiIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                  <div className="flex text-yellow-400 gap-1 mt-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-4 -left-4 text-blue-50 opacity-50" size={40} />
                    <p className="text-slate-600 font-medium italic text-[15px] leading-relaxed relative z-10 pl-2">
                      "{testimonials[testiIndex].text}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-black">{testimonials[testiIndex].name.charAt(0)}</div>
                    <div>
                      <p className="font-black text-slate-800 text-sm uppercase">{testimonials[testiIndex].name}</p>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-[11px] text-slate-400 font-bold uppercase">Verified Client</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-2 bg-gradient-to-r from-blue-900 to-slate-900 p-10 relative h-[350px] flex flex-col justify-center">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2 leading-none">
                Explore Dream <span className="text-cyan-400">Destination!</span>
              </h2>
              <p className="text-blue-300 font-bold text-lg italic mb-8">
                You'll never forget the experience we are ready to present Joy!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="bg-white hover:bg-cyan-400 text-slate-900 px-10 py-4 font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 shadow-lg">
                  CLICK HERE <Plane size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DomesticListingPage;