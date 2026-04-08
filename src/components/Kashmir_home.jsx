import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Compass } from 'lucide-react';

const Kashmir_Home = () => {
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
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };
  const blogs = [
    { 
      id: 1,
      title: "AMAZING KASHMIR WITH KATRA",
      desc: "A 07 Nights / 08 Days spiritual and scenic journey from Mata Vaishno Devi to the glaciers of Sonamarg.",
      category: "PILGRIMAGE & LEISURE",
      image: "https://www.urbanyatra.com/wp-content/uploads/2023/07/kashmir.webp", 
      borderPos: "left",
      fullContent: {
        intro: "Experience the divine energy of Katra followed by the breathtaking valleys of Pahalgam, Gulmarg, and Srinagar. A perfect blend of spirituality and nature.",
        motto: "DIVINE SERENITY",
        subIntro: "Valid from 01st April 2026 to 30th September 2026",
        list: [
          { name: "Day 1: Arrival in Jammu – Katra", details: "Meet at Jammu airport and drive to Katra (50 kms). Check-in and prepare for the trek." },
          { name: "Day 2: Trip to Mata Vaishno Devi", details: "13km trek to the holy shrine for Darshan. Return to Katra hotel." },
          { name: "Day 3: Katra – Pahalgam", details: "240 kms drive. Enjoy the banks of River Lidder and nature walks." },
          { name: "Day 4: Pahalgam Sightseeing", details: "Visit Aru Valley, Chandanwari (Amarnath base), and Betaab Valley." },
          { name: "Day 5: Pahalgam – Gulmarg", details: "Drive to the 'Meadow of Flowers' (2730m). Relax in lush green meadows." },
          { name: "Day 6: Gulmarg – Srinagar", details: "Enjoy Gondola-ride (cable car) and drive back to Srinagar for overnight stay." },
          { name: "Day 7: Sonamarg Excursion", details: "Visit Thajiwas Glacier and the 'Meadow of Gold'. Return to Srinagar." },
          { name: "Day 8: Srinagar – Departure", details: "Transfer to Srinagar airport for your return flight." }
        ],
        pricing: [
      { category: "Category A", price: "₹76,475", stay: "KC Residency / The Hermitage / Rose Wood / Lemon Tree" },
      { category: "Category B", price: "₹62,445", stay: "Lemon Tree Katra / Eden Resort / Lupin / Downtown" },
      { category: "Category C", price: "₹53,475", stay: "Grand Sharan / White Water / Khaleel Palace / Arison" }
    ],
        note: "Note: Vehicle not allowed inside Gulmarg & Pahalgam for local sightseeing. Use local pony or union vehicles."
      }
    },
    {
      id: 2,
      title: "AMAZING KASHMIR WITH KATRA & PATNITOP",
      desc: "Explore the best hill resort of Jammu along with the holy shrine and the entire Kashmir valley in 08 Nights / 09 Days.",
      category: "EXTENDED HOLIDAY",
      image: "https://dynamic.tourtravelworld.com/package-images/photo-big/dir_1/4028/6839.jpg", 
      borderPos: "right",
      fullContent: {
        intro: "A comprehensive 9-day tour covering Patnitop’s pine forests, Katra’s spiritual essence, and the iconic beauty of Srinagar.",
        motto: "MOUNTAIN MAJESTY",
        subIntro: "Best for families looking for a slow-paced exploration of Jammu & Kashmir.",
        list: [
          { name: "Day 1: Arrival in Jammu – Katra", details: "Meet at Jammu airport and drive to Katra (50 kms). Check-in and prepare for the trek." },
          { name: "Day 2: Trip to Mata Vaishno Devi", details: "13km trek to the holy shrine for Darshan. Return to Katra hotel." },
          { name: "Day 3: Katra – Patnitop", details: "Drive to the hilltop resort (86 kms). Visit pine forests and enjoy the sunset." },
          { name: "Day 4: Patnitop – Pahalgam", details: "Scenic drive through the National Highway to the Valley of Shepherds." },
          { name: "Day 5: Pahalgam Sightseeing", details: "Visit Aru Valley, Chandanwari (Amarnath base), and Betaab Valley." },
          { name: "Day 6: Pahalgam – Gulmarg", details: "Drive to the 'Meadow of Flowers' (2730m). Relax in lush green meadows." },
          { name: "Day 7: Gulmarg – Srinagar", details: "Local sightseeing, Gondola ride, and Shikara session on Dal Lake." },
          { name: "Day 7: Sonamarg Excursion", details: "Visit Thajiwas Glacier and the 'Meadow of Gold'. Return to Srinagar." },
          { name: "Day 8: Srinagar – Departure", details: "Transfer to Srinagar airport for your return flight." }
        ],
        pricing: [
      { category: "Category A", price: "₹83,720", stay: "KC Residency / Green Top / Hermitage / Rose Wood" },
      { category: "Category B", price: "₹68,195", stay: "Lemon Tree Katra / Vardaan Resort / Eden / Lupin" },
      { category: "Category C", price: "₹58,995", stay: "Grand Sharan / Patnitop Heights / White Water / Khaleel" }
    ],
        note: "Issued Gondola passes are valid for 3 hours only. Plan your Phase 1 & 2 boarding accordingly."
      }
    },
    {
      id: 3,
      title: "CHARISMATIC KASHMIR",
      desc: "06 Nights / 07 Days stay in luxury Houseboats and the famous meadows of Gold and Flowers.",
      category: "BEST SELLER",
      image: "https://www.easterntravels.co.in/wp-content/uploads/2018/12/Dal-Lake.jpg", 
      borderPos: "left",
      fullContent: {
        intro: "Stay in a traditional Kashmiri Houseboat and explore the intricate maze of waterways via Shikara.",
        motto: "VALLEY VIBES",
        subIntro: "Includes Srinagar Houseboat, Pahalgam, Gulmarg, and Sonamarg.",
        list: [
          { name: "Day 1: Srinagar Arrival", details: "Houseboat check-in, Mughal Gardens visit, and evening Shikara ride." },
          { name: "Day 2: Srinagar – Pahalgam", details: ". In Pahalgam, admire the beauty of nature as you walk along the banks of River Lidder. " },
          { name: "Day 3: Pahalgam Sightseeing", details: "Visit Aru Valley, Chandanwari (Amarnath base), and Betaab Valley." },
          { name: "Day 4: Pahalgam – Gulmarg", details: "Full day at leisure in the meadow of flowers with snow-capped backdrops." },
          { name: "Day 5: Gulmarg – Srinagar", details: "Local sightseeing, Gondola ride, and Shikara session on Dal Lake." },
          { name: "Day 6: Srinagar – Sonamarg – Srinagarp", details: "Adventure treks, sledging, and visit to Thajiwas Glacier." },
          { name: "Day 7: Srinagar – Departure", details: "Transfer to Srinagar airport for your return flight." } 
        ],
        pricing: [
      { category: "Category A", price: "₹64,170", stay: "Deluxe Houseboat / Hermitage / Rose Wood / Lemon Tree" },
      { category: "Category B", price: "₹52,325", stay: "Deluxe Houseboat / Eden Resort / Lupin / Downtown" },
      { category: "Category C", price: "₹42,895", stay: "Deluxe Houseboat / White Water / Khaleel Palace / Arison" }
    ],
        note: "Package cost for 2 Pax Category C starts from ₹42,895 per person."
      }
    },
    {
      id: 4,
      title: "GLIMPSES OF KASHMIR VALLEY",
      desc: "Short on time? Explore the best of Srinagar, Pahalgam, and Gulmarg in just 04 Nights / 05 Days.",
      category: "SHORT BREAK",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjWwIGb8UPHL9vF6eDidCe9oFNKPCDW88uInDP0jthgTzGgHwcP-RKtiK8iNCy9MsnakQIVzG3IVc_E79_CSxAoBGf_yNCvlz4ctVnCXIhJ5IV-arsrF1X-IZoDi4VdT6C6hyFw/s1600/IMG_9222+med+col+cor+%C2%A9Ameen+Ahmed.jpg", 
      borderPos: "right",
      fullContent: {
        intro: "A compact itinerary for a quick getaway to the 'Heaven on Earth'.",
        motto: "QUICK ESCAPE",
        subIntro: "Valid for the 2026 Season.",
        list: [
          { name: "Day 1: Srinagar Arrival", details: "Srinagar arrival and Houseboat stay." },
          { name: "Day 2: Srinagar – Pahalgam", details: ". In Pahalgam, admire the beauty of nature as you walk along the banks of River Lidder. " },
          { name: "Day 3: Pahalgam Sightseeing", details: "Visit Aru Valley, Chandanwari (Amarnath base), and Betaab Valley." },
          { name: "Day 4: Pahalgam – Gulmarg", details: "Full day at leisure in the meadow of flowers with snow-capped backdrops." },
          { name: "Day 5: Gulmarg – Srinagar Departure", details: "Transfer to Srinagar airport for your return flight." } 
        ],
        pricing: [
      { category: "Category A", price: "₹42,895", stay: "Deluxe Houseboat / Hermitage / Rose Wood" },
      { category: "Category B", price: "₹38,525", stay: "Deluxe Houseboat / Eden Resort / Lupin" },
      { category: "Category C", price: "₹30,245", stay: "Deluxe Houseboat / White Water / Khaleel Palace" }
    ],
        note: "Medium vehicle for 1-3 travelers and Innova for 4 travelers will be provided."
      }
    },
    {
      id: 5,
      title: "HEAVEN ON EARTH",
      desc: "A balanced 05 Nights / 06 Days tour focusing on the core beauty of the Kashmir Valley.",
      category: "HONEYMOON SPECIAL",
      image: "https://www.jasonferrellphotography.com/images/xl/heaven-on-earth-1800.jpg", 
      borderPos: "left",
      fullContent: {
        intro: "Perfect for couples and families wanting to spend quality time in Srinagar and Pahalgam.",
        motto: "PURE BLISS",
        subIntro: "Includes Shikara ride and Mughal Garden entries.",
        list: [
          { name: "Day 1: Srinagar Arrival", details: "Houseboat check-in, Mughal Gardens visit, and evening Shikara ride." },
          { name: "Day 2: Srinagar – Pahalgam", details: ". In Pahalgam, admire the beauty of nature as you walk along the banks of River Lidder. " },
          { name: "Day 3: Pahalgam Sightseeing", details: "Visit Aru Valley, Chandanwari (Amarnath base), and Betaab Valley." },
          { name: "Day 4: Pahalgam – Gulmarg", details: "Full day at leisure in the meadow of flowers with snow-capped backdrops." },
          { name: "Day 5: Gulmarg - Srinagar", details: "Enjoy the heights of Apharwat via Gondola and return to Srinagar for shopping." },
          { name: "Day 6: Srinagar – Departure", details: "Transfer to Srinagar airport for your return flight." } 
        ],
        pricing: [
      { category: "Category A", price: "₹53,475", stay: "Deluxe Houseboat / Hermitage / Rose Wood / Lemon Tree" },
      { category: "Category B", price: "₹45,425", stay: "Deluxe Houseboat / Eden Resort / Lupin / Downtown" },
      { category: "Category C", price: "₹36,570", stay: "Deluxe Houseboat / White Water / Khaleel Palace / Arison" }
    ],
        note: "Peak Period surcharges applicable for public holidays and long weekends."
      }
    },
    {
      id: 6,
      title: "KASHMIR UNPLUGGED",
      desc: "An adventure-focused 06 Nights / 07 Days itinerary with extra time in Gulmarg.",
      category: "ADVENTURE",
      image: "https://unpluggedlife.in/wp-content/uploads/2023/10/Kashmir_1-1024x683.jpg", 
      borderPos: "right",
      fullContent: {
        intro: "Ideal for travelers who want to explore Gulmarg beyond the standard cable car ride.",
        motto: "UNEXPLORED PEAKS",
        subIntro: "Stay 2 nights in Gulmarg to experience the night beauty of the meadows.",
        list: [
          { name: "Day 1: Srinagar Arrival", details: "Houseboat check-in, Mughal Gardens visit, and evening Shikara ride." },
          { name: "Day 2: Srinagar – Pahalgam", details: ". In Pahalgam, admire the beauty of nature as you walk along the banks of River Lidder. " },
          { name: "Day 3: Pahalgam Sightseeing", details: "Visit Aru Valley, Chandanwari (Amarnath base), and Betaab Valley." },
          { name: "Day 4: Pahalgam – Gulmarg", details: "Full day at leisure in the meadow of flowers with snow-capped backdrops." },
          { name: "Day 5: Gulmarg Sightseeing", details: "Local walks, trekking, or skiing (seasonal). Overnight in Gulmarg." },
          { name: "Day 6: Srinagar – Departure", details: "Transfer to Srinagar airport for your return flight." } 
        ],
      pricing: [
      { category: "Category A", price: "₹62,675", stay: "Deluxe Houseboat / Hermitage / Rose Wood / Lemon Tree" },
      { category: "Category B", price: "₹53,245", stay: "Deluxe Houseboat / Eden Resort / Lupin / Downtown" },
      { category: "Category C", price: "₹43,470", stay: "Deluxe Houseboat / White Water / Khaleel Palace / Arison" }
    ],
        note: "Documents for Indian Nationals: Valid Passport or Voter ID is mandatory for airport security."
      }
    }
  ];

  return (
    <div className="bg-[#fcfdfe] min-h-screen font-sans text-slate-700 pt-16 selection:bg-blue-100">
      <AnimatePresence mode="wait">
        {!selectedBlog ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="relative w-full h-[75vh] md:h-[85vh] bg-[#0f172a] overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60 scale-105"
                style={{ backgroundImage: "url('https://images.travelandleisureasia.com/wp-content/uploads/sites/5/2024/01/15134609/kashmir-deepanshu-nayak.jpeg?tr=w-1200,q-60')" }}></div>
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0f172a]/80 via-transparent to-transparent"></div>
              <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
                <motion.h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none">KASHMIR</motion.h1>
              </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-12 md:space-y-16">
              {blogs.map((blog) => (
                <motion.div key={blog.id} className={`flex flex-col ${blog.borderPos === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-10`}>
                  <div className="w-full md:w-1/2 overflow-hidden shadow-lg aspect-[4/3]">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover opacity-100" />
                  </div>
                  <div className={`w-full md:w-1/2 relative ${blog.borderPos === 'left' ? 'text-left' : 'text-right'}`}>
                    <div className={`absolute top-0 ${blog.borderPos === 'left' ? 'left-0' : 'right-0'} w-8 md:w-12 h-8 md:h-12 border-t-2 ${blog.borderPos === 'left' ? 'border-l-2' : 'border-r-2'} border-blue-600`}></div>
                    <div className="pt-5 md:pt-6 px-4 md:px-6">
                      <p className="text-blue-600 font-bold text-[8px] md:text-[9px] tracking-widest uppercase mb-1">{blog.category}</p>
                      <h2 className="text-lg md:text-2xl font-black text-slate-900 uppercase mb-2 md:mb-3 leading-tight">{blog.title}</h2>
                      <p className="text-[11px] md:text-xs font-medium text-slate-500 leading-relaxed mb-4">{blog.desc}</p>
                      <button onClick={() => setSelectedBlog(blog)} className={`flex items-center gap-2 text-slate-900 font-black text-[9px] md:text-[10px] uppercase border-b border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all ${blog.borderPos === 'right' ? 'ml-auto' : ''}`}>
                        Read More <ArrowRight size={12} />
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
                    
                    {/* --- PRICING TABLE --- */}
                    {selectedBlog.fullContent.pricing && (
                      <div className="mb-12 overflow-x-auto shadow-sm">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-900 text-white text-[10px] uppercase tracking-widest">
                              <th className="p-3">Package Category</th>
                              <th className="p-3">Per Person Cost</th>
                              <th className="p-3">Accommodation</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedBlog.fullContent.pricing.map((p, idx) => (
                              <tr key={idx} className="border-b border-slate-100 text-[11px] font-bold">
                                <td className="p-3 text-blue-600">{p.category}</td>
                                <td className="p-3">{p.price}</td>
                                <td className="p-3 text-slate-400">{p.stay}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

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
                        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-2 italic opacity-60 text-white">Important Traveler's Note</p>
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

export default Kashmir_Home;