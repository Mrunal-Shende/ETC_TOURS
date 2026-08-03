import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  { img: "agra.jpg",         title: "AGRA",      sub: "Home of the Taj Mahal, an eternal symbol of love." },
  { img: "Europe.jpeg",      title: "EUROPE",    sub: "Glide through Venice's iconic canals and romantic streets." },
  { img: "kerla.jpg",        title: "KERALA",    sub: "Tranquil backwaters, lush greens — God's Own Country." },
  { img: "singapore1.jpeg",  title: "SINGAPORE", sub: "A futuristic city where modernity meets nature." },
  { img: "/varansi.jpeg",    title: "VARANASI",  sub: "Ancient ghats and divine rituals on the sacred Ganges." },
  { img: "dubai3 (2).jpeg",  title: "DUBAI",     sub: "Towering skylines, golden deserts, and pure luxury." },
  { img: "/jaipur.jpg",      title: "JAIPUR",    sub: "Royal forts and palaces of the magnificent Pink City." },
  { img: "Beach.jpeg",       title: "MALDIVES",  sub: "Crystal waters and white sands — paradise redefined." },
];

const Herosection = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="relative w-full h-[75vh] md:h-[100vh] overflow-hidden font-sans bg-black">
      
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70"></div>
        </div>
      ))}

      <button 
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hidden md:flex group shadow-2xl"
        aria-label="Next Slide"
      >
        <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 pt-10">
        <div key={current} className="flex flex-col items-center">
          <span className="text-blue-400 font-black tracking-[0.4em] text-[10px] md:text-xs mb-2 animate-slide-in uppercase">
            Explore Incredible Destinations
          </span>
          
          <h1 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter animate-slide-in leading-none">
            {slides[current].title}
          </h1>
          
          <div className="h-1 w-20 bg-white/60 my-4 animate-slide-in delay-100"></div>

          <p className="text-gray-100 text-xs md:text-lg max-w-xl font-medium leading-relaxed animate-slide-in delay-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {slides[current].sub}
          </p>
        </div>

        {/* ✅ Ghost button — no blue, clean & premium */}
        <div className="z-30 mt-8">
          <button 
            onClick={() => navigate('/services')} 
            className="px-10 py-4 text-white font-black uppercase tracking-widest text-[11px] border-2 border-white/60 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300 shadow-lg active:scale-95"
          >
            Book Your Trip
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              i === current ? "w-12 bg-white" : "w-4 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          ></button>
        ))}
      </div>

      <style>{`
        @keyframes slideIn {
          0% { transform: translateY(30px); opacity: 0; filter: blur(10px); }
          100% { transform: translateY(0); opacity: 1; filter: blur(0); }
        }
        .animate-slide-in { animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 0.15s; }
        .delay-200 { animation-delay: 0.3s; }
      `}</style>
    </section>
  );
};

export default Herosection;