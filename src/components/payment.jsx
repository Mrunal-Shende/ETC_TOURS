import React from 'react';

const MembershipCarousel = () => {
  const carouselLogos = [
    { src: "/Certification/ministry.jpeg", alt: "Ministry of Tourism", name: "Government of India." },
    { src: "/Certification/1.jpg", alt: "IATO", name: "Recognized by Ministry of Tourism Government of India." },
    { src: "/Certification/2.jpg", alt: "ITTA", name: "Affiliations: IATO- Indian Association of Tour Operators." },
    { src: "/Certification/nla.jpeg", alt: "NLA", name: "Member - National Limousine Association." },
    { src: "/Certification/3.png", alt: "SKAL", name: "Member - SKAL International." },
    { src: "/Certification/india.jpeg", alt: "India Map", name: "All India Car Rental" },
  ];

  const scrollItems = [...carouselLogos, ...carouselLogos];

  return (
    <section className="bg-white py-6 overflow-hidden border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <h2 className="text-blue-600 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">
          Memberships & Certifications
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="flex animate-membership-scroll whitespace-nowrap gap-4 py-2">
          {scrollItems.map((logo, index) => (
            <div 
              key={index} 
              // Width ko 300px se kam karke 180px-220px kar diya hai
              className="flex-shrink-0 flex flex-col items-center w-[180px] md:w-[220px]"
            >
              {/* Card Container: Height 160px se kam karke 100px kar di hai */}
              <div className="w-full h-[100px] bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center p-4 mb-3 transition-all duration-300 group-hover:border-blue-100">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="max-h-full max-w-full object-contain block" 
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              
              {/* Caption Text: Font size aur chota kiya hai */}
              <p className="text-[9px] md:text-[10px] text-slate-700 font-semibold uppercase tracking-tight text-center whitespace-normal px-2 leading-tight">
                {logo.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes membership-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-membership-scroll {
          animation: membership-scroll 25s linear infinite;
          display: flex;
          width: max-content;
        }
        .group:hover .animate-membership-scroll {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};

export default MembershipCarousel;