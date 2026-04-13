import React from 'react';

const FleetHomeCTA = () => {
  return (
    <div className="pkg-root">
      {/* Background Decor - Optional: provides the subtle dot grid and blue glow */}
      <div className="pkg-ambient">
        <div className="pkg-orb pkg-orb-1" />
        <div className="pkg-dotgrid" />
      </div>

      <section className="relative z-10 bg-white font-sans text-[#1A202C] py-20 px-4 md:px-6 max-w-7xl mx-auto text-center">
        <div className="mb-4">
          <span className="text-blue-600 font-bold tracking-[0.2em] text-[10px] uppercase mb-1 block italic">
            Elite Transport
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
            Our <span className="text-blue-600">Rental</span> Fleet.
          </h2>
          <div className="w-12 h-0.5 bg-blue-600 mx-auto mt-3"></div>
        </div>

        <div className="flex justify-center mt-8">
          <a 
            href="https://www.etconline.in/luxury-car" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-blue-600 transition-all duration-300 shadow-xl"
          >
            Explore Full Fleet
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </section>

      <style>{`
        .pkg-root { position: relative; background: #fff; overflow: hidden; font-family: 'DM Sans', sans-serif; }
        .pkg-ambient { position: absolute; inset: 0; pointer-events: none; }
        .pkg-orb-1 { position: absolute; width: 560px; height: 560px; top: -100px; left: -160px; background: radial-gradient(circle, rgba(37,99,235,.06), transparent 70%); filter: blur(90px); }
        .pkg-dotgrid { position: absolute; inset: 0; background-image: radial-gradient(rgba(37,99,235,.05) 1px, transparent 1px); background-size: 26px 26px; }
      `}</style>
    </div>
  );
};

export default FleetHomeCTA;