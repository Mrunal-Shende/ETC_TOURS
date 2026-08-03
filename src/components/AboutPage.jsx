import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, Globe, Award } from 'lucide-react';

const carouselLogos = [
  { src: '/1.jpg', alt: "IATO" },
  { src: '/2.jpg', alt: "ITTA" },
  { src: '/3.png', alt: "SKAL" },
  { src: '/4.jpg', alt: "CC Avenue" }
];

const AboutUsETC = () => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">

      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] md:h-[95vh] flex flex-col items-center justify-center pt-[80px] md:pt-[100px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/backgroundAbout.jpeg"
            className="w-full h-full object-cover"
            alt="Travel Background"
          />
          {/* Darker, richer overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-4 justify-center"
            >
              <div className="h-[2px] w-6 md:w-12 bg-white"></div>
              <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] font-black uppercase tracking-[0.35em] text-[10px] md:text-xs">
                Est. since 1999
              </span>
              <div className="h-[2px] w-6 md:w-12 bg-white"></div>
            </motion.div>

            {/* Main heading */}
            <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-[1.0] tracking-tighter drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)] mb-6">
              Express Travel <br />
              <span className="text-blue-500">Corporate</span> <br />
              Services Pvt Ltd
            </h1>

            {/* Subline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="h-[1px] w-10 bg-white/50"></div>
              <p className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-[0.2em] drop-shadow-md">
                India &amp; Worldwide · Travel Management Specialists
              </p>
              <div className="h-[1px] w-10 bg-white/50"></div>
            </motion.div>

            {/* Stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              {[
                { num: '25+', label: 'Years' },
                { num: '10K+', label: 'Travelers' },
                { num: '80+', label: 'Destinations' },
              ].map(({ num, label }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/25 px-5 py-2"
                  style={{ borderRadius: 0 }}
                >
                  <span className="text-white font-black text-base md:text-lg leading-none">{num}</span>
                  <span className="text-white/70 font-black uppercase tracking-widest text-[9px]">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10"></div>
      </section>

      {/* --- COMPANY PHILOSOPHY --- */}
      <section
        ref={(el) => {
          if (!el) return;
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                el.querySelector('.glide-left').style.animation = 'glideLeft 0.75s ease-out 0.2s forwards';
                el.querySelector('.glide-right').style.animation = 'glideRight 0.75s ease-out 0.2s forwards';
                observer.disconnect();
              }
            },
            { threshold: 0.3 }
          );
          observer.observe(el);
        }}
        className="py-16 bg-slate-50 border-y border-slate-100"
      >
        <style>{`
          @keyframes glideLeft {
            from { opacity: 0; transform: translateX(-40px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes glideRight {
            from { opacity: 0; transform: translateX(40px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          .glide-left, .glide-right { display: inline; opacity: 0; }
        `}</style>

        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Award className="mx-auto text-blue-600" size={40} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight"
            >
              Our Core Mission
            </motion.h2>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
              <span className="glide-left">
                Est. Since 1999, Express Travel Corporate Services Pvt Ltd has spent over a decade
                mastering the art of travel management. We cater to the global community—
              </span>
              <span className="glide-right">
                from individuals to large groups—with a steadfast commitment to personalized
                service, ensuring a seamless experience across every aspect of your journey.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* --- SPECIALISTS IN LUXURY TOURS --- */}
      <section className="py-10 md:py-14 bg-white overflow-hidden">
        <style>{`
          .glass-card {
            background: rgba(255, 255, 255, 0.55);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(255, 255, 255, 0.7);
            box-shadow: 0 8px 32px rgba(0, 31, 122, 0.10);
          }
          .glass-feat {
            background: rgba(255,255,255,0.45);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 51, 204, 0.12);
            border-left: 4px solid #0033CC;
            border-radius: 0;
          }
          .spec-bg-blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(60px);
            opacity: 0.13;
            pointer-events: none;
          }
        `}</style>

        {/* Soft background blobs for glass depth */}
        <div className="relative">
          <div className="spec-bg-blob" style={{ width: 420, height: 420, background: '#0033CC', top: -80, right: -100 }}></div>
          <div className="spec-bg-blob" style={{ width: 300, height: 300, background: '#00AAFF', bottom: 0, left: -80 }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">

          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <span className="text-blue-600 font-black tracking-[0.35em] uppercase text-[11px]">
              What We Offer
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[#001F7A] uppercase tracking-tighter mt-2 leading-tight">
              Specialists in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0033CC] to-[#00AAFF]">
                Luxury Tours
              </span>
            </h2>
            <div className="h-1 w-16 bg-[#0033CC] mx-auto mt-3"></div>
          </motion.div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* IMAGE CONTAINER — Switched from object-cover to object-contain to avoid truncation */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[350px] md:h-[520px] md:col-span-7 w-full"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0033CC] z-10"></div>

              <div className="absolute inset-0 overflow-hidden shadow-2xl border border-slate-200 bg-slate-50">
            <img src="/mal.jpg" className="w-full h-full object-cover object-center" alt="Luxury Tours" />                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Glass badge — bottom left */}
              <div
                className="absolute bottom-6 left-6 z-20 px-4 py-3 glass-card"
                style={{ borderLeft: '3px solid #0033CC' }}
              >
                <p className="text-[#001F7A] font-black uppercase tracking-wider text-xs">Est. 1999</p>
                <p className="text-slate-500 text-[10px] font-bold mt-0.5">25+ Years of Excellence</p>
              </div>
            </motion.div>

            {/* TEXT CONTAINER */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-5 md:col-span-5 w-full flex flex-col justify-center"
            >
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                ETC specializes in curating high-end travel experiences across India and the world — crafted for the discerning traveler who demands nothing but the finest.
              </p>

              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                From the snow-capped peaks of the Himalayas to the sun-drenched coastlines of Southeast Asia and the timeless grandeur of Europe — we bring every destination to life with meticulously planned itineraries.
              </p>

              <p
                className="text-slate-500 text-sm md:text-base leading-relaxed italic border-l-4 border-[#0033CC] pl-4"
                style={{ borderRadius: 0 }}
              >
                "Expect the best tour programmes for traditionally most frequented destinations and beyond."
              </p>

              {/* Feature list — glass style */}
              <div className="space-y-3 pt-1">
                {[
                  { icon: Globe, label: "Worldwide Destinations", desc: "India, Europe, Southeast Asia, Middle East, Africa & the Americas" },
                  { icon: Award, label: "Premium Standards", desc: "Luxury hotels, private transfers, VIP access & 24/7 support" },
                  { icon: Users, label: "Groups & Corporates", desc: "Expert coordination for families, associations & enterprise teams" },
                  { icon: ShieldCheck, label: "End-to-End Management", desc: "Visa, forex, insurance, ticketing & accommodation" },
                ].map(({ icon: Icon, label, desc }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-feat flex items-start gap-4 p-4"
                  >
                    <Icon className="text-[#0033CC] mt-0.5 shrink-0" size={20} />
                    <div>
                      <p className="font-black text-[#001F7A] text-sm uppercase tracking-tight">{label}</p>
                      <p className="text-slate-500 text-xs font-medium mt-0.5">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- INFRASTRUCTURE --- */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group min-h-[320px] flex flex-col justify-center p-6 md:p-8 rounded-[2rem] overflow-hidden bg-gray-200 text-white shadow-lg"
            >
              <div className="absolute inset-0 z-0">
                <img src="/new1.jpeg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="ETC Setup" />
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="text-white" size={24} />
                  <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Our Setup</h4>
                </div>
                <p className="text-[13px] md:text-sm leading-relaxed font-bold text-white drop-shadow-lg">
                  Backed by an efficient team of professionals and world-class systems, our infrastructure serves as the pillar of our growth, ensuring we maintain premium service standards while rapidly expanding our global clientele.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group min-h-[320px] flex flex-col justify-center p-6 md:p-8 rounded-[2rem] overflow-hidden bg-gray-200 text-white shadow-lg"
            >
              <div className="absolute inset-0 z-0">
                <img src="/new.jpeg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Quality Services" />
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="text-white" size={24} />
                  <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Quality Services</h4>
                </div>
                <p className="text-[13px] md:text-sm leading-relaxed font-bold text-white drop-shadow-lg">
                  We design exotic dreams by tailoring tours to your exact liking. From premium hotel reservations to seamless air ticketing, our reputation is built on the trust our customers place in our luxury travel solutions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUsETC;