import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Globe, ShieldCheck, Clock, Star, X, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactUs = () => {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const branches = [
    { 
      city: "Chennai (HEAD OFFICE)", 
      address: "No.20, Duraisamy Street, Nungambakkam, Chennai-600034", 
      phone: "+91-44-2827 2279 / 4203 7171",
      email: "bookings@expresstravelcorp.com",
      status: "Operational 24/7",
      image: "/Chennai.jpeg" 
    },
    { 
      city: "Bangalore", 
      address: "37/17, MEANEE AVENUE TANK ROAD ULSOOR BANGALORE-560042", 
      phone: "+91 7200091167",
      email: "bookings@expresstravelcorp.com",
      status: "Operational 24/7",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=800" 
    },
    { 
      city: "Pune", 
      address: "KHANDAVEWASTI, LOHAGAON RD INFRONT OF WELL, KALWAD PUNE 411032", 
      phone: "+91 86011 40561",
      email: "bookings@expresstravelcorp.com",
      status: "Operational 24/7",
      image: "/pune1.jpeg" 
    },
    { 
      city: "Bhopal", 
      address: "Flat n 5 Shri Ram complex Shri Ram colony hoshangabad road Bhopal (462026)", 
      phone: "+91 7200091168",
      email: "bookings@expresstravelcorp.com",
      status: "Operational 24/7",
      image: "/bhopal.jpeg" 
    },
    { 
      city: "New Delhi", 
      address: "PLOT NO.A-17 HOUSE NO.101 UG FLOOR BLOCK A POCHANPUR EXT.SECTOR 23 DWARKA NEW DELHI 110077", 
      phone: "+91 7845103222",
      email: "bookings@expresstravelcorp.com",
      status: "Operational 24/7",
      image: "/India Gate.jpeg" 
    },
    { 
      city: "Hyderabad", 
      address: "1st Floor Plot No. 20 VIP Hills, Capital Park Road, Madhapur, Hyderabad 500081", 
      phone: "+91-97-9111-1275",
      email: "bookings@expresstravelcorp.com",
      status: "Operational 24/7",
      image: "/Hyderabad.jpeg" 
    },
    { 
      city: "Nagpur", 
      address: "24 H I G , Flat No.C/2, Opp. RTO Office, Giripeth Nagpur, Maharashtra 440010", 
      phone: "+91-9791007710",
      email: "bookings@expresstravelcorp.com",
      status: "Operational 24/7",
      image: "https://images.unsplash.com/photo-1623158021074-68f7b76774e1?q=80&w=800" 
    },
    { 
      city: "Puducherry", 
      address: "St Anthony Koil St, Kavery Nagar, Reddiarpalayam, Puducherry, 605010", 
      phone: "+91-9786628662",
      email: "bookings@expresstravelcorp.com",
      status: "Operational 24/7",
      image: "/Puducherry.jpeg" 
    }
  ];

  const scrollBranches = [...branches, ...branches];

  const handleManualScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#fcfdfe] min-h-screen font-sans text-slate-800 selection:bg-blue-100 overflow-x-hidden">
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scroll-container {
          display: flex;
          width: max-content;
          animation: scroll 80s linear infinite;
        }
        .scroll-wrapper:hover .scroll-container {
          animation-play-state: paused;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (max-width: 768px) {
            .scroll-container { animation-duration: 40s; }
        }
      `}</style>

      {/* --- SECTION 1: HERO SECTION --- */}
      <div className="relative w-full h-screen bg-[#0f172a] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105" style={{ backgroundImage: "url('/contact1.jpeg')" }}></div>
        <div className="absolute inset-0 z-10 bg-black/40"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0f172a]/70 via-transparent to-[#0f172a]/40"></div>
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex flex-col items-center mb-8 px-5 py-2 border border-white/10 backdrop-blur-md bg-white/5 mt-6 md:mt-8">
            <span className="text-white font-serif text-xl md:text-2xl font-bold tracking-tight italic">Incredible <span className="text-blue-500 font-sans not-italic">!</span>ndia</span>
            <span className="text-[7px] md:text-[8px] text-blue-400 font-black uppercase tracking-[0.3em] mt-1">Recognized by Ministry of Tourism</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">
            Connect <br /> <span className="text-blue-600 not-italic">With Us</span>
          </motion.h1>
        </div>
      </div>

      {/* FLOATING STATS */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 -mt-8 relative z-40 grid grid-cols-2 md:grid-cols-4 gap-1">
        {[{ icon: <Clock size={12}/>, label: "24/7 Support" }, { icon: <Globe size={12}/>, label: "Pan India" }, { icon: <ShieldCheck size={12}/>, label: "Secured" }, { icon: <Star size={12}/>, label: "Premium" }].map((stat, i) => (
          <div key={i} className="bg-white/95 backdrop-blur-xl p-2.5 border border-slate-100 shadow-lg flex items-center justify-center gap-2">
            <div className="text-blue-600">{stat.icon}</div>
            <span className="text-[7px] font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12 relative z-30 pb-16">
        <div className="grid lg:grid-cols-12 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-7 bg-white p-6 md:p-8 shadow-xl border-t-8 border-blue-600">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-6">Quick <span className="text-blue-600">Enquiry</span></h2>
            <form className="grid md:grid-cols-2 gap-6">
              <input type="text" className="bg-transparent border-b-2 border-slate-200 py-2 text-sm outline-none focus:border-blue-600 transition-all font-bold uppercase" placeholder="Full Name" />
              <input type="email" className="bg-transparent border-b-2 border-slate-200 py-2 text-sm outline-none focus:border-blue-600 transition-all font-bold uppercase" placeholder="Email Address" />
              <textarea rows="2" className="md:col-span-2 bg-transparent border-b-2 border-slate-200 py-2 text-sm outline-none focus:border-blue-600 transition-all font-bold resize-none uppercase" placeholder="How can we assist?"></textarea>
              <button type="button" onClick={() => navigate('/enquery')} className="md:col-span-2 bg-blue-600 hover:bg-slate-900 text-white font-black py-4 uppercase tracking-[0.3em] text-[10px] shadow-xl transition-all flex items-center justify-center gap-2">Send Request <Send size={14}/></button>
            </form>
          </motion.div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0f172a] text-white p-6 border-l-8 border-blue-600 shadow-xl">
              <h3 className="text-lg font-black uppercase italic mb-4">Chennai Headquarters</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <MapPin className="text-blue-500 shrink-0" size={20} />
                  <div className="text-[11px] leading-snug text-slate-300">
                    <b className="text-white block text-sm mb-1 uppercase italic">Express Travel Corporate Pvt Ltd</b>
                    Regd. Office Express Building No.20, Duraisamy Street, Nungambakkam, Chennai-600034
                  </div>
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
                <div className="flex justify-between items-center p-3 bg-white border border-slate-100">
                  <div>
                    <span className="text-[7px] font-black text-blue-600 uppercase block leading-none">Transport</span>
                    <p className="text-[11px] font-black text-slate-800 uppercase italic mt-1">Ms. Sapna</p>
                  </div>
                  <a href="tel:+919791007710" className="text-[10px] font-black bg-slate-900 text-white px-3 py-1.5 hover:bg-blue-600 transition-colors tracking-tighter">+91 97910 07710</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MAP SECTION (RESTORED WITH MARKER) --- */}
        <div className="mt-12 relative group overflow-hidden border-8 border-white shadow-2xl h-[300px] md:h-[400px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.581585642938!2d80.2389146!3d13.0623146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52665e7c08f1ad%3A0x7cc7af15e1034490!2s20%2C%20Duraiswamy%20St%2C%20Tirumurthy%20Nagar%2C%20Nungambakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600034!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* --- REGIONAL NETWORK CAROUSEL (India Tour UI) --- */}
        <div className="mt-20 relative scroll-wrapper">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">Regional <span className="text-blue-600">Network</span></h2>
            <div className="h-1.5 w-16 bg-blue-600 mx-auto mt-2"></div>
          </div>
          
          <button onClick={() => handleManualScroll('left')} className="absolute left-0 top-[40%] -translate-y-1/2 z-50 bg-white/90 p-2 shadow-lg border border-slate-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all rounded-full"><ChevronLeft size={32} /></button>
          <button onClick={() => handleManualScroll('right')} className="absolute right-0 top-[40%] -translate-y-1/2 z-50 bg-white/90 p-2 shadow-lg border border-slate-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all rounded-full"><ChevronRight size={32} /></button>

          <div ref={scrollRef} className="relative flex overflow-x-auto no-scrollbar px-2 md:px-10">
            <div className="scroll-container py-10">
              {scrollBranches.map((branch, idx) => (
                <div key={idx} onClick={() => setSelectedBranch(branch)} className="flex flex-col items-center text-center h-full mx-5 w-[280px] md:w-[320px] shrink-0">
                  
                  <div className="w-full aspect-[5/4] overflow-hidden border-[6px] border-white shadow-sm ring-1 ring-gray-100 mb-6 cursor-pointer group">
                    <img src={branch.image} alt={branch.city} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  <h2 className="text-slate-800 font-bold text-lg uppercase tracking-[0.2em] mb-4">{branch.city}</h2>
                  
                  <p className="text-slate-500 text-[11px] leading-relaxed font-medium mb-6 px-4 line-clamp-2 flex-1 uppercase tracking-tight">
                    {branch.address}
                  </p>

                  <button className="mt-auto border border-slate-800 text-slate-800 px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 hover:text-white transition-all duration-300">
                    View Details
                  </button>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- POP-UP MODAL --- */}
      <AnimatePresence>
        {selectedBranch && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedBranch(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto md:overflow-hidden relative shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedBranch(null)} className="absolute top-2 right-2 md:top-4 md:right-4 z-[110] bg-white md:bg-slate-100 p-2 hover:bg-blue-600 hover:text-white transition-colors shadow-md rounded-full"><X size={20}/></button>
              <div className="grid md:grid-cols-2 items-stretch min-h-0 md:min-h-[550px]">
                <div className="h-56 md:h-full bg-slate-900 relative">
                  <img src={selectedBranch.image} alt={selectedBranch.city} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-slate-900 to-transparent">
                    <span className="text-blue-400 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] mb-2">Location Profile</span>
                    <h2 className="text-white text-2xl md:text-4xl font-black uppercase italic leading-tight">{selectedBranch.city}</h2>
                  </div>
                </div>
                <div className="p-6 md:p-10 space-y-6 md:space-y-8 flex flex-col justify-center bg-white">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-1">Status</span>
                      <span className="text-green-600 font-black text-xs md:text-sm flex items-center gap-1"><CheckCircle size={16}/> {selectedBranch.status}</span>
                    </div>
                    <button onClick={() => navigate('/enquery')} className="w-full md:w-auto bg-blue-600 text-white text-[10px] md:text-[11px] font-black px-6 py-3 uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg active:scale-95">Send Enquiry</button>
                  </div>
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex gap-4"><MapPin className="text-blue-600 shrink-0" size={24}/><p className="text-xs md:text-[14px] font-bold text-slate-600 leading-relaxed uppercase">{selectedBranch.address}</p></div>
                    <div className="flex gap-4 border-t border-slate-100 pt-4 md:pt-6"><Phone className="text-blue-600 shrink-0" size={24}/><div><span className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase block mb-1">Direct Line</span><p className="text-sm md:text-lg font-black text-slate-900">{selectedBranch.phone}</p></div></div>
                    <div className="flex gap-4 border-t border-slate-100 pt-4 md:pt-6"><Mail className="text-blue-600 shrink-0" size={24}/><div><span className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase block mb-1">Official Email</span><p className="text-sm md:text-lg font-black text-blue-600 lowercase break-all">{selectedBranch.email}</p></div></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactUs;