import React from 'react';
import { Link } from 'react-router-dom';

const FloatingControls = () => {
  const officialNumber = "919791007710"; 

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2">
      
      {/* Inquiry Now */}
        <Link to="/enquiry" className="w-8 h-8 md:w-10 md:h-10 rounded-full shadow-2xl hover:scale-110 transition-transform group flex items-center justify-center relative">
        <span className="absolute right-12 bg-white text-slate-900 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-slate-100 whitespace-nowrap">Enquiry Now</span>
        <img src="/floating_icon/inquriy.png" alt="Inquiry" className="w-full h-full rounded-full z-10 relative object-cover" />
        <span className="absolute inset-0 rounded-full bg-blue-900 animate-ping opacity-60 scale-110"></span>
      </Link>

      {/* Call Us */}
      <a href={`tel:+${officialNumber}`} className="w-8 h-8 md:w-10 md:h-10 rounded-full shadow-2xl hover:scale-110 transition-transform group flex items-center justify-center relative">
        <span className="absolute right-12 bg-white text-slate-900 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-slate-100 whitespace-nowrap">Call Us</span>
        <img src="/floating_icon/call.png" alt="Call" className="w-full h-full rounded-full z-10 relative object-cover" />
        <span className="absolute inset-0 rounded-full bg-red-800 animate-ping opacity-60 scale-110"></span>
      </a>
      
      {/* WhatsApp */}
      <a href={`https://wa.me/${officialNumber}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full shadow-2xl hover:scale-110 transition-transform group flex items-center justify-center relative">
        <span className="absolute right-12 bg-white text-slate-900 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-slate-100 whitespace-nowrap">WhatsApp</span>
        <img src="/floating_icon/whatsapp.png" alt="WhatsApp" className="w-full h-full rounded-full z-10 relative object-cover" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-60 scale-110"></span>
      </a>
    </div>
  );
};

export default FloatingControls;