import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Image Imports
import backgroundImg from '/image/background.png';
import TransportationImg from '/image/Transportation.jpeg';
import HotelsImg from '/image/Hotels.jpeg';
import WeddingImg from '/image/Wedding.jpeg';
import FlightsImg from '/image/Flights.jpeg';
import MiceImg from '/image/Mice.jpeg';
import CruisesImg from '/image/Cruises.jpeg';
import VisaImg from '/image/Visa.jpeg';
import PassportImg from '/image/Passport.jpeg';
import ForexImg from '/image/Forex.jpeg';

const Services = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedServiceForForm, setSelectedServiceForForm] = useState(null);
  const [flippedCard, setFlippedCard] = useState(null);

  const services = [
    { title: "Transportation", desc: "Your choice of cars and reliable services at the best available prices.", img: TransportationImg },
    { title: "Hotels", desc: "Get the best hotel deals with our assurance of premium quality service.", img: HotelsImg },
    { title: "Wedding Events", desc: "Every wedding we undertake is a unique package designed for your perfect day.", img: WeddingImg },
    { title: "Flights", desc: "Time your flights to suit your holiday itinerary and eliminate delays.", img: FlightsImg },
    { title: "MICE", desc: "Specialized niche of group tourism dedicated to planning and facilitating conferences.", img: MiceImg },
    { title: "Cruises", desc: "Find the right package and set sail for your dream cruise vacation.", img: CruisesImg },
    { title: "Visa", desc: "Expert assistance in navigating international travel documentation.", img: VisaImg },
    { title: "Passport", desc: "Facilitating appointments and documentation for swift passport processing.", img: PassportImg },
    { title: "Forex", desc: "Authorized RBI retail forex dealers providing seamless currency solutions.", img: ForexImg }
  ];

  const handleInquiryClick = (service) => {
    setSelectedServiceForForm(service);
    setIsDrawerOpen(true);
  };

  const handleCardFlip = (index) => {
    if (window.innerWidth < 1024) {
      setFlippedCard(flippedCard === index ? null : index);
    }
  };

  return (
    <div className="bg-white text-slate-900 font-sans overflow-x-hidden">

      {/* --- HERO SECTION --- */}
      <section className="relative h-[95vh] min-h-[400px] flex items-center justify-center pt-10 overflow-hidden bg-[#0a2339]">
        <div className="absolute inset-0 z-0">
          <img src={backgroundImg} className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1.5px] w-8 md:w-12 bg-white/40"></div>
              <span className="text-[11px] md:text-sm font-black text-white tracking-[0.4em] uppercase opacity-90">Est. Since 1999</span>
              <div className="h-[1.5px] w-8 md:w-12 bg-white/40"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[1] mb-6">
              <span className="text-white block">Our</span>
              <span className="text-blue-300 block">Services</span>
            </h1>
            <div className="h-[2px] w-12 bg-blue-300 mb-6 mx-auto"></div>
            <p className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] max-w-[250px] md:max-w-full mx-auto leading-relaxed">
              Premium Total Travel <br className="md:hidden" /> Management Solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICE GRID --- */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="mb-10 md:mb-16 border-l-4 border-blue-600 pl-4 md:pl-6">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">
              World-Class <span className="text-blue-600">Solutions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group h-[420px] md:h-[380px] w-full [perspective:1200px] cursor-pointer"
                onClick={() => handleCardFlip(index)}
              >
                {/* ✅ Pure CSS flip for desktop, state-based for mobile */}
                <div
                  className={`relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700 ease-in-out
                    lg:group-hover:[transform:rotateY(180deg)]
                    ${flippedCard === index ? '[transform:rotateY(180deg)]' : ''}
                  `}
                >
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] overflow-hidden shadow-xl rounded-2xl">
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <h3 className="text-white text-xl md:text-2xl font-black uppercase tracking-tight mb-4">{service.title}</h3>
                      <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-white uppercase tracking-[0.2em] bg-blue-600 py-2.5 px-5 w-fit">
                        Explore Details <span>→</span>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="absolute inset-0 h-full w-full [transform:rotateY(180deg)] [backface-visibility:hidden] bg-[#0f172a] backdrop-blur-xl border border-white/10 p-10 flex flex-col justify-center text-left shadow-2xl rounded-2xl">
                    <h3 className="text-white text-xl md:text-2xl font-black uppercase tracking-tight mb-4">
                      {service.title}
                    </h3>

                    <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-8 font-medium">
                      {service.desc}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInquiryClick(service);
                      }}
                      className="group relative w-full bg-blue-500 text-white px-8 py-4 text-[11px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-400 active:scale-95"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Confirm Inquiry <span>→</span>
                      </span>
                      <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 opacity-10"></div>
                    </button>

                    <div className="mt-8 border-t border-white/10 pt-4">
                      <p className="text-[8px] text-white/40 uppercase tracking-[0.4em] font-bold">
                        Express Travel Corporate Services
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FORM MODAL --- */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-slate-950/90 z-[160] backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="fixed inset-0 m-auto h-fit w-[95%] max-w-lg bg-white z-[170] shadow-2xl overflow-hidden border-t-8 border-blue-600"
            >
              <div className="p-8 md:p-12 flex flex-col">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900">
                    Service <span className="text-blue-600">Inquiry</span>
                  </h2>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-[10px] font-black border-2 border-slate-200 px-4 py-2 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                  >
                    CLOSE ✕
                  </button>
                </div>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Inquiry Sent!'); setIsDrawerOpen(false); }}>
                  <div className="group border-l-4 border-slate-100 focus-within:border-blue-600 bg-slate-50 p-4 transition-all">
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-1">Requested Service</label>
                    <input readOnly value={selectedServiceForForm?.title || "General Inquiry"} className="w-full bg-transparent outline-none font-bold text-blue-600 text-sm" />
                  </div>

                  <div className="group border-l-4 border-slate-100 focus-within:border-blue-600 bg-slate-50 p-4 transition-all">
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-1">Full Name</label>
                    <input required type="text" className="w-full bg-transparent outline-none font-bold text-slate-900 placeholder:text-slate-300 text-sm uppercase" placeholder="E.G. JOHN DOE" />
                  </div>

                  <div className="group border-l-4 border-slate-100 focus-within:border-blue-600 bg-slate-50 p-4 transition-all">
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-1">Phone Number</label>
                    <input required type="tel" className="w-full bg-transparent outline-none font-bold text-slate-900 placeholder:text-slate-300 text-sm" placeholder="+91 XXXXX XXXXX" />
                  </div>

                  <button type="submit" className="w-full bg-slate-900 text-white py-5 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-blue-600 transition-all shadow-lg">
                    Submit Request Now
                  </button>
                </form>

                <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Urgent Support</p>
                    <p className="text-lg font-black text-slate-900">+91 98408 87777</p>
                  </div>
                  <div className="px-4 py-2 bg-blue-50 border border-blue-100">
                    <p className="text-[9px] font-black text-blue-600 uppercase tracking-tighter">Verified Agency</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;