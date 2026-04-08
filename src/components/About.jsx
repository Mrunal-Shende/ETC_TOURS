import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AboutSection = () => {
  const navigate = useNavigate();
  return (
    // Spacing tight karne ke liye padding kam ki gayi hai
    <section id="about" className="relative w-full bg-white overflow-hidden py-8 md:py-12 font-sans">
      
      {/* BACKGROUND DECORATIVE ELEMENTS (Scrapbook style accents) */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        {/* Subtle watercolor texture overlay */}
        <div className="absolute inset-0 bg-[url('https://www.progressivetourtravels.com/images/banner/heritage-tour-packages-india-banner-mob.webp')] opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* gap-12/20 ko kam karke gap-8/12 kiya hai */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* LEFT CONTENT: MODERN CONSULTING STYLE (Diagonal Edge) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-5" // space-y-8 ko kam kiya hai
          >
            <header className="space-y-3"> {/* space-y-4 ko kam kiya hai */}
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-12 bg-blue-600"></span>
                <span className="text-blue-600 font-bold uppercase tracking-[0.4em] text-[10px]">Ministry of Tourism Recognized</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9] italic">
                EXPRESS TRAVEL CORPORATE <br/>
                <span className="text-blue-600">SERVICES Pvt Ltd</span>
              </h2>
            </header>

            <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]"> {/* space-y-6 ko kam kiya hai */}
              <p className="text-lg font-medium text-slate-800 italic border-l-4 border-blue-600 pl-6">
                "Today, Top India Tour Packages has become a renowned name in the travel industry, thanks to dynamic leadership and hard work."
              </p>
              
              <p>
                Established on <b>Since 1999</b>, we bridge the gap between business precision and leisure elegance. 
                Whether it's premium fleet management for <b>Corporate Clients</b> or handcrafted <b>Inbound Tours</b> across South India, our 15+ years of expertise ensures premium quality.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-2 border-t border-slate-100"> {/* pt-4 ko kam kiya hai */}
                <div className="space-y-1">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-600">Specializations</h4>
                  <p className="text-[13px] text-slate-500 leading-snug">Ayurveda, Yoga, Wildlife, Textiles, Art & Architecture.</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-600">Experience</h4>
                  <p className="text-[13px] text-slate-500 leading-snug">Providing superior total travel management for over a decade.</p>
                </div>
              </div>
            </div>

            {/* 3. onClick handler add kiya gaya hai */}
            <button 
              onClick={() => navigate('/about')} 
              className="relative group bg-slate-900 text-white px-10 py-3.5 text-[12px] font-black uppercase tracking-[0.3em] transition-all hover:bg-blue-600 shadow-xl overflow-hidden rounded-sm cursor-pointer"
            >
              <span className="relative z-10">Find Out More</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            </button>
          </motion.div>

          {/* RIGHT: COMPOSITE IMAGE (Consulting Cut-out + Scrapbook Stack) */}
          {/* h-500/600 ko thoda compact kiya hai */}
          <div className="w-full lg:w-1/2 relative h-[450px] md:h-[550px] flex items-center justify-center">
            
            {/* Main Image with Diagonal Mask (Consulting Image Style) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute inset-0 z-0 overflow-hidden shadow-2xl rounded-sm"
              
            >
              <img 
                src="https://www.irctctourism.com/all-india-tour-packages/img/1stsection.jpg"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" 
                alt="Main Travel Experience"
              />
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
            </motion.div>

            

            {/* Floating Ratings / Stats Badge (Bottom Right style) */}
            <div className="absolute bottom-6 right-0 bg-blue-700 backdrop-blur-md p-2 shadow-xl border-l-4 border-blue-200 z-30"> 
               <div className="flex gap-1 mb-1.5">
                 {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-500 text-sm">★</span>)}
               </div>
               <p className="text-[8px] font-black uppercase text-white tracking-widest leading-none">Global Travel Excellence</p>
               <p className="text-[12px] font-black text-white italic mt-1 leading-none">SINCE 1999</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;