import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Compass, Phone, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SriLankaDetail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sriLankaData = {
    title: "Heritage & Beaches of Sri Lanka",
    category: "INTERNATIONAL EXCURSION",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1000",
    intro: "The Pearl of the Indian Ocean awaits. From the ancient rock fortress of Sigiriya to the golden sands of Bentota, experience a journey that blends spirituality, nature, and luxury.",
    motto: "EXPLORE THE TEARDROP ISLE",
    subIntro: "06 Nights / 07 Days of pure bliss across Dambulla, Nuwara Eliya, and Colombo.",
    price: 47400, // Example Base Price
    itinerary: [
      { name: "Day 01: Arrival – Dambulla", details: "Visit Pinnawala Elephant Orphanage. Transfer to Dambulla/Sigiriya for overnight stay." },
      { name: "Day 02: Sigiriya Rock", details: "Climb the magnificent Sigiriya Rock Fortress. Afternoon visit to Polonnaruwa." },
      { name: "Day 03: Nuwara Eliya", details: "Visit Dambulla Cave Temple. Drive to the 'Little England' of Sri Lanka via Ramboda Falls." },
      { name: "Day 04: Bentota Beach", details: "Proceed to Bentota. Enjoy water sports or relax by the serene coastline." },
      { name: "Day 05: Galle Excursion", details: "Explore Galle Dutch Fort and enjoy a scenic Madu River Boat Ride." },
      { name: "Day 06: Colombo City", details: "City tour of the capital including Independence Square and shopping." }
    ],
    note: "Valid for travel from April 2026. Passport must be valid for 6 months."
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
    }
  };

  // 20% Calculation
  const advanceAmount = (sriLankaData.price * 0.20).toLocaleString('en-IN');

  return (
    <div className="bg-[#fcfdfe] min-h-screen font-sans text-slate-700 pt-20 selection:bg-blue-100">
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* LEFT SIDEBAR (Sticky) */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit bg-slate-50/50 p-6 border-r border-slate-100">
            <div className="border-l-4 border-blue-600 pl-6 mb-10">
              <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-2">{sriLankaData.category}</p>
              <h1 className="text-2xl font-black text-slate-900 uppercase italic leading-tight mb-6">{sriLankaData.title}</h1>
            </div>
            
            <nav className="space-y-4">
              <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-4">The Itinerary</p>
              {sriLankaData.itinerary.map((item, i) => (
                <div key={i} onClick={() => scrollToSection(`day-${i}`)} className="text-[10px] font-black text-slate-400 uppercase hover:text-blue-600 cursor-pointer flex items-center gap-3 group transition-all">
                  <span className="text-blue-600/20 group-hover:text-blue-600 italic">0{i+1}</span> {item.name.split(':')[0]}
                </div>
              ))}
            </nav>

            {/* PAYMENT INFO BOX */}
            <div className="mt-12 p-5 bg-slate-900 text-white rounded-sm shadow-xl">
               <div className="flex items-center gap-2 mb-3 text-blue-400">
                 <CreditCard size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Booking Policy</span>
               </div>
               <p className="text-[11px] font-medium text-slate-400 mb-2">Book your slot by paying only 20% advance:</p>
               <h3 className="text-xl font-black text-white mb-4">₹{advanceAmount}*</h3>
               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-[10px] font-black uppercase tracking-widest transition-all">
                 Pay Advance Now
               </button>
               <p className="text-[8px] text-slate-500 mt-4 leading-relaxed">
                 *Remaining balance and coordination details will be shared by our executive after the advance payment.
               </p>
            </div>
            
            <div className="mt-10 pt-10 border-t border-slate-200">
              <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-slate-400 font-black uppercase text-[9px] tracking-[0.3em] hover:text-blue-600">
                <ArrowLeft size={16} /> BACK TO EXPLORE
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:w-2/3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 overflow-hidden shadow-2xl">
              <img src={sriLankaData.image} className="w-full aspect-[16/9] object-cover" alt="Sri Lanka" />
            </motion.div>

            <div className="prose prose-slate max-w-none">
              <p className="text-lg font-bold text-slate-800 leading-relaxed mb-12 border-l-4 border-blue-600 pl-6 italic">
                {sriLankaData.intro}
              </p>
              
              <div className="my-12 py-6 border-y border-slate-100 bg-slate-50/30 px-6 text-center lg:text-left">
                <h4 className="text-xs font-black text-blue-600 uppercase tracking-[0.4em] mb-2">{sriLankaData.motto}</h4>
                <p className="text-sm font-medium text-slate-400 uppercase">{sriLankaData.subIntro}</p>
              </div>

              <div className="space-y-20">
                {sriLankaData.itinerary.map((item, i) => (
                  <div key={i} id={`day-${i}`} className="scroll-mt-32 group">
                    <h3 className="text-xl font-black text-slate-900 uppercase italic mb-4 flex items-center gap-4">
                      <span className="text-blue-600 italic text-lg">0{i+1}.</span> {item.name}
                    </h3>
                    <p className="text-sm text-slate-500 font-bold leading-relaxed pl-10">
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>

              {/* CONTACT NOTE */}
              <div className="mt-32 p-8 bg-blue-600 text-white relative overflow-hidden">
                <Compass size={120} className="absolute -right-5 -bottom-5 text-white opacity-10" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Phone size={18} />
                    <p className="text-[10px] font-black uppercase tracking-widest italic opacity-80">Execution & Coordination</p>
                  </div>
                  <p className="text-base font-bold italic leading-relaxed mb-4">
                    "Hamare team members aapse coordinate karenge baki balance payment aur travel documents ke liye."
                  </p>
                  <p className="text-[11px] font-medium opacity-60 uppercase tracking-widest">
                    {sriLankaData.note}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SriLankaDetail;