import React, { useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Globe, ShieldCheck, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const branches = [
    { 
      city: "New Delhi", 
      address: "F-11/12, Triveni Complex, Sheikh Sarai, Phase-1, New Delhi - 110017.",
      image: "/India Gate.jpeg" 
    },
    { 
      city: "Bhopal", 
      address: "Flat Number F-05, Shri Ram Complex, Hoshangabad Road, Bhopal - 462026.",
      image: "/bhopal.jpeg" 
    },
  ];

  return (
    <div className="bg-[#fcfdfe] min-h-screen font-sans text-slate-800 selection:bg-blue-100 overflow-x-hidden">
      
      {/* --- SECTION 1: HERO SECTION (MADE FULL SCREEN TO MATCH HOME) --- */}
      <div className="relative w-full h-screen bg-[#0f172a] overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105" 
          style={{ backgroundImage: "url('/contact1.jpeg')" }}
        ></div>
        {/* Overlays for Header Readability */}
        <div className="absolute inset-0 z-10 bg-black/40"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0f172a]/70 via-transparent to-[#0f172a]/40"></div>
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>

        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex flex-col items-center mb-8 px-5 py-2 border border-white/10 backdrop-blur-md bg-white/5 mt-6 md:mt-8">
            <span className="text-white font-serif text-xl md:text-2xl font-bold tracking-tight italic">
              Incredible <span className="text-blue-500 font-sans not-italic">!</span>ndia
            </span>
            <span className="text-[7px] md:text-[8px] text-blue-400 font-black uppercase tracking-[0.3em] mt-1">Recognized by Ministry of Tourism</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-6xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">
            Connect <br /> <span className="text-blue-600 not-italic">With Us</span>
          </motion.h1>
        </div>
      </div>

      {/* --- FLOATING STATS --- */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-40 grid grid-cols-2 md:grid-cols-4 gap-1">
        {[
          { icon: <Clock size={12}/>, label: "24/7 Support" },
          { icon: <Globe size={12}/>, label: "Pan India" },
          { icon: <ShieldCheck size={12}/>, label: "Secured" },
          { icon: <Star size={12}/>, label: "Premium" }
        ].map((stat, i) => (
          <div key={i} className="bg-white/95 backdrop-blur-xl p-2.5 border border-slate-100 shadow-lg flex items-center justify-center gap-2">
            <div className="text-blue-600">{stat.icon}</div>
            <span className="text-[7px] font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* --- MAIN INTERFACE --- */}
      <div className="max-w-7xl mx-auto px-6 mt-12 relative z-30 pb-16">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT: ENQUIRY FORM */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-7 bg-white p-8 shadow-xl border-t-8 border-blue-600">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-6">Quick <span className="text-blue-600">Enquiry</span></h2>
            <form className="grid md:grid-cols-2 gap-6">
              <input type="text" className="bg-transparent border-b-2 border-slate-200 py-2 text-sm outline-none focus:border-blue-600 transition-all font-bold uppercase" placeholder="Full Name" />
              <input type="email" className="bg-transparent border-b-2 border-slate-200 py-2 text-sm outline-none focus:border-blue-600 transition-all font-bold uppercase" placeholder="Email Address" />
              <textarea rows="2" className="md:col-span-2 bg-transparent border-b-2 border-slate-200 py-2 text-sm outline-none focus:border-blue-600 transition-all font-bold resize-none uppercase" placeholder="How can we assist?"></textarea>
              <button className="md:col-span-2 bg-blue-600 hover:bg-slate-900 text-white font-black py-4 uppercase tracking-[0.3em] text-[10px] shadow-xl transition-all flex items-center justify-center gap-2">
                Send Request <Send size={14}/>
              </button>
            </form>
          </motion.div>

          {/* RIGHT: HQ INFO */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0f172a] text-white p-6 border-l-8 border-blue-600 shadow-xl">
              <h3 className="text-lg font-black uppercase italic mb-4">Chennai Headquarters</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <MapPin className="text-blue-500 shrink-0" size={20} />
                  <p className="text-[11px] leading-snug text-slate-300">
                    <b className="text-white block text-sm mb-1 uppercase italic">Express Travel Corp Pvt Ltd</b>
                    Regd. Office
Express Building
No.20, Duraisamy Street,
Nungambakkam, Chennai-600034
                  </p>
                </div>
                <div className="grid gap-2 text-[11px] font-black tracking-widest">
                  <span className="flex items-center gap-2 text-blue-400"><Phone size={14}/> +91-44-2827 2279</span>
                  <span className="flex items-center gap-2 text-blue-400 lowercase"><Mail size={14}/> enquiry@expresstravelcorp.com</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 border border-slate-200">
              <h3 className="text-[10px] font-black uppercase mb-4 text-slate-400 tracking-widest">Executive Support</h3>
              <div className="space-y-2">
                {[
                  { name: "Ms. Sapna", dept: "Transport", call: "+91 97910 07710" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-white border border-slate-100">
                    <div>
                      <span className="text-[7px] font-black text-blue-600 uppercase block leading-none">{item.dept}</span>
                      <p className="text-[11px] font-black text-slate-800 uppercase italic mt-1">{item.name}</p>
                    </div>
                    <a href={`tel:${item.call}`} className="text-[10px] font-black bg-slate-900 text-white px-3 py-1.5 hover:bg-blue-600 transition-colors tracking-tighter">{item.call}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- MAP SECTION --- */}
        <div className="mt-12 relative group overflow-hidden border-8 border-white shadow-2xl h-[400px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.643798934571!2d80.24584217585573!3d13.058359487265148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52664650567e91%3A0xc0787e816a751662!2sExpress%20Travel%20Corp%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale group-hover:grayscale-0 transition-all duration-1000"
          ></iframe>
        </div>

        {/* --- REGIONAL OFFICES (ALIGNED TO CENTER) --- */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Regional <span className="text-blue-600">Network</span></h2>
            <div className="h-1.5 w-16 bg-blue-600 mx-auto mt-2"></div>
          </div>
          
          {/* Aligned specifically for 2 branches to stay in the center */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto justify-center">
            {branches.map((branch, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -5 }} 
                className="relative h-80 overflow-hidden shadow-lg border-b-8 border-blue-600 group"
              >
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60 transition-transform duration-500 group-hover:scale-110" 
                  style={{ backgroundImage: `url('${branch.image}')` }}
                ></div>

                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

                <div className="relative z-20 h-full p-8 flex flex-col justify-end text-white">
                  <h4 className="font-black text-2xl uppercase mb-2 italic tracking-tight">{branch.city}</h4>
                  <p className="text-[10px] md:text-[11px] leading-relaxed font-bold uppercase mb-4 opacity-90 max-w-xs">{branch.address}</p>
                  <div className="pt-3 border-t border-white/20 flex items-center justify-between text-blue-400 font-black text-[9px] uppercase tracking-widest cursor-pointer group-hover:text-white transition-colors">
                    <span>Contact Branch</span>
                    <Globe size={14}/>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;