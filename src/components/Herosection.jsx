import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    img: "agra.jpg",
    title: "AGRA",
    sub: "Witness the timeless beauty of the Taj Mahal. A symbol of eternal love and a masterpiece of Mughal architecture."
  },
  {
    img: "kerla.jpg",
    title: "KERALA",
    sub: "Escape to God's Own Country. Experience the tranquil backwaters and lush tea plantations."
  },
  {
    img: "/pondi.webp",
    title: "MUMBAI",
    sub: "Experience the city that never sleeps. From the colonial charm of Gateway of India to the dazzling Queen's Necklace at Marine Drive."
  },
  {
    img: "/jaipur.jpg",
    title: "JAIPUR",
    sub: "Explore the Pink City's royal heritage. Majestic forts and Rajputana history await you."
  }
];

const Herosection = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Automatic Slide Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[75vh] md:h-[95vh] overflow-hidden font-sans bg-black">
      {/* --- BACKGROUND SLIDESHOW --- */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          <img
            src={slide.img}
            alt={slide.title}
            className={`w-full h-full object-cover transform transition-transform duration-[7000ms] ease-out ${
              index === current ? "scale-110" : "scale-100"
            }`}
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70"></div>
        </div>
      ))}

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 pt-10">
        {/* Key property on this div ensures animation restarts on slide change */}
        <div key={current} className="flex flex-col items-center">
          <span className="text-blue-500 font-black tracking-[0.4em] text-[10px] md:text-xs mb-2 animate-slide-in uppercase">
            Explore Incredible India
          </span>
          
          <h1 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter animate-slide-in leading-none">
            {slides[current].title}
          </h1>
          
          <div className="h-1 w-20 bg-blue-500 my-4 animate-slide-in delay-100"></div>

          <p className="text-gray-100 text-xs md:text-lg max-w-xl font-bold leading-relaxed animate-slide-in delay-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {slides[current].sub}
          </p>
        </div>

        {/* BOOKING BUTTON */}
        <div className="z-30 mt-8">
            <button 
              onClick={() => navigate('/enquiry')} 
              className="px-10 py-4 bg-blue-600 text-white font-black uppercase tracking-widest text-[11px] hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-2xl active:scale-95"
            >
              Book Your Trip
            </button>
        </div>
      </div>

      {/* --- NAVIGATION INDICATORS --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
                i === current ? "w-12 bg-blue-500" : "w-4 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          ></button>
        ))}
      </div>

      {/* --- STYLES --- */}
      <style>{`
        @keyframes slideIn {
          0% { transform: translateY(30px); opacity: 0; filter: blur(10px); }
          100% { transform: translateY(0); opacity: 1; filter: blur(0); }
        }
        .animate-slide-in { 
          animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
        .delay-100 { animation-delay: 0.15s; }
        .delay-200 { animation-delay: 0.3s; }
      `}</style>
    </section>
  );
};

export default Herosection;