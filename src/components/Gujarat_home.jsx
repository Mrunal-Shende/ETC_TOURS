import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Compass, Calendar, CheckCircle, CreditCard } from 'lucide-react';

const Gujarat_Home = () => {
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
      title: "ENCHANTING GUJARAT",
      desc: "05 Nights / 06 Days – A spiritual and wildlife journey through Dwarka, Somnath, and the majestic Sasan Gir.",
      category: "HERITAGE & WILDLIFE",
      image: "https://5.imimg.com/data5/ANDROID/Default/2025/4/505699218/TD/LI/NR/82257973/product-jpeg-500x500.jpg", 
      borderPos: "left",
      fullContent: {
        intro: "Embark on a soul-stirring journey through Gujarat. From the sacred temples of Dwarkadhish and Somnath Jyotirlinga to the thrilling roar of Asiatic lions in Sasan Gir, this 6-day itinerary offers a perfect blend of devotion and adventure.",
        list: [
          { name: "Day 01: Arrive at Rajkot – Dwarka", details: "Arrive at Rajkot Airport and proceed to Dwarka (235 kms). On arrival, check into your hotel and enjoy the rest of the day at leisure. Overnight at Dwarka." },
          { name: "Day 02: Dwarka Sightseeing", details: "Take a dip in River Gomti. Visit Nageshwar Jyotirlinga, Gopi Talav, Bet Dwarka, and Rukmini Temple. Witness the evening aarti at Dwarkadhish Temple. Overnight at Dwarka." },
          { name: "Day 03: Dwarka – Somnath via Porbandar", details: "Proceed to Somnath (235 kms). In the evening, visit the Somnath Temple, another sacred Jyotirlinga of Lord Shiva. Overnight in Somnath." },
          { name: "Day 04: Somnath – Sasan Gir", details: "Visit Gandhi Ashram, Triveni Sangam, Bhalka Tirth and Geeta Mandir. Later proceed to Sasan Gir (40 kms). Enjoy the evening at leisure. Overnight in Sasan Gir." },
          { name: "Day 05: Sasan Gir Sightseeing ", details: "Early morning and evening game drives in Gir National Park, the only home of the Asiatic lion. Experience the thrill of wildlife in one of India's oldest sanctuaries. Overnight in Sasan Gir." },
          { name: "Day 06: Rajkot – Departure", details: "After breakfast, transfer to Rajkot airport (170 kms) for your return flight. End of tour." }
        ],
        pricing: [
          { category: "Category A", price2: "₹42,612", price4: "₹39,404", stay: "Fern Sattva / Sarovar Portico / Fern Gir" },
          { category: "Category B", price2: "₹37,075", price4: "₹33,866", stay: "Hawthorn Suites / Fern Residency / Sterling Rudra" },
          { category: "Category C", price2: "₹34,617", price4: "₹31,409", stay: "Ginger / Fern Residency / Sterling Rudra" }
        ],
        note: "Valid from 01 April to 30 Sept 2026. Includes private vehicle, driver allowances, and taxes. Gir Safari and entry fees extra."
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
                style={{ backgroundImage: "url('https://hblimg.mmtcdn.com/content/hubble/img/destimg/mmt/destination/m_Dwarka_tv_destination_img_1_l_766_1147.jpg')" }}></div>
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0f172a]/80 via-transparent to-transparent"></div>
              <div className="relative z-20 text-center max-w-4xl mx-auto px-4 md:px-6">
                <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">GUJARAT</h1>
        
              </div>
            </div>

            {/* Package Cards */}
            <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-12 md:space-y-16">
              {blogs.map((blog) => (
                <motion.div key={blog.id} className={`flex flex-col ${blog.borderPos === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-10`}>
                  <div className="w-full md:w-1/2 overflow-hidden shadow-lg aspect-[4/3]">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
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
        

export default Gujarat_Home;