import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Plane, Hotel, Utensils, Activity, Car, Star, Quote, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TourItinerary = () => { 
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testiIndex, setTestiIndex] = useState(0); // Testimonial ke liye sahi variable name

  const highlights = [
    { icon: <Plane size={20} />, text: "Flights" },
    { icon: <Hotel size={20} />, text: "Hotels" },
    { icon: <Utensils size={20} />, text: "Meals" },
    { icon: <Activity size={20} />, text: "Activities" },
    { icon: <Car size={20} />, text: "Transfers" },
  ];

  const testimonials = [
    { name: "Jestin Mathew", text: "We would like to appreciate your good office for arranging travel trip to Maldives for our Director..." },
    { name: "Ramesh Babu", text: "Dear Sir, We had arranged a vehicle for Mr. Swithun Manoharan from your M/s Express Travel..." },
    { name: "Santosh Krinsky", text: "I wanted to take the opportunity to write to you and thank you for your efforts to make our tour..." }
  ];
useEffect(() => {
  const fetchTourData = async () => {
    try {
      setLoading(true);

      // 1. Pehle 'tours' (International) table check karein
      let { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('slug', slug)
        .maybeSingle(); // single() ki jagah maybeSingle() use karein taaki error na aaye agar data na mile

      // 2. Agar 'tours' mein nahi mila, toh 'domestic' table check karein
      if (!data) {
        const { data: domesticData, error: domesticError } = await supabase
          .from('domestic')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        
        data = domesticData;
      }

      if (!data) {
        console.error("Tour not found in both tables");
        setLoading(false);
        return;
      }

      // Itinerary parse karein
      const parsedItinerary = typeof data.itinerary === 'string' 
        ? JSON.parse(data.itinerary) 
        : data.itinerary;

      setTour({ ...data, itinerary: parsedItinerary });
    } catch (err) {
      console.error("Error fetching data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchTourData();
}, [slug]);

  // Testimonial Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTestiIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (loading) return <div className="h-screen flex items-center justify-center font-black tracking-widest uppercase">Loading Adventure...</div>;
  if (!tour) return <div className="h-screen flex items-center justify-center font-black">Tour Not Found</div>;

  return (
    <div className="pt-24 md:pt-44 bg-white font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HERO SECTION --- */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-12 bg-blue-600"></span>
              <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px]">{tour.category || 'Premium Tour'}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter leading-none text-slate-900 uppercase">
              {tour.title.split(' ')[0]}<br/><span className="text-blue-600">{tour.title.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-lg font-bold text-slate-500 mb-8 max-w-md italic">
              {tour.sub_title}
            </p>
            <div className="flex gap-4 mb-12">
              <div className="bg-slate-900 text-white px-6 py-3 text-xs font-black uppercase tracking-widest">{tour.duration}</div>
              <div className="border border-slate-200 px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-900">Fixed Departure</div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100">
                  <span className="text-blue-600">{item.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full lg:w-1/2 relative">
            <div className="h-[420px] overflow-hidden shadow-2xl">
              <img src={tour.image_url} className="w-full h-full object-cover" alt={tour.title} />
            </div>
          </motion.div>
        </div>

        {/* --- DYNAMIC ITINERARY SECTION --- */}
        <div className="py-20 bg-slate-50 -mx-6 px-6 mb-20 overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black tracking-tighter uppercase mb-2 text-slate-900">Detailed Itinerary</h2>
              <div className="h-1.5 w-20 bg-blue-600 mx-auto"></div>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-blue-100 -translate-x-1/2 hidden md:block border-l-2 border-dashed border-blue-200"></div>
              
              <div className="space-y-12">
                {(tour.itinerary || []).map((step, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 20 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true }}
                      className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
                    >
                      <div className="w-full md:w-1/2 flex justify-center px-4">
                        <div className={`relative p-2 bg-white shadow-xl ${isEven ? 'rotate-1' : '-rotate-1'} border border-slate-100`}>
                          <div className="w-64 h-44 overflow-hidden bg-slate-200">
                            <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="absolute top-0 left-0 bg-blue-600 text-white text-[9px] font-bold px-2 py-1 uppercase">{step.day}</div>
                        </div>
                      </div>

                      <div className="absolute left-1/2 -translate-x-1/2 w-9 h-9 bg-blue-600 text-white border-4 border-white flex items-center justify-center z-10 shadow-lg md:flex hidden font-black text-[10px]">
                        {idx + 1}
                      </div>

                      <div className={`w-full md:w-1/2 px-4 md:px-10 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                        <h3 className="text-lg font-black text-slate-900 mb-1 uppercase tracking-tight">{step.title}</h3>
                        <div className={`h-1 w-10 bg-blue-600 mb-3 ${isEven ? 'mr-auto' : 'ml-auto'}`}></div>
                        <p className="text-slate-600 leading-snug font-medium text-sm">{step.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-20">
          
          {/* TESTIMONIAL CARD */}
          <div className="bg-white border border-gray-100 shadow-2xl relative overflow-hidden rounded-none h-[350px] flex flex-col">
            <div className="bg-blue-600 py-3 px-8 w-[70%] rounded-r-full shadow-lg relative z-20 -ml-2 mt-6">
              <span className="text-white font-bold tracking-wider uppercase text-xs">Testimonials</span>
            </div>

            <div className="p-8 pt-4 flex flex-col h-full justify-between relative z-10">
              <div className="relative h-56">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testiIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex text-yellow-400 gap-1 mt-4">
                      {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                    </div>

                    <div className="relative">
                      <Quote className="absolute -top-4 -left-4 text-blue-50 opacity-50" size={40} />
                      <p className="text-slate-600 font-medium italic text-[15px] leading-relaxed relative z-10 pl-2">
                        "{testimonials[testiIndex].text}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-black shadow-xl">
                        {testimonials[testiIndex].name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-800 text-sm uppercase tracking-tight">{testimonials[testiIndex].name}</p>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Verified Client</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* CTA CARD */}
          <div className="lg:col-span-2 bg-gradient-to-r from-blue-900 to-slate-900 p-10 relative h-[350px] flex flex-col justify-center">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                Explore Dream Destinations!
              </h2>
              <p className="text-blue-300 font-bold text-lg italic mb-10">
                A journey of a thousand miles begins with a single step. We are ready to present you the best!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/enquiry" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3">
                  Book Now <Plane size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TourItinerary;