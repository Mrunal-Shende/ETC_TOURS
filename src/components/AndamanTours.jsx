import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Compass, MapPin, Clock, Calendar } from 'lucide-react';

/* ── Full Andaman Data with Itinerary Content ────────────────────────────── */
const andamanData = [
  {
    id: 'unlimited',
    title: 'ANDAMAN UNLIMITED',
    duration: '05 Nights/ 06 Days',
    route: 'Port Blair → Havelock → Port Blair',
    category: 'FULL EXPERIENCE',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80',
    pricing: { A: '50,310', B: '44,998', C: '33,389' },
    desc: 'The comprehensive island experience covering historical landmarks and coral reefs.',
    fullContent: {
      intro: "Welcome to the Emerald Islands. This 6-day journey is designed to immerse you in the deep history of Kalapani and the pristine blue waters of Swaraj Dweep.",
      motto: "EMERALD, BLUE AND YOU",
      subIntro: "A complete circuit of history, adventure, and relaxation.",
      list: [
        { name: "Cellular Jail & Sound Show", details: "Land at Port Blair and witness the heroic saga of the Indian freedom struggle at the historic Cellular Jail." },
        { name: "North Bay & Ross Island", details: "Explore the Coral Island (North Bay) for water sports and visit the ruins of Ross Island, the former British HQ." },
        { name: "Radhanagar Beach", details: "Travel to Havelock via Private Ferry and witness the sunset at Asia's best beach." },
        { name: "Elephant Beach Excursion", details: "Head to Elephant Beach for complimentary snorkeling and optional sea walking." },
        { name: "Departure", details: "Final shopping at Port Blair before heading to the airport with fond memories." }
      ],
      note: "Carry valid photo ID (not PAN Card) for jetty entries. Ferry timings are subject to weather."
    }
  },
  {
    id: 'glimpse',
    title: 'GLIMPSE of ANDAMAN',
    duration: '04 Nights/ 05 Days',
    route: 'Port Blair → Havelock → Elephant Beach',
    category: 'QUICK GETAWAY',
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80',
    pricing: { A: '44,730', B: '39,508', C: '28,499' },
    desc: 'Perfect short getaway focusing on the must-see spots of Havelock and Port Blair.',
    fullContent: {
      intro: "Short on time but want the best? This 5-day itinerary covers the iconic Radhanagar Beach and the historic Cellular Jail.",
      motto: "PARADISE IN A GLANCE",
      subIntro: "Maximum experience, minimum days.",
      list: [
        { name: "Arrival & Kalapani", details: "Check-in at Port Blair and visit the famous prison and evening light show." },
        { name: "Swaraj Dweep (Havelock)", details: "Morning ferry to Havelock. Afternoon at Beach No. 7 (Radhanagar)." },
        { name: "Elephant Beach", details: "Memorable excursion by sharing boat. Enjoy snorkeling and the high-reviewed beach side cafe." },
        { name: "Back to Port Blair", details: "Last morning at Havelock before taking the private ferry back to the capital." },
        { name: "Departure", details: "Breakfast and airport transfer." }
      ],
      note: "Beach No. 7 is closed for guests after sunset. Please adhere to ferry timelines."
    }
  },
  {
    id: 'royal',
    title: 'ANDAMAN ROYAL ESCAPE',
    duration: '05 Nights/ 06 Days',
    route: 'Port Blair → Havelock → Neil Island',
    category: 'LUXURY ESCAPE',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80',
    pricing: { A: '58,200', B: '51,400', C: '39,900' },
    desc: 'Premium luxury experience including the serene beaches of Neil Island.',
    fullContent: {
      intro: "Experience the royalty of the islands. This package includes high-end resorts and the tranquil silence of Neil Island.",
      motto: "THE ROYAL ISLANDER",
      subIntro: "Luxury stays and private experiences.",
      list: [
        { name: "Port Blair Luxury Arrival", details: "Stay at the finest properties like Lemon Tree or Mansha Palace." },
        { name: "Havelock Private Voyage", details: "Travel via premium private ferries like Makruzz or Nautika." },
        { name: "Elephant Beach Scuba", details: "The best spot for diving enthusiasts. Clear waters and vibrant corals." },
        { name: "Neil Island (Shaheed Dweep)", details: "Visit Bharatpur Beach and the Natural Bridge before heading back." },
        { name: "Final Departure", details: "Assisted check-out and luxury vehicle transfer to airport." }
      ],
      note: "Alcohol is strictly prohibited on Elephant Beach. Pack light for inter-island transfers."
    }
  }
];

const AndamanTours = () => {
  const [selectedPkg, setSelectedPkg] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPkg]);

  const scrollToLocation = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="bg-[#fcfdfe] min-h-screen font-sans text-slate-700 selection:bg-blue-100">
      <AnimatePresence mode="wait">
        {!selectedPkg ? (
          /* ── LEVEL 1: GRID VIEW (The 3 Main Package Cards) ── */
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Hero Section */}
            <div className="relative w-full h-[60vh] bg-[#0f172a] overflow-hidden flex items-center justify-center pt-16">
              <div className="absolute inset-0 z-0 bg-cover bg-center opacity-40 scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200')" }}></div>
              <div className="relative z-20 text-center px-6">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-4">
                    <span className="text-blue-400 font-black uppercase tracking-[0.4em] text-[10px]">Emerald Destinations</span>
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">ANDAMAN</h1>
                <p className="text-white/60 mt-4 max-w-lg mx-auto text-sm">Choose your perfect island itinerary from our curated selection.</p>
              </div>
            </div>

            {/* Package Grid */}
            <div className="max-w-6xl mx-auto px-6 py-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {andamanData.map((pkg) => (
                  <motion.div key={pkg.id} whileHover={{ y: -10 }} className="bg-white rounded-xl overflow-hidden shadow-xl border border-slate-100 flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <img src={pkg.image} className="w-full h-full object-cover" alt={pkg.title} />
                      <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full">{pkg.duration}</div>
                    </div>
                    <div className="p-6 flex-grow">
                      <p className="text-blue-600 font-bold text-[9px] tracking-widest uppercase mb-2">{pkg.category}</p>
                      <h2 className="text-xl font-black text-slate-900 uppercase mb-3 leading-tight">{pkg.title}</h2>
                      <p className="text-[11px] text-slate-500 mb-6 leading-relaxed line-clamp-2">{pkg.desc}</p>
                      
                      <div className="border-y border-slate-50 py-4 mb-6 flex justify-between items-center">
                        <div>
                            <p className="text-[8px] text-slate-400 uppercase font-bold">Starts From</p>
                            <p className="text-lg font-black text-slate-900">₹{pkg.pricing.C}</p>
                        </div>
                        <ArrowRight className="text-blue-600" size={18} />
                      </div>

                      {/* ACTION: Sets selectedPkg state to open the internal itinerary instead of redirecting */}
                      <button 
                        onClick={() => setSelectedPkg(pkg)} 
                        className="w-full bg-slate-900 text-white font-black text-[10px] uppercase py-4 rounded-lg hover:bg-blue-600 transition-colors tracking-widest"
                      >
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* ── LEVEL 2: DETAILED ITINERARY VIEW (The "3 cards" internal content) ── */
          <motion.div key="detail" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="bg-white min-h-screen pt-20">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="flex flex-col lg:flex-row gap-16">
                
                {/* Sidebar Sticky Nav */}
                <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
                  <div className="border-l-4 border-blue-600 pl-6 mb-10">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">{selectedPkg.category}</p>
                    <h1 className="text-3xl font-black text-slate-900 uppercase italic leading-tight mb-4">{selectedPkg.title}</h1>
                    <div className="flex gap-4 text-slate-400">
                        <span className="flex items-center gap-1 text-[10px] font-bold"><Clock size={12}/> {selectedPkg.duration}</span>
                        <span className="flex items-center gap-1 text-[10px] font-bold"><Calendar size={12}/> Valid 2026</span>
                    </div>
                  </div>
                  
                  <nav className="space-y-4 mb-12">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Journey Map</p>
                    {selectedPkg.fullContent.list.map((item, i) => (
                      <div key={i} onClick={() => scrollToLocation(`loc-${i}`)} className="text-[11px] font-black text-slate-400 uppercase hover:text-blue-600 cursor-pointer flex items-center gap-3 transition-all group">
                        <span className="text-blue-600/20 italic group-hover:text-blue-600">0{i+1}</span> {item.name}
                      </div>
                    ))}
                  </nav>
                  
                  <div className="pt-10 border-t border-slate-100">
                    <button onClick={() => setSelectedPkg(null)} className="flex items-center gap-3 text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] hover:text-blue-600 transition-colors">
                      <ArrowLeft size={16} /> Back to Packages
                    </button>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:w-2/3">
                  <div className="mb-12 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-slate-200">
                    <img src={selectedPkg.image} className="w-full aspect-video object-cover" alt="Cover" />
                  </div>

                  <div className="prose prose-slate max-w-none">
                    <p className="text-xl font-bold text-slate-800 leading-relaxed mb-12 border-l-4 border-blue-600 pl-6 italic">
                      {selectedPkg.fullContent.intro}
                    </p>
                    
                    <div className="my-12 py-8 border-y border-slate-100 bg-slate-50/50 px-8 rounded-xl">
                      <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em] mb-2">{selectedPkg.fullContent.motto}</h4>
                      <p className="text-sm font-medium text-slate-500 uppercase">{selectedPkg.fullContent.subIntro}</p>
                    </div>

                    <div className="space-y-16">
                      {selectedPkg.fullContent.list.map((item, i) => (
                        <div key={i} id={`loc-${i}`} className="scroll-mt-32 group">
                          <h3 className="text-2xl font-black text-slate-900 uppercase italic mb-4 flex items-center gap-4">
                            <span className="text-blue-600 italic">0{i+1}.</span> {item.name}
                          </h3>
                          <p className="text-[15px] text-slate-600 font-medium leading-relaxed pl-12">
                            {item.details}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Price Tiers */}
                    <div className="mt-20 p-8 bg-slate-900 rounded-2xl text-white">
                        <h4 className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">Package Pricing (Per Person)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <span className="text-[9px] opacity-60 block mb-1">CATEGORY C</span>
                                <span className="text-xl font-black">₹{selectedPkg.pricing.C}</span>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <span className="text-[9px] opacity-60 block mb-1">CATEGORY B</span>
                                <span className="text-xl font-black">₹{selectedPkg.pricing.B}</span>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg border border-blue-500/50">
                                <span className="text-[9px] text-blue-400 block mb-1 uppercase font-bold">Category A</span>
                                <span className="text-xl font-black">₹{selectedPkg.pricing.A}</span>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA Card */}
                    <div className="mt-12 p-10 bg-blue-600 text-white relative overflow-hidden rounded-2xl shadow-xl">
                      <Compass size={140} className="absolute -right-8 -bottom-8 text-white opacity-10" />
                      <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-60">Important Information</p>
                        <p className="text-lg font-bold italic leading-relaxed">
                          "{selectedPkg.fullContent.note}"
                        </p>
                        <button className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-colors">
                            Enquire Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2563eb; }
      `}</style>
    </div>
  );
};

export default AndamanTours;