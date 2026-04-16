import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, Users, ShieldCheck, Globe, Award
} from 'lucide-react';

const carouselLogos = [
  { src: '/1.jpg', alt: "IATO" },
  { src: '/2.jpg', alt: "ITTA" },
  { src: '/3.png', alt: "SKAL" },
  { src: '/4.jpg', alt: "CC Avenue" }
];

const AboutUsETC = () => {
  const services = [
    "India Tours (Domestic)",
    "Inbound Tours",
    "International Tours",
    "Group/Customized Tours",
    "Luxury Car/Coach Rentals",
    "Hotel Bookings",
    "Wedding Events",
    "Air Ticketing",
    "MICE (Meetings, Incentives, Conferences & Events)",
    "Cruises",
    "Visa",
    "Passport",
    "Forex"
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] md:h-[95vh] flex flex-col items-center justify-center pt-[140px] md:pt-[160px]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/backgroundAbout.jpeg" 
            className="w-full h-full object-cover"
            alt="Travel Background"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-2 justify-center">
              <div className="h-[2px] w-6 md:w-10 bg-white"></div>
              <span className="text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] font-black uppercase tracking-[0.3em] text-[10px] md:text-sm">
                Est. since 1999
              </span>
              <div className="h-[2px] w-6 md:w-10 bg-white"></div>
            </div>

            <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-black uppercase leading-[1.1] md:leading-[0.9] mb-2 tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
              EXPRESS TRAVEL <br /> 
              <span className="text-blue-600">CORPORATE</span> <br /> 
              <span className="text-white">SERVICES Pvt Ltd</span>
            </h1>

            <div className="max-w-3xl border-t border-white/30 pt-8 mb-2">
              <p className="text-gray-100 text-sm md:text-xl leading-relaxed italic font-medium px-2 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                "Synonymous with leisure and business travel. We provide a superior total travel management service of premium quality."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

    {/* --- NEW SECTION: COMPANY PHILOSOPHY --- */}
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
    .glide-left, .glide-right {
      display: inline;
      opacity: 0;
    }
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

      {/* --- COMPACT SPECIAL INTEREST TOURISM --- */}
      <section className="py-12 md:py-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-5 text-center md:text-left order-2 md:order-1"
          >
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#001F7A] uppercase tracking-tighter leading-tight">
                Specialists in <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0033CC] to-[#00D1FF]">
                  Luxury Tours
                </span>
              </h2>
              <div className="h-1 w-16 bg-[#00D1FF] rounded-none mx-auto md:mx-0"></div>
            </div>

            <div className="space-y-3">
              <p className="text-slate-700 leading-snug text-sm md:text-base font-medium">
                ETC specializes in Luxury and Special Interest Tours with focus on:
              </p>
              
              <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                {["Ayurveda", "Yoga", "Wildlife", "Textiles", "Jewellery", "Art & Crafts", "Architecture"].map((item, i) => (
                  <span key={i} className="px-2.5 py-0.5 bg-slate-50 border border-slate-200 rounded-none text-[9px] md:text-[10px] font-bold text-[#0033CC] uppercase tracking-wider">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed italic border-l-4 border-[#0033CC] pl-4">
              "Expect the best of tour programmes for traditionally most frequented destinations and beyond."
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { t: "South India", d: "Temple & Ayurveda", color: "bg-orange-50/50" },
                { t: "North India", d: "Golden Triangle", color: "bg-blue-50/50" },
                { t: "Kashmir & Hills", d: "Paradise & Himalayas", color: "bg-emerald-50/50" },
                { t: "Pan India", d: "Exotic Destinations", color: "bg-purple-50/50" }
              ].map((item, i) => (
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  key={i} 
                  className={`flex flex-col p-3.5 ${item.color} rounded-none border-b-2 border-[#0033CC] shadow-sm transition-all`}
                >
                  <span className="font-black text-[#001F7A] text-xs md:text-sm uppercase tracking-tight">{item.t}</span>
                  <span className="text-[9px] text-slate-500 font-bold leading-tight">{item.d}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative h-[300px] md:h-[420px] order-1 md:order-2"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0033CC] to-[#00D1FF] rotate-3 rounded-none opacity-10 scale-105"></div>
            <div className="absolute inset-0 overflow-hidden rounded-none shadow-xl border-2 border-white">
              <img src="/mal.jpg" className="w-full h-full object-cover" alt="Culture India" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICE SPECTRUM ---
      <section className="relative py-16 px-4 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
              SERVICE <span className="text-blue-700">SPECTRUM</span>
            </h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-4 shadow-sm"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center flex flex-col items-center justify-center min-h-[160px] md:min-h-[180px] shadow-lg overflow-hidden"
              >
                <div className="mb-4 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <ChevronRight className="text-white" size={18} />
                </div>
                <h4 className="text-[11px] md:text-[13px] font-extrabold uppercase tracking-wider text-white leading-snug">
                  {service}
                </h4>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-b-2xl"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

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

      {/* --- CAROUSEL ---
      <section className="bg-white py-12 overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-blue-600 font-black tracking-[0.3em] uppercase text-[12px] md:text-[14px] italic">
              Memberships & Secure Payments
            </p>
          </div>
          <div className="relative flex overflow-x-hidden group">
            <div className="flex animate-scroll whitespace-nowrap gap-8 py-4">
              {[...carouselLogos, ...carouselLogos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 bg-white p-4 border border-slate-100 flex items-center justify-center h-24 w-44 shadow-sm">
                  <img src={logo.src} alt={logo.alt} className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-scroll { animation: scroll 30s linear infinite; display: flex; width: max-content; }
          .group:hover .animate-scroll { animation-play-state: paused; }
        `}} />
      </section> */}
    </div>
  );
};

export default AboutUsETC;