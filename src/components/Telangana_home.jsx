import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Compass, Calendar, CheckCircle, CreditCard } from 'lucide-react';

const Telangana_Home = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedBlog]);

  const scrollToLocation = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const blogs = [
    {
      id: 1,
      title: "THE BEST OF HYDERABAD",
      desc: "03 Nights / 04 Days – Explore the City of Pearls, from the historic Charminar to the magical Ramoji Film City.",
      category: "CITY TOUR",
      image: "https://lakshmisharath.com/wp-content/uploads/2020/01/Hyderabad-Charminar-.jpg",
      borderPos: "left",
      fullContent: {
        intro: "Experience the perfect blend of Nizami heritage and modern buzz. From the majestic ruins of Golconda to the world's largest integrated film city, this 4-day journey captures the true essence of Hyderabad.",
        motto: "HERITAGE & CINEMA",
        subIntro: "03 Nights / 04 Days Complete Itinerary",
        list: [
          { name: "Day 01: Arrive at Hyderabad", details: "On arrival, transfer to the hotel. Enroute visit the magnificent Statue of Equality. Rest of the day free for individual activities. Overnight at Hyderabad." },
          { name: "Day 02: Hyderabad Sightseeing", details: "Visit Birla Mandir, the majestic ruins of Golconda Fort (built in 1525), Qutub Shahi Tombs, Salar Jung Museum, and the iconic Charminar with its four grand arches. End the day at the historic Mecca Masjid." },
          { name: "Day 03: Hyderabad – Optional Visit to Ramoji Film City", details: "Full day free or optional visit to Ramoji Film City (45 kms). Spread over 2000 acres, it is the world's largest film studio complex and a cinematic wonderland for over 1.5 million tourists annually." },
          { name: "Day 04: Hyderabad – Departure", details: "Post breakfast, transfer to Hyderabad airport for your return flight back home. End of tour." }
        ],
        pricing: [
          { category: "Category A", price2: "₹25,329", price4: "₹23,712", stay: "Marigold By Green Park" },
          { category: "Category B", price2: "₹22,575", price4: "₹20,895", stay: "Green Park" },
          { category: "Category C", price2: "₹17,850", price4: "₹16,170", stay: "The Peerless Inn" }
        ],
        note: "Valid from 01 April to 30 Sept 2026. Includes private vehicle, driver allowances, and taxes. Excludes entry fees and Ramoji tickets."
      }
    }
  ];

  return (
    <div className="bg-[#fcfdfe] min-h-screen font-sans text-slate-700 pt-16 selection:bg-blue-100">
      <AnimatePresence mode="wait">
        {!selectedBlog ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Hero Section */}
            <div className="relative w-full h-[75vh] md:h-[85vh] bg-[#0f172a] overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60 scale-105"
                style={{ backgroundImage: "url('https://s7ap1.scene7.com/is/image/incredibleindia/2-charminar_hyderabad_telangana-1-city-hero?qlt=82&ts=1742190636845')" }}></div>
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0f172a]/80 via-transparent to-transparent"></div>
              <div className="relative z-20 text-center max-w-4xl mx-auto px-4 md:px-6">
                <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">HYDERABAD</h1>
                <p className="text-white/80 font-bold tracking-[0.3em] text-[10px] md:text-xs mt-4">THE CITY OF PEARLS & NIZAMS</p>
              </div>
            </div>

            {/* Package Cards */}
            <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-12 md:space-y-16">
              {blogs.map((blog) => (
                <motion.div key={blog.id} className={`flex flex-col ${blog.borderPos === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-10`}>
                  <div className="w-full md:w-1/2 overflow-hidden shadow-lg aspect-[4/3]">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                  </div>
                  <div className={`w-full md:w-1/2 relative ${blog.borderPos === 'left' ? 'text-left' : 'text-right'}`}>
                    <div className={`absolute top-0 ${blog.borderPos === 'left' ? 'left-0' : 'right-0'} w-8 md:w-12 h-8 md:h-12 border-t-2 ${blog.borderPos === 'left' ? 'border-l-2' : 'border-r-2'} border-blue-600`}></div>
                    <div className="pt-5 md:pt-6 px-4 md:px-6">
                      <p className="text-blue-600 font-bold text-[8px] md:text-[9px] tracking-widest uppercase mb-1">{blog.category}</p>
                      <h2 className="text-lg md:text-2xl font-black text-slate-900 uppercase mb-2 md:mb-3 leading-tight">{blog.title}</h2>
                      <p className="text-[11px] md:text-xs font-medium text-slate-500 leading-relaxed mb-4">{blog.desc}</p>
                      <button onClick={() => setSelectedBlog(blog)} className={`flex items-center gap-2 text-slate-900 font-black text-[9px] md:text-[10px] uppercase border-b border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all ${blog.borderPos === 'right' ? 'ml-auto' : ''}`}>
                        Explore Package <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white min-h-screen relative">
            <div className="max-w-6xl mx-auto px-4 md:px-6 pt-15 md:pt-25 pb-24 md:pb-32">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit bg-slate-50/50 p-4 md:p-6 border-r border-slate-100">
                  <div className="border-l-4 border-blue-600 pl-4 md:pl-6 mb-8 md:mb-10">
                    <p className="text-[8px] md:text-[9px] font-black text-blue-600 uppercase tracking-widest mb-2">{selectedBlog.category}</p>
                    <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase italic leading-tight mb-4 md:mb-6">{selectedBlog.title}</h1>
                  </div>
                  
                  <nav className="space-y-4">
                    {selectedBlog.fullContent.list.map((item, i) => (
                      <div key={i} onClick={() => scrollToLocation(`loc-${i}`)} className="text-[10px] font-black text-slate-400 uppercase hover:text-blue-600 cursor-pointer flex items-center gap-3">
                        <span className="text-blue-600/30">0{i+1}</span> {item.name}
                      </div>
                    ))}
                  </nav>  
                  
                  <div className="mt-8 md:mt-20 pt-6 md:pt-10 border-t border-slate-200">
                    <button onClick={() => setSelectedBlog(null)} className="flex items-center gap-3 text-slate-400 font-black uppercase text-[8px] md:text-[9px] tracking-[0.2em] md:tracking-[0.3em] hover:text-blue-600 transition-colors">
                      <ArrowLeft size={16} /> Back to Packages
                    </button>
                  </div>
                </div>

                <div className="lg:w-2/3">
                  <div className="mb-10 md:mb-16 overflow-hidden shadow-2xl rounded-sm">
                    <img src={selectedBlog.image} className="w-full aspect-[16/9] object-cover" alt="Blog cover" />
                  </div>

                  <div className="prose prose-slate max-w-none px-2 md:px-0">
                    <p className="text-base md:text-lg font-bold text-slate-800 leading-relaxed mb-8 md:mb-12 border-l-4 border-blue-600 pl-4 md:pl-6 italic">{selectedBlog.fullContent.intro}</p>
                    
                    {/* PRICING TABLE */}
                    <div className="mb-12 overflow-x-auto shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-900 text-white text-[10px] uppercase tracking-widest">
                            <th className="p-3">Category</th>
                            <th className="p-3">2 Pax (PP)</th>
                            <th className="p-3">4 Pax (PP)</th>
                            <th className="p-3">Accommodation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedBlog.fullContent.pricing.map((p, idx) => (
                            <tr key={idx} className="border-b border-slate-100 text-[11px] font-bold">
                              <td className="p-3 text-blue-600">{p.category}</td>
                              <td className="p-3">{p.price2}</td>
                              <td className="p-3">{p.price4}</td>
                              <td className="p-3 text-slate-400">{p.stay}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="space-y-12 md:space-y-20">
                      {selectedBlog.fullContent.list.map((item, i) => (
                        <div key={i} id={`loc-${i}`} className="scroll-mt-32 group">
                          <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase italic mb-3 md:mb-4 flex items-center gap-3 md:gap-4">
                            <span className="text-blue-600 font-black italic text-base md:text-lg">0{i+1}.</span> {item.name}
                          </h3>
                          <p className="text-[13px] md:text-sm text-slate-500 font-bold leading-relaxed pl-8 md:pl-10">
                            {item.details}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-16 md:mt-32 p-6 md:p-8 bg-blue-600 text-white relative overflow-hidden shadow-2xl">
                      <Compass size={120} className="absolute -right-5 -bottom-5 text-white opacity-10" />
                      <div className="relative z-10">
                        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-2 italic opacity-60 text-white">Traveler's Note</p>
                        <p className="text-sm md:text-base font-bold italic leading-relaxed text-white">
                          {selectedBlog.fullContent.note}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2563eb; }
      `}</style>
    </div>
  );
};

export default Telangana_Home;