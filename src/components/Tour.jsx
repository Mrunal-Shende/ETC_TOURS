import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

// --- IMAGES IMPORT ---
import nepalImg from '../assets/tours/nepal.jpg';
import northEastImg from '../assets/tours/northeast.jpg';
import telanganaImg from '../assets/tours/telangana.jpg';
import kashmirImg from '../assets/tours/kashmir.jpg';
import gujaratImg from '../assets/tours/gujarat.jpg';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

const travelCards = [
  { img: nepalImg, title: "NEPAL", sub: "Majestic Himalayan peaks and spiritual traditions.", link: "/tours/india/nepal" },
  { img: northEastImg, title: "THE BEST OF NORTH EAST", sub: "Explore Darjeeling, Gangtok, and Pelling.", link: "/tours/india/north-india-home" },
  { img: telanganaImg, title: "TELANGANA", sub: "Ancient architecture and divine serenity.", link: "/tours/india/telangana-home" },
  { img: kashmirImg, title: "KASHMIR", sub: "Snow-capped peaks and tranquil waters.", link: "/tours/india/kashmir-home" },
  { img: gujaratImg, title: "GUJARAT", sub: "White salt deserts and Asiatic Lions.", link: "/tours/india/gujarat-home" },
];

const multiCards = [...travelCards, ...travelCards];

const Tour = () => {
  const swiperRef = useRef(null);

  return (
    <section className="relative w-full bg-white flex flex-col items-center justify-start overflow-hidden py-10 md:py-20">
      <div className="text-center mb-8 md:mb-12 px-4">
        <h2 className="text-black text-3xl md:text-5xl font-black uppercase tracking-tighter">
          Our Customers <span className="text-blue-500">Favourite Destination</span>
        </h2>
        <div className="h-1.5 w-24 bg-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div 
        className="w-full max-w-[1500px] relative px-2"
        // Hover par stop, hatne par resume
        onMouseEnter={() => swiperRef.current?.autoplay.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay.start()}
      >
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[EffectCoverflow, Autoplay, Navigation]}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0, stretch: 0, depth: 100, modifier: 1.5, slideShadows: false,
          }}
          autoplay={{ 
            delay: 2000, // Speed control (2 seconds per slide)
            disableOnInteraction: false, // User click ke baad bhi chalta rahega
            pauseOnMouseEnter: false // Manual handler (useRef) handle kar raha hai isliye ise false rakha hai
          }}
          navigation={true}
          className="final-tour-swiper !pb-16 !pt-5"
        >
          {multiCards.map((card, index) => (
            <SwiperSlide key={index} className="final-tour-slide">
              <Link to={card.link} className="block w-full h-full">
                <div className="card-outer-box w-full h-full overflow-hidden transition-all duration-700 border border-gray-400 shadow-2xl bg-white hover:border-blue-500">
                  <div className="h-[65%] w-full overflow-hidden">
                     <img 
                       src={card.img} 
                       alt={card.title} 
                       className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                     />
                  </div>

                  <div className="h-[35%] p-4 md:p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="card-main-title uppercase font-black tracking-tight mb-1 text-base md:text-lg text-black">
                        {card.title}
                      </h3>
                      <p className="card-main-desc text-[10px] md:text-xs line-clamp-2 leading-tight text-gray-700">
                        {card.sub}
                      </p>
                    </div>
                    
                    <span className="card-main-btn text-[9px] md:text-[10px] font-bold uppercase tracking-widest border-b-2 border-black w-fit pb-0.5 mt-2 block text-black hover:text-blue-500 hover:border-blue-500">
                      View Package
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .final-tour-slide { width: 330px !important; height: 440px !important; opacity: 0.7; transform: scale(0.85); transition: all 0.6s ease; }
        .swiper-slide-active { opacity: 1 !important; transform: scale(1) !important; z-index: 50; }
        .card-outer-box { border-radius: 20px; }
        
        /* Navigation Buttons */
        .swiper-button-next, .swiper-button-prev { color: #000 !important; background: white; width: 45px !important; height: 45px !important; border-radius: 50%; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        .swiper-button-next:after, .swiper-button-prev:after { font-size: 18px !important; font-weight: bold; }
        
        @media (max-width: 768px) { .final-tour-slide { width: 260px !important; height: 390px !important; } }
      `}</style>
    </section>
  );
};

export default Tour;