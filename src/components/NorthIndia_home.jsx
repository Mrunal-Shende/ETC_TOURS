import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Compass, Calendar, CheckCircle, CreditCard } from 'lucide-react';

const NorthEast_Home = () => {
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
      title: "ENCHANTING NORTH EAST",
      desc: "07 Nights / 08 Days – A complete journey through Darjeeling, Gangtok & the remote beauty of Lachung.",
      category: "TOUR PACKAGE",
      image: "https://dynamic.tourtravelworld.com/package-images/photo-big/dir_16/472917/241872.jpg",
      borderPos: "left",
      fullContent: {
        intro: "Experience the magical beauty of North East India. From the 'Place of the Thunderbolt' in Darjeeling to the valley of flowers in Yumthang, this 8-day journey is a showcase of rich Himalayan culture.",
        motto: "EXPLORE THE HIMALAYAS",
        subIntro: "07 Nights / 08 Days Complete Plan",
        list: [
          { name: "Day 01: Arrival in Bagdogra / NJP Station – Darjeeling", details: "Meet at Bagdogra/NJP. Transfer to Darjeeling (93km). Enjoy breathtaking views of Kanchendzonga. Overnight at Darjeeling." },
          { name: "Day 02: Darjeeling Sightseeing", details: "Tiger Hill sunrise, Himalayan Mountaineering Institute, Zoo, Tenzing Rock, and Japanese Temple." },
          { name: "Day 03: Darjeeling – Gangtok", details: "Drive to Gangtok (105km). Afternoon visit Flower Show, Handicraft Centre, and Do Drul Chorten." },
          { name: "Day 04: Gangtok – Lachung", details: "Drive to Lachung (120km) enroute visiting waterfalls. Overnight at a mountain village near the Tibetan border." },
          { name: "Day 05: Lachung – Yumthang – Lachung", details: "Visit the 'Valley of Flowers'. Explore grazing grounds of Yaks and Rhododendron sanctuaries." },
          { name: "Day 06: Lachung – Gangtok", details: "Return journey to Gangtok. Evening free for local shopping at MG Marg." },
          { name: "Day 07: Gangtok Sightseeing", details: "Full day excursion to Changu Lake (12,400 ft) and the sacred New Baba Mandir." },
          { name: "Day 08: Gangtok – Bagdogra / NJP Station – Departure", details: "Morning transfer to Bagdogra Airport / NJP Station for your return journey." }
        ],
        pricing: [
          { category: "Category A", price: "₹88,860", stay: "Elgin Norkhill / Denzong Regency" },
          { category: "Category B", price: "₹61,020", stay: "Lemon Tree / Fern Denzong" },
          { category: "Category C", price: "₹52,140", stay: "Yashshree / Summit Blossom" }
        ],
        note: "Documents: Valid Passport or Voter ID required for permits. PAN/Aadhar not accepted for Tsomgo Lake/Lachung."
      }
    },
    {
      id: 2,
      title: "HIGH ON THE HIMALAYAS",
      desc: "06 Nights / 07 Days – Discover the high altitudes of Darjeeling, Gangtok & the quiet hills of Kalimpong.",
      category: "TOUR PACKAGE",
      image: "https://trekthehimalayas.com/images/HomePageImages/Desktop/0948eddb-fe4e-4022-89a6-df00e43cd350_ebc%20(5).webp",
      borderPos: "right",
      fullContent: {
        intro: "A perfect 7-day Himalayan retreat. Experience the colonial charm of Darjeeling, the vibrant life of Gangtok, and the world-renowned orchids of Kalimpong.",
        motto: "MOUNTAIN ESCAPE",
        subIntro: "06 Nights / 07 Days - Three Hill Stations",
        list: [
          { name: "Day 01: Arrival in Bagdogra/ NJP Station – Darjeeling", details: "Arrival at Bagdogra/NJP and transfer to the Queen of Hills (2134m)." },
          { name: "Day 02: Darjeeling Sightseeing", details: "Early morning Tiger Hill sunrise. City tour covering Zoo, HMI, and Peace Pagoda." },
          { name: "Day 03: Darjeeling – Gangtok", details: "Drive to Gangtok via Teesta Village. Surrounded by monasteries and orchids." },
          { name: "Day 04: Gangtok Sightseeing", details: "Visit Tashi View Point, Ganesh Tok, Hanuman Tok, and the local Ropeway." },
          { name: "Day 05: Gangtok Sightseeing", details: "Full day trip to the sacred Tsomgo Lake and New Baba Mandir." },
          { name: "Day 06: Gangtok – Kalimpong", details: "Drive to Kalimpong. Visit Mangal Dham, Durpin Hill, and local Flower Nurseries." },
          { name: "Day 07: Kalimpong – Bagdogra / NJP Station – Departure", details: "Transfer to Bagdogra/NJP for your flight or train back home." }
        ],
        pricing: [
          { category: "Category A", price: "₹69,900", stay: "New Elgin / Cedar Inn" },
          { category: "Category B", price: "₹48,060", stay: "Crescent Resort / Lemon Tree" },
          { category: "Category C", price: "₹40,980", stay: "Orsino / Yashshree" }
        ],
        note: "Note: AC will be switched off while travelling uphill. Carry 4 passport size photos for permits."
      }
    },
    {
      id: 3,
      title: "HILLS OF THE EAST",
      desc: "06 Nights / 07 Days – Explore the serene village of Pelling, the Skywalk, and historic ruins.",
      category: "TOUR PACKAGE",
      image: "https://www.namasteindiatrip.com/blog/wp-content/uploads/2019/04/Diphu.jpg",
      borderPos: "left",
      fullContent: {
        intro: "Explore the western districts of Sikkim. This tour commands spectacular views of Mt. Kanchenjunga and covers the unique Skywalk in Pelling.",
        motto: "NATURE & PEACE",
        subIntro: "06 Nights / 07 Days - Western Sikkim Focus",
        list: [
          { name: "Day 01: Arrival in Bagdogra/ NJP Station – Darjeeling", details: "Welcome at arrival and transfer to Darjeeling. Overnight stay." },
          { name: "Day 02: Darjeeling Sightseeing", details: "Sunrise at Tiger Hill, Tea Estates, and Himalayan Mountaineering Institute." },
          { name: "Day 03: Darjeeling – Pelling", details: "Drive to the serene village of Pelling (2000m) with incredible mountain views." },
          { name: "Day 04: Pelling Sightseeing", details: "Visit Khechipalri Lake, Rimbi Falls, Pelling Skywalk, and Rabtense Ruins." },
          { name: "Day 05: Pelling – Gangtok", details: "Drive to the capital city. Half-day tour of Flower Show and Tibetology Institute." },
          { name: "Day 06: Gangtok Sightseeing", details: "Full day excursion to the high-altitude Changu Lake and Baba Mandir." },
          { name: "Day 07: Gangtok – Bagdogra / NJP Station - Departure", details: "Morning transfer to Bagdogra/NJP for your onward journey." }
        ],
        pricing: [
          { category: "Category A", price: "₹75,060", stay: "Elgin Mt. Pandim / Norkhill" },
          { category: "Category B", price: "₹50,220", stay: "Norbu Ghang Retreat / Fern" },
          { category: "Category C", price: "₹43,860", stay: "Norbu Ghang Resort / Yashshree" }
        ],
        note: "Valid from 01 April to 30 September 2026. Tiger Hill visit depends on permit availability."
      }
    },
    {
      id: 4,
      title: "NORTHEAST SOUJURN",
      desc: "05 Nights / 06 Days – A quick yet comprehensive Himalayan trip covering Darjeeling & Gangtok.",
      category: "TOUR PACKAGE",
      image: "https://5.imimg.com/data5/ANDROID/Default/2025/4/505697939/BZ/VS/CK/82257973/product-jpeg-500x500.jpg",
      borderPos: "right",
      fullContent: {
        intro: "The perfect short break. Experience the two most iconic destinations of the North East in a perfectly paced 6-day itinerary.",
        motto: "SHORT & SWEET TRIP",
        subIntro: "05 Nights / 06 Days - Essential North East",
        list: [
          { name: "Day 01: Arrival in Bagdogra/ NJP Station – Darjeeling", details: "Transfer from Bagdogra/NJP to Darjeeling. Evening at leisure." },
          { name: "Day 02: Darjeeling Sightseeing", details: "Tiger Hill sunrise and city tour of Zoo, HMI, and Tea Gardens." },
          { name: "Day 03: Darjeeling – Gangtok", details: "Scenic drive to Gangtok. Evening explore the local markets of MG Marg." },
          { name: "Day 04: Gangtok Sightseeing", details: "Visit Tashi View Point, Ganesh Tok, Bakthang Falls, and the local Ropeway." },
          { name: "Day 05: Gangtok Sightseeing", details: "Visit the glacial Changu Lake and the sacred Baba Mandir shrine." },
          { name: "Day 06: Gangtok – Bagdogra / NJP Station – Departure", details: "Transfer back to Bagdogra Airport / NJP Railway Station." }
        ],
        pricing: [
          { category: "Category A", price: "₹59,940", stay: "New Elgin / Denzong Regency" },
          { category: "Category B", price: "₹39,300", stay: "Crescent Resort / Lemon Tree" },
          { category: "Category C", price: "₹34,020", stay: "Orsino / Yashshree Blossom" }
        ],
        note: "Ideal for travelers looking for a compact mountain getaway. Ensure to carry 4 passport size photos."
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
                style={{ backgroundImage: "url('https://www.sampantravel.com/wp-content/uploads/2023/08/Gurudongmar-Lake-Sikkim-India.-Gaurav-Bagdi.-Unsplash.-3-Apr-20-1600x800.jpg')" }}></div>
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0f172a]/80 via-transparent to-transparent"></div>
              <div className="relative z-20 text-center max-w-4xl mx-auto px-4 md:px-6">
                <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">NORTH EAST</h1>
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

export default NorthEast_Home;