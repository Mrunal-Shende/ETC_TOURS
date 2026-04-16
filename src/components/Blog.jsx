import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Compass } from 'lucide-react';

const BlogPage = () => {
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
      title: "Top 7 Places To Travel after Pandemic in India",
      desc: "Beaches are forgotten by our minds and Beautiful hills are lost from our sight. Reconnect with nature in the post-pandemic era.",
      category: "POST-PANDEMIC TRAVEL",
      image: "/blog1.jpeg", 
      borderPos: "left",
      fullContent: {
        intro: "Beaches are forgotten by our minds and Beautiful hills are lost from our sight. So many things changed upside down with the never forgotten virus corona. It became a tragic fate which reshaped the lives of every human being.",
        motto: "LET THE BYGONES BE BYGONE",
        subIntro: "Let’s move forward to the year 2021 and hope to live a new normal life.",
        list: [
          { name: "GOA", details: "GOA is the first region that became a green pandemic free zone. The lavish beaches and shining sand of GOA welcomes travelers from all region of India." },
          { name: "HIMACHAL PRADESH", details: "Government of Himachal, opened the gates for people to visit the humongous mountains and fall in love with the floating clouds." },
          { name: "COORG- Karnataka", details: "“The Scotland of India” is a must visit place that everyone should visit at least once in their life time." },
          { name: "Andhra Pradesh & Telangana", details: "A unique combination of tradition, nature and modern trend could be witnessed when you visit cities like Hyderabad and Vizag." },
          { name: "Tamilnadu", details: "Being surrounded by ocean on two sides and covered with a train of mountains Tamilnadu is one such a place that everyone should visit without fail." },
          { name: "Uttarakhand- Valley of flowers", details: "Every year the valley is blessed with a variety of flowers which counts to a huge number." },
          { name: "Pondicherry", details: "The union territory showcases a strong bond between the French culture and culture of tamilnadu." }
        ],
        note: "One kind note from us to you is that in this new normal life, adapt yourself to wear masks and maintain a personal hygiene."
      }
    },
    {
      id: 2,
      title: "Best Place to Visit & Have a memorable Pongal 2021",
      desc: "We all know that our 2020 wasn’t the way we expected it to be. Our lifestyle changed upside down and now we need that fresh breeze.",
      category: "FESTIVAL SPECIAL",
      image: "/blog22.jpeg", 
      borderPos: "right",
      fullContent: {
        intro: "Life tossed us back and forth like a piece of paper. Our lifestyle changed upside down and now we all need that fresh breeze.",
        motto: "VROOM!! VROOM!",
        subIntro: "Having our financial crisis in mind, we came up with top 3 places to visit in tamilnadu with a low budget.",
        list: [
          { name: "Megamalai", details: "Beautiful hills and the tea plantations will soothe your heart." },
          { name: "Coonoor", details: "The luke warm sunshine and mild breezy cold weather will melt and warm your heart." },
          { name: "Yerkadu", details: "Yerkadu is well known for the hilly mountains and lush green sceneries." }
        ],
        note: "Despite spending money there is something extra when it comes to spending a quality time with your money."
      }
    },
    {
      id: 3,
      title: "Rare Place to Visit in Tamil Nadu with Low Budget",
      desc: "The first place in budget list is Megamalai which is located near kumuli. Explore hidden gems without breaking the bank.",
      category: "BUDGET EXPLORATION",
      image: "/blog3.jpeg", 
      borderPos: "left",
      fullContent: {
        intro: "Explore rare places without spending too much. Reconnect with nature.",
        motto: "BUDGET TREASURES",
        subIntro: "Travelling is never complete without visiting the Queen and Princess of the Hills.",
        list: [
          { name: "Megamalai", details: "Beautiful hills and the tea plantations will soothe your heart." },
          { name: "Theni", details: "The luke warm sunshine and mild breezy cold weather will melt and warm your heart." },
          { name: "Pollachi", details: "Yerkadu is well known for the hilly mountains and lush green sceneries." },
          { name: "Ooty", details: "The town of Ooty has everything within herself to mesmerize the visitors." }
        ],
        note: "Plan your trip with proper safety measures. Add these rare places to your bucket list!"
      }
    },
    {
      id: 4,
      title: "Best places to visit in India this Valentine’s Day",
      desc: "The one thing we look forward in the month of February is Valentine’s day.",
      category: "ROMANTIC EXCURSION",
      image: "/blog4.jpeg", 
      borderPos: "right"
    }
  ];

  return (
    <div className="bg-[#fcfdfe] min-h-screen font-sans text-slate-700 selection:bg-blue-100">
      <AnimatePresence mode="wait">
        {!selectedBlog ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            
            {/* --- HERO SECTION FIXED TO FULL SCREEN --- */}
            <div className="relative w-full h-screen bg-[#0f172a] overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
                style={{ backgroundImage: "url('/heroblog.jpeg')" }}></div>
              
              {/* Overlay for readability */}
              <div className="absolute inset-0 z-10 bg-black/40"></div>
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0f172a]/60 via-transparent to-[#0f172a]/40"></div>

              <div className="relative z-20 text-center max-w-4xl mx-auto px-4 md:px-6">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex flex-col items-center mb-6 mt-8 px-6 py-2 border border-white/10 backdrop-blur-md bg-white/5">
                  <span className="text-white font-serif text-xl md:text-2xl font-bold tracking-tight italic text-center leading-tight">Incredible <span className="text-blue-500 font-sans not-italic font-black">!</span>ndia</span>
                  <span className="text-[7px] md:text-[8px] text-blue-400 font-black uppercase tracking-[0.3em] mt-1 text-center">Travel Chronicles & Insights</span>
                </motion.div>
                <motion.h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">BLOG</motion.h1>
              </div>
            </div>

            {/* --- BLOG LISTING --- */}
            <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-12 md:space-y-16">
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
                      <button onClick={() => blog.fullContent && setSelectedBlog(blog)} className={`flex items-center gap-2 text-slate-900 font-black text-[9px] md:text-[10px] uppercase border-b border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all ${blog.borderPos === 'right' ? 'ml-auto' : ''}`}>
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
            <div className="max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-24 md:pb-32">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit bg-slate-50/50 p-4 md:p-6 border-r border-slate-100">
                  <div className="border-l-4 border-blue-600 pl-4 md:pl-6 mb-8 md:mb-10">
                    <p className="text-[8px] md:text-[9px] font-black text-blue-600 uppercase tracking-widest mb-2">{selectedBlog.category}</p>
                    <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase italic leading-tight mb-4 md:mb-6">{selectedBlog.title}</h1>
                  </div>
                  
                  <nav className="space-y-3 md:space-y-4 max-h-48 lg:max-h-full overflow-y-auto custom-scrollbar pr-2">
                    <p className="text-[7px] md:text-[8px] font-black text-slate-300 uppercase tracking-widest mb-4">Explore the Story</p>
                    {selectedBlog.fullContent.list.map((item, i) => (
                      <div key={i} onClick={() => scrollToLocation(`location-${i}`)} className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase hover:text-blue-600 cursor-pointer flex items-center gap-2 md:gap-3 transition-all group">
                        <span className="text-blue-600/20 font-black italic group-hover:text-blue-600 transition-colors">0{i+1}</span> {item.name}
                      </div>
                    ))}
                  </nav>
                  
                  <div className="mt-8 md:mt-20 pt-6 md:pt-10 border-t border-slate-200">
                    <button onClick={() => setSelectedBlog(null)} className="flex items-center gap-3 text-slate-400 font-black uppercase text-[8px] md:text-[9px] tracking-[0.2em] md:tracking-[0.3em] hover:text-blue-600 transition-colors">
                      <ArrowLeft size={16} /> Return to Index
                    </button>
                  </div>
                </div>

                <div className="lg:w-2/3">
                  <div className="mb-10 md:mb-16 overflow-hidden shadow-2xl rounded-sm">
                    <img src={selectedBlog.image} className="w-full aspect-[16/9] object-cover" alt="Blog cover" />
                  </div>

                  <div className="prose prose-slate max-w-none px-2 md:px-0">
                    <p className="text-base md:text-lg font-bold text-slate-800 leading-relaxed mb-8 md:mb-12 border-l-4 border-blue-600 pl-4 md:pl-6 italic">{selectedBlog.fullContent.intro}</p>
                    
                    <div className="my-8 md:my-12 py-4 md:py-6 border-y border-slate-100 bg-slate-50/30 px-4 md:px-6 text-center lg:text-left">
                      <h4 className="text-[10px] md:text-xs font-black text-blue-600 uppercase tracking-[0.3em] md:tracking-[0.4em] mb-2">{selectedBlog.fullContent.motto}</h4>
                      <p className="text-[11px] md:text-sm font-medium text-slate-400 uppercase">{selectedBlog.fullContent.subIntro}</p>
                    </div>

                    <div className="space-y-12 md:space-y-20">
                      {selectedBlog.fullContent.list.map((item, i) => (
                        <div key={i} id={`location-${i}`} className="scroll-mt-32 group">
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
                        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-2 italic opacity-60 text-white">Traveler's Safety Note</p>
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

export default BlogPage;