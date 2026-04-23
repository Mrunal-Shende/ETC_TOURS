import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const features = [
  {
    title: "Ministry Recognized",
    desc: "Govt. of India approved travel partner since 1999.",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
      </svg>
    ),
  },
  {
    title: "Pan-India Expertise",
    desc: "Curated tours across Tamil Nadu, Kerala, Karnataka & Andhra Pradesh.",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
      </svg>
    ),
  },
  {
    title: "Corporate & Leisure",
    desc: "End-to-end travel management for individuals, families, and large groups.",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M20 6h-2.18c.07-.44.18-.86.18-1.3C18 2.99 16.54 2 15 2c-.88 0-1.61.39-2.13.97L12 4.69l-.87-.72C10.61 3.39 9.88 3 9 3 7.46 3 6 3.99 6 5.7c0 .44.11.86.18 1.3H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2z" />
      </svg>
    ),
  },
];

const FRONT_IMAGE = "/about1.jpeg";
const BACK_IMAGE = "https://i.pinimg.com/1200x/19/fc/fb/19fcfbb5debcb7d95a5f73a556a54b39.jpg";

const AboutSection = () => {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);
  
  // Ref for scroll tracking
  const containerRef = useRef(null);
  // useInView will trigger when 40% of the section is visible
  const isInView = useInView(containerRef, { amount: 0.4 });

  // Flip the card when scrolled into view
  useEffect(() => {
    if (isInView) {
      setFlipped(true);
    } else {
      setFlipped(false);
    }
  }, [isInView]);

  return (
    <section
      id="about"
      ref={containerRef}
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      className="relative w-full bg-white py-10 md:py-16 overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[480px] h-[480px] opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 480 480" fill="none">
          <circle cx="240" cy="240" r="240" fill="#1e3a5f" />
          <circle cx="240" cy="240" r="160" stroke="#1e3a5f" strokeWidth="1" fill="none" />
          <circle cx="240" cy="240" r="80" stroke="#1e3a5f" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT: 3D Flip Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            // CHANGE 1: Increase max-w- to give it more width
            className="relative w-full max-w-[600px] mx-auto lg:mx-0"
          >
            <div
              className="relative w-full cursor-pointer"
              // CHANGE 2: Adjust aspect-ratio to make the box overall larger (4/3 -> 3/2)
              style={{ perspective: '1500px', aspectRatio: '2/2' }}
              // Desktop hover support
              onMouseEnter={() => setFlipped(true)}
              onMouseLeave={() => setFlipped(false)}
              // Mobile tap support
              onClick={() => setFlipped(!flipped)}
            >
              <motion.div
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
              >
                {/* FRONT */}
                <div
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  className="absolute inset-0 overflow-hidden rounded-xl shadow-lg"
                >
                  <img
                    src={FRONT_IMAGE}
                    alt="India Tour Experience"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="text-lg font-semibold leading-snug">
                      Crafting Journeys Since 1999
                    </p>
                  </div>
                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm border border-white/25 px-3 py-2 rounded-lg">
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.25em' }} className="text-white uppercase opacity-70 mb-0.5">Established</p>
                    <p className="text-white text-xl font-bold leading-none">1999</p>
                  </div>
                </div>

                {/* BACK */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    backgroundImage: `url(${BACK_IMAGE})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  className="absolute inset-0 rounded-xl flex flex-col justify-center items-center p-6 text-center shadow-xl overflow-hidden"
                >
                  {/* Overlay for better text visibility */}
                  <div className="absolute inset-0 bg-[#0f2744]/80 z-0" />

                  <div className="relative z-10">
                    <div className="mb-4">
                      <div className="w-10 h-10 mx-auto mb-3 rounded-full border border-white/20 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                        </svg>
                      </div>
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '0.25em' }} className="text-blue-300 uppercase mb-2">
                        Ministry of Tourism Recognized
                      </p>
                      <p className="text-white text-lg font-semibold leading-snug mb-2">
                        Top India Tour Packages
                      </p>
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', lineHeight: '1.6' }} className="text-white/80">
                        Dedicated to unforgettable journeys with superior service — from a single traveller to large corporate groups.
                      </p>
                    </div>
                    <div className="flex gap-5 mt-1 justify-center">
                      {[['25+', 'Years'], ['10K+', 'Clients'], ['24/7', 'Support']].map(([num, label]) => (
                        <div key={label} className="text-center">
                          <p className="text-white text-base font-bold leading-none">{num}</p>
                          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px' }} className="text-white/50 mt-1 uppercase tracking-wider">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            {/* Decorative boxes */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600/5 rounded-xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-slate-100 rounded-xl -z-10" />
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-blue-600 inline-block" />
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '0.3em' }} className="text-blue-600 uppercase font-semibold">
                About Us
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Why Choose <br />
              <span className="text-blue-600 italic">Us?</span>
            </h2>

            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', lineHeight: '1.8' }} className="text-slate-500 max-w-md">
              Based in Chennai and recognized by the Government of India, we deliver
              seamless travel experiences across South India — blending cultural depth,
              personalised service, and flawless logistics since 1999.
            </p>

            <div className="h-px w-full bg-slate-100" />

            <div className="flex flex-col gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3.5"
                >
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="scale-90 flex items-center justify-center">{f.icon}</div>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 600 }} className="text-slate-800 mb-0.5">
                      {f.title}
                    </p>
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', lineHeight: '1.6' }} className="text-slate-400">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/about')}
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '0.2em' }}
                className="bg-blue-600 text-white px-7 py-3 uppercase tracking-widest font-semibold rounded-sm hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;