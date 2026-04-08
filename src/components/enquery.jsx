import React, { useState, useEffect } from 'react';
import { Send, ChevronDown, Clock, ShieldCheck, Globe, Calendar, Users, MapPin, X, ChevronRight, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EnquiryPage = () => {
  const initialFormState = {
    fullName: '', phoneNumber: '', email: '', company: '', serviceType: '',
    carFleet: '', tripType: '', pickUpLoc: '', dropLoc: '',
    destination: '', travelers: '', fromDate: '', toDate: '',
    groupSize: '', eventType: '', nationality: '', requirements: ''
  };

  const [serviceType, setServiceType] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null); 
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      // Clears data when moving to next page
      setFormData(initialFormState);
      setServiceType("");
      setSubmissionStatus(null);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "serviceType") setServiceType(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('loading');
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmissionStatus('success');
      setFormData(initialFormState);
      setServiceType("");
    } catch (error) {
      setSubmissionStatus('error');
    }
  };

  // DARK TEXT & MEDIUM SPACING STYLES
  const inputClass = "bg-slate-50 p-3 text-sm border-b-2 border-slate-200 focus:border-blue-600 font-bold uppercase outline-none transition-all text-slate-800 placeholder:text-slate-400";
  const labelClass = "text-[10px] font-black uppercase text-slate-700 mb-1 block tracking-wider";

  const formFields = {
    car: (
      <motion.div key="car-fields" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="md:col-span-2 grid md:grid-cols-2 gap-4 md:gap-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Pickup Date</label>
          <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Return Date</label>
          <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Preferred Vehicle</label>
          <select name="carFleet" value={formData.carFleet} onChange={handleChange} className={inputClass}>
            <option value="">Select Fleet</option>
            <option value="Mercedes S-Class">Mercedes Benz S-Class</option>
            <option value="BMW 7 Series">BMW 7 Series</option>
            <option value="KIA Carnival">KIA Carnival</option>
            <option value="Toyota Hiace">Commuter Hiace</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Travel Type</label>
          <select name="tripType" value={formData.tripType} onChange={handleChange} className={inputClass}>
            <option value="">Select Type</option>
            <option value="Airport Transfer">Airport Pick-up / Drop</option>
            <option value="Local">Local Trip</option>
            <option value="Outstation">Outstation</option>
          </select>
        </div>
        <input type="text" name="pickUpLoc" value={formData.pickUpLoc} onChange={handleChange} placeholder="Pick-up Point (Hotel/Airport) *" required className={inputClass} />
        <input type="text" name="dropLoc" value={formData.dropLoc} onChange={handleChange} placeholder="Drop-off Point / Destination" className={inputClass} />
      </motion.div>
    ),
    holiday: (
      <motion.div key="holiday-fields" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="md:col-span-2 grid md:grid-cols-2 gap-4 md:gap-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Travel Start Date</label>
          <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Travel End Date</label>
          <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required className={inputClass} />
        </div>
        <input type="text" name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination *" required className={inputClass} />
        <input type="text" name="travelers" value={formData.travelers} onChange={handleChange} placeholder="No. of Persons *" className={inputClass} />
      </motion.div>
    ),
    mice: (
      <motion.div key="mice-fields" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="md:col-span-2 grid md:grid-cols-2 gap-4 md:gap-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Event Start</label>
          <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Event End</label>
          <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required className={inputClass} />
        </div>
        <select name="eventType" value={formData.eventType} onChange={handleChange} className={inputClass}>
          <option value="">Category</option>
          <option value="Corporate">Corporate Meeting</option>
          <option value="Conference">Conference</option>
        </select>
        <input type="text" name="groupSize" value={formData.groupSize} onChange={handleChange} placeholder="Pax Count *" className={inputClass} />
      </motion.div>
    ),
    services: (
      <motion.div key="other-fields" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="md:col-span-2 grid md:grid-cols-2 gap-4 md:gap-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>From Date</label>
          <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>To Date</label>
          <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} className={inputClass} />
        </div>
        <select name="eventType" value={formData.eventType} onChange={handleChange} className={`${inputClass} md:col-span-2`}>
          <option value="">Requirement</option>
          <option value="Visa">Visa Processing</option>
          <option value="Passport">Passport Assistance</option>
        </select>
      </motion.div>
    )
  };

  return (
    <div className="bg-[#fcfdfe] min-h-screen font-sans text-slate-800 pt-0">
      {/* Hero Header - restored with specific text labels */}
      <div className="relative w-full h-[95vh] bg-[#0f172a] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('/Enquiryimg.jpeg')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/60 via-transparent to-[#0f172a]"></div>
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-block px-4 py-1 border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
            Ministry of Tourism Recognized Partner
          </motion.div>
          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-6xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            EXPRESS <br/><span className="text-blue-600">ENQUIRY</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-slate-300 font-bold text-sm md:text-lg mt-8 uppercase tracking-widest italic">
            Luxury Travel • Corporate MICE • Premium Fleet
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-32 md:-mt-48 relative z-30 pb-20">
        <div className="grid lg:grid-cols-12 gap-0 shadow-2xl bg-white border border-slate-100">
          
          {/* Trust Panel - restored with specific affiliation labels */}
          <div className="lg:col-span-4 bg-[#0f172a] p-10 text-white border-r-8 border-blue-600 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black uppercase italic mb-8 leading-none underline decoration-blue-600 underline-offset-8">Express Travel <br/>Trust</h3>
              <div className="space-y-10 mt-12">
                {[
                  { icon: <Clock size={20}/>, title: "24/7 Support", desc: "Round-the-clock backup team for ground transport." },
                  { icon: <ShieldCheck size={20}/>, title: "GPS Tracked", desc: "All luxury vehicles fitted with speed governors & GPS." },
                  { icon: <Globe size={20}/>, title: "Pan India", desc: "One-stop solution for travels across 50+ cities." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-blue-500">{item.icon}</div>
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-widest mb-1">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 opacity-50 text-[9px] font-black uppercase tracking-widest border-t border-white/20 pt-4">
                IATO & ITTA Member • Govt. of India Recognized
            </div>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-8 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              
              <div className="md:col-span-2 border-b border-slate-100 pb-2 mb-2 flex justify-between items-end">
                <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                  <Users size={14}/> 01. Traveler Profile
                </h4>
              </div>
              
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name *" required className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Phone Number</label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Mobile Number *" required className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address *" required className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Company Name</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Organization" className={inputClass} />
              </div>
              
              <div className="md:col-span-2 border-b border-slate-100 pb-2 mb-2 mt-4">
                <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                   <Briefcase size={14}/> 02. Service Selection
                </h4>
              </div>

              <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-0">
                {['car', 'holiday', 'mice', 'services'].map((type) => (
                  <button 
                    key={type} 
                    type="button" 
                    onClick={() => { setServiceType(type); setFormData(p => ({...p, serviceType: type})) }} 
                    className={`py-4 text-[9px] font-black uppercase tracking-[0.2em] transition-all border ${serviceType === type ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
                  >
                    {type === 'car' ? 'Car Rental' : type === 'holiday' ? 'Tours' : type === 'mice' ? 'MICE' : 'Visas/Forex'}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {formFields[serviceType]}
              </AnimatePresence>

              <div className="md:col-span-2 flex flex-col gap-1">
                <label className={labelClass}>Any Specific Requirements?</label>
                <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows="4" className={`${inputClass} resize-none`} placeholder="Specific Timings, Vehicle Preferences etc..."></textarea>
              </div>
              
              <div className="md:col-span-2 pt-4">
                <button type="submit" disabled={submissionStatus === 'loading'} className="w-full bg-blue-600 hover:bg-[#0f172a] text-white font-black py-5 uppercase tracking-[0.4em] text-[11px] transition-all flex items-center justify-center gap-4 active:scale-[0.99] disabled:opacity-50 shadow-xl">
                   {submissionStatus === 'loading' ? 'Processing Enquiry...' : 'Request Free Quote'} <Send size={16}/>
                </button>
                
                {submissionStatus === 'success' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 bg-green-50 border border-green-200 text-green-700 text-xs font-bold text-center uppercase tracking-widest">
                    Thank you. One of our executives will call you back soon.
                  </motion.div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryPage;