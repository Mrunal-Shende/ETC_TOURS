// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { supabase } from '../supabaseClient';
// import { Plane, Hotel, Utensils, Activity, Car, Star, Quote, ChevronRight } from 'lucide-react';

// import { motion, AnimatePresence } from 'framer-motion';

// const TourDetails = () => {
//   const { slug } = useParams();
//   const [tour, setTour] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [index, setIndex] = useState(0);

//   const testimonials = [ 
//     { name: "Jestin Mathew", text: "We would like to appreciate your good office for arranging travel trip to Maldives for our Director..." },
//     { name: "Ramesh Babu", text: "Dear Sir, We had arranged a vehicle for Mr. Swithun Manoharan - Executive Vice President..." },
//     { name: "Santosh Krinsky", text: "I wanted to take the opportunity to write to you and thank you for your efforts..." }
//   ];

//   useEffect(() => {
//     const fetchTour = async () => {
//       const { data, error } = await supabase.from('tours').select('*').eq('slug', slug).single();
//       if (data) setTour(data);
//       setLoading(false);
//     };
//     fetchTour();

//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [slug, testimonials.length]);

//   const highlights = [
//     { icon: <Plane size={20} />, text: "Flights" },
//     { icon: <Hotel size={20} />, text: "Hotels" },
//     { icon: <Utensils size={20} />, text: "Meals" },
//     { icon: <Activity size={20} />, text: "Activities" },
//     { icon: <Car size={20} />, text: "Transfers" },
//   ];

//   if (loading) return <div className="h-screen flex items-center justify-center font-black text-blue-600 uppercase tracking-widest">Loading Experience...</div>;
//   if (!tour) return <div className="h-screen flex items-center justify-center font-bold">Tour Not Found</div>;

//   return (
//     <div className="pt-40 pb-16 bg-gray-50 font-sans">
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* --- HERO SECTION --- */}
//         <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
//           <motion.div 
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="w-full lg:w-1/2"
//           >
//             <div className="flex items-center gap-3 mb-6 mt-4">
//               <span className="h-[2px] w-12 bg-blue-600"></span>
//               <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
//                 Premium {tour.category || 'International'} Tour
//               </span>
//             </div>
            
//             <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-[0.9] uppercase">
//               {tour.title?.includes(' ') ? (
//                 <>
//                   {tour.title.split(' ')[0]} <br/>
//                   <span className="text-blue-600">{tour.title.split(' ').slice(1).join(' ')}</span>
//                 </>
//               ) : ( tour.title )}
//             </h1>
            
//             <p className="text-lg md:text-xl font-bold text-slate-700 mb-8 italic border-l-4 border-blue-600 pl-4 bg-blue-50/50 py-2">
//               {tour.sub_title}
//             </p>

//             <div className="inline-block bg-slate-900 text-white px-6 py-2 text-sm font-black uppercase tracking-widest mb-10 shadow-xl">
//               {tour.duration}
//             </div>

//             {/* Inclusions Grid */}
//             <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 md:gap-4">
//               {highlights.map((item, idx) => (
//                 <div key={idx} className="flex flex-col items-center p-4 bg-white shadow-sm border border-gray-100 rounded-none transition-all hover:border-blue-300">
//                   <div className="text-blue-600 mb-2">{item.icon}</div>
//                   <span className="text-[10px] font-bold uppercase text-slate-500 tracking-tighter text-center">{item.text}</span>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           <motion.div 
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="w-full lg:w-1/2 h-[450px] relative mt-8 lg:mt-0"
//           >
//             <img 
//               src={tour.image_url} 
//               alt={tour.title}
//               className="w-full h-full object-cover shadow-2xl rounded-none"
//             />
            
//             {/* EXPLORE Button (Replacing the static box and wrapping it in a Link) */}
//             <Link 
//               to={`/tours/${tour.slug}/itinerary`}
//               className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-8 hidden md:flex items-center gap-4 shadow-2xl rounded-none hover:bg-slate-900 transition-all duration-300 group cursor-pointer"
//             >
//               <div>
//                 <p className="text-4xl font-black leading-none uppercase">EXPLORE</p>
//                 <p className="text-sm font-bold tracking-[0.2em] mt-1 uppercase">DREAM DESTINATION</p>
//               </div>
//               <ChevronRight size={32} className="group-hover:translate-x-2 transition-transform" />
//             </Link>

//             {/* Mobile View Explore Link */}
//             <Link 
//               to={`/tours/${tour.slug}/itinerary`}
//               className="md:hidden absolute bottom-4 left-4 right-4 bg-blue-600 text-white p-4 text-center font-black uppercase tracking-widest text-sm shadow-xl"
//             >
//               EXPLORE ITINERARY
//             </Link>
//           </motion.div>
//         </div>

//         {/* --- BOTTOM SECTION --- */}
//         <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          
//           {/* TESTIMONIAL CARD */}
//           <div className="bg-white border border-gray-100 shadow-2xl relative overflow-hidden rounded-none h-[350px] flex flex-col group">
//             <div className="bg-blue-600 py-3 px-8 w-[70%] rounded-r-full shadow-lg relative z-20 -ml-2 mt-6 transition-transform duration-500 group-hover:translate-x-2">
//               <span className="text-white font-bold tracking-wider">Testimonials</span>
//             </div>

//             <div className="p-8 pt-4 flex flex-col h-full justify-between relative z-10">
//               <div className="relative h-56">
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, scale: 0.8, rotateY: -20, x: 50 }}
//                     animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
//                     exit={{ opacity: 0, scale: 0.9, rotateY: 20, x: -50 }}
//                     transition={{ type: "spring", damping: 15, stiffness: 100 }}
//                     className="flex flex-col gap-6"
//                   >
//                     <div className="flex text-yellow-400 gap-1 mt-4">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} size={18} fill="currentColor" />
//                       ))}
//                     </div>

//                     <div className="relative">
//                       <Quote className="absolute -top-4 -left-4 text-blue-50 opacity-50" size={40} />
//                       <p className="text-slate-600 font-medium italic text-[15px] leading-relaxed relative z-10 pl-2">
//                         "{testimonials[index].text}"
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-4 mt-auto">
//                       <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white text-xl font-black shadow-xl">
//                         {testimonials[index].name.charAt(0)}
//                       </div>
//                       <div>
//                         <p className="font-black text-slate-800 text-sm uppercase tracking-tight">
//                           {testimonials[index].name}
//                         </p>
//                         <div className="flex items-center gap-1">
//                           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                           <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Verified Client</p>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </AnimatePresence>
//               </div>
//             </div>
//             <Quote className="absolute -bottom-6 -right-6 text-slate-50 rotate-180" size={120} />
//           </div>

//           {/* --- CALL TO ACTION CARD --- */}
//           <div className="lg:col-span-2 bg-gradient-to-r from-blue-900 to-slate-900 p-10 relative h-[350px] flex flex-col justify-center">
//             <div className="relative z-10">
//               <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">
//                 Ready to Explore?
//               </h2>
//               <p className="text-blue-300 font-bold text-lg italic mb-6">
//                 Book your {tour.title} package now and get exclusive offers!
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <Link 
//                   to={`/tours/${tour.slug}/itinerary`} 
//                   className="border-2 border-white/20 hover:border-white hover:bg-white/10 text-white px-10 py-4 font-black uppercase tracking-widest text-xs transition-all rounded-none text-center"
//                 >
//                   MORE DETAILS
//                 </Link>
//                 <Link 
//                   to="/contact" 
//                   className="bg-white hover:bg-blue-200 text-blue-600 px-10 py-4 font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 rounded-none shadow-lg shadow-blue-900/40"
//                 >
//                   CLICK HERE <Plane size={16} />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TourDetails;