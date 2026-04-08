import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom'; // <--- Navigation ke liye zaroori hai

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

const travelCards = [
  { 
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa", 
    title: "NEPAL", 
    sub: "Where majestic Himalayan peaks meet ancient spiritual traditions in the heart of the clouds.", 
    link: "/tours/india/nepal"
  },
 { 
  img: "https://static.toiimg.com/photo/msid-95221332,width-96,height-65.cms", 
  title: "THE BEST OF NORTH EAST", 
  sub: "Explore the Himalayan beauty of Darjeeling, Gangtok, and Pelling with our premium curated packages.", 
  link: "/tours/india/north-india-home" 
},
  { 
    img: "https://assets.cntraveller.in/photos/60ba009d010276881eb4d9fd/16:9/w_1024%2Cc_limit/Hyderabad3-Alamy-D9K7KC-1366x768.jpg", 
    title: "TELANGANA", 
    sub: "Where ancient architecture meets divine serenity in the heart of the South.", 
    link: "/tours/india/telangana-home" 
  },
  { 
    img: "https://s7ap1.scene7.com/is/image/incredibleindia/1-amarnath-yatra-pahalgam-jammu-kashmir-city-hero?qlt=82&ts=1726816087141g", 
    title: "KASHMIR", 
    sub: "Where snow-capped peaks meet tranquil waters in the crown of the Himalayas.", 
    link: "/tours/india/kashmir-home" 
  },
{ 
  img: "https://www.eyeonasia.gov.sg/images/india-selected/gujarat-profile.jpg", 
  title: "GUJARAT", 
  sub: "Explore the white salt deserts, ancient temples, and the home of Asiatic Lions.", 
  link: "/tours/india/gujarat-home" 
},
];

const multiCards = [...travelCards, ...travelCards]; // Simplified for clean view

const Tour = () => {
  return (
    <section className="relative w-full bg-white flex flex-col items-center justify-start overflow-hidden py-10 md:py-20">
      <div className="text-center mb-8 md:mb-12 px-4">
        <h2 className="text-black text-3xl md:text-5xl font-black uppercase tracking-tighter">
          Our Customers <span className="text-blue-500">Favourite Destination</span>
        </h2>
        <div className="h-1.5 w-24 bg-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="w-full max-w-[1500px] relative px-2">
        <Swiper
          modules={[EffectCoverflow, Autoplay, Navigation]}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0, stretch: 0, depth: 100, modifier: 1.5, slideShadows: false,
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          navigation={true}
          className="final-tour-swiper !pb-16 !pt-5"
        >
          {multiCards.map((card, index) => (
            <SwiperSlide key={index} className="final-tour-slide">
              <div className="card-outer-box w-full h-full overflow-hidden transition-all duration-700 select-none border border-gray-400 shadow-2xl bg-white">
                <div className="h-[65%] w-full overflow-hidden">
                   <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                </div>

                <div className="h-[35%] p-4 md:p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="card-main-title uppercase font-black tracking-tight mb-1 text-base md:text-lg">
                      {card.title}
                    </h3>
                    <p className="card-main-desc text-[10px] md:text-xs line-clamp-2 leading-tight opacity-90">
                      {card.sub}
                    </p>
                  </div>
                  
                  {/* Link component routing ko handle karega */}
                  <Link 
                    to={card.link} 
                    className="card-main-btn text-left text-[9px] md:text-[10px] font-bold uppercase tracking-widest border-b-2 border-black w-fit pb-0.5 mt-2 block hover:text-blue-500 hover:border-blue-500 transition-all"
                  >
                    View Package
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .final-tour-slide { width: 330px !important; height: 440px !important; opacity: 0.7; transform: scale(0.85); transition: all 0.6s ease; }
        .swiper-slide-active { opacity: 1 !important; transform: scale(1) !important; z-index: 50; }
        .card-outer-box { border-radius: 20px; }
        .swiper-button-next, .swiper-button-prev { color: #000 !important; background: white; width: 45px !important; height: 45px !important; border-radius: 50%; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        @media (max-width: 768px) { .final-tour-slide { width: 260px !important; height: 390px !important; } }
      `}</style>
    </section>
  );
};

export default Tour;