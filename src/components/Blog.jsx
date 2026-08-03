<<<<<<< HEAD
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ExternalLink, Calendar, Clock, X, MapPin, Navigation } from 'lucide-react';

const blogs = [
  {
    id: 1,
    title: "3 Chola Temples in Tamil Nadu That Feel Beyond Human",
    desc: "There are places in Tamil Nadu where granite sings, shadows predict time, and kings built temples so powerful that even after 1000 years, they still dominate the skyline.",
    category: "ARCHITECTURAL MARVELS",
    image: "/chola.jpeg",
    carouselImages: ["/aira.jpeg", "/Briha.jpeg", "/GANGAI.jpeg", "/south.jpeg"],
    readTime: "8 min read",
    fullContent: {
      lede: "Tamil Nadu's Chola temples aren't just monuments — they are living institutions where devotion, mathematics, and art were fused into stone over a thousand years ago. These three UNESCO-listed marvels represent the absolute pinnacle of Dravidian temple architecture.",
      bestTime: "November to February (Pleasant winter winds)",
      list: [
        {
          name: "Brihadisvara Temple",
          location: "Thanjavur, Tamil Nadu",
          details: "Imagine standing in Thanjavur 1000 years ago. The sound of chisels echoes across the city. Hundreds of workers pull gigantic stones under the burning sun while Raja Raja Chola watches his dream rise into the sky. Oil lamps flicker at night, priests chant inside unfinished halls, and slowly — a mountain of granite becomes one of the greatest temples India has ever seen. The 66-metre vimana (tower) was the tallest structure in the Indian subcontinent at the time of its completion in 1010 CE. Even after centuries of storms, invasions, and changing kingdoms, the temple stands untouched in pride, carrying ancient Tamil inscriptions, giant sculptures, and the powerful silence of an empire that once ruled the seas.",
          img: "/Briha.jpeg",
          carouselImages: ["/Briha.jpeg", "/briha11.jpeg", "/briha22.jpeg","/briha33.jpeg"], // Added internal sub-carousel
          howToReach: "Trichy Airport → NH-83 Highway Route → Thanjavur City Center (55 km). The highways offer seamless four-lane road connectivity.",
          roadmap: ["Arrive at Thanjavur Junction/Trichy Hub", "Take local highway transit to the Grand Temple Complex", "Marvel at the massive 66-meter towering Vimana rocket structure", "Explore ancient Tamil inscriptions & hidden inner sanctuary frescoes"],
        },
        {
          name: "Gangaikonda Cholapuram",
          location: "Ariyalur District, Tamil Nadu",
          details: "Rajendra Chola conquered lands so far north that he brought back water from the Ganges — and built an entire city to celebrate it. Today, Gangaikonda Cholapuram carries a strange and unforgettable atmosphere. The temple feels calm, powerful, and almost abandoned by time itself. Its elegant curves, giant Shiva lingam, lion well, and quiet courtyards create the feeling of walking through the remains of a once unstoppable empire. Unlike crowded tourist spots, this temple whispers its history slowly — rewarding visitors who pause long enough to listen.",
          img: "/GANGAI.jpeg",
          carouselImages: ["/GANGAI.jpeg", "/goi11.jpeg","/goi22.jpeg","/goi33.jpeg"], // Added internal sub-carousel
          howToReach: "Kumbakonam → Anaikkarai Bridge Route → Gangaikonda Cholapuram Highway (34 km). Well maintained dual-carriageway setup.",
          roadmap: ["Reach Kumbakonam or Ariyalur hub via highway or rail", "Hire private cab or state transport towards Jayankondam route", "Walk through the pristine uncrowded lawn perimeter to the sanctum", "Visit the unique Simhakeni (Lion Well) and check structural symmetries"],
        },
        {
          name: "Airavatesvara Temple",
          location: "Darasuram, Kumbakonam",
          details: "Long before modern optical illusions appeared in books and galleries, Chola sculptors were already challenging the human eye. Hidden within Airavatesvara Temple is a fascinating bull-and-elephant carving where two animals share a single head. Depending on the angle from which it is viewed, the sculpture appears as either a bull or an elephant. More than 800 years after it was carved, this ingenious creation remains one of the temple's most intriguing attractions and a testament to the brilliance of Chola artistry. Walking through Darasuram feels less like visiting a monument and more like discovering a forgotten world where art, music, and devotion were carved together forever.",
          img: "/aira.jpeg",
          carouselImages: ["/aira.jpeg", "/aira222.jpeg","/aira22.jpeg","/aira33.jpeg"], // Added internal sub-carousel
          howToReach: "Kumbakonam Central Stand → Local Darasuram Bypass Road Route (4 km). Extremely short but busy road approach.",
          roadmap: ["Arrive at Kumbakonam central junction point", "Take a short 10-minute road trip down to Darasuram village limits", "Observe the iconic horse-drawn chariot structural design foundations", "Locate the optical illusion carving and test acoustic musical stone steps"],
        }
      ],
      note: "Respect the sacred guidelines of these living ancient heritage installations by walking barefoot over the stone courtyards.",
    }
  },
  {
    id: 2,
    title: "Where Moonlight Dances on Salt: The Magic of Rann Utsav",
    desc: "As the sun sets over the salt desert, the festival grounds come alive with the sounds of drums, folk songs, and traditional dances from Gujarat.",
    category: "DESERT FESTIVAL SPECIAL",
    image: "/rann.jpeg",
    carouselImages: ["/rann.jpeg", "/rann1.jpeg", "/rann2.jpeg", "/rann3.jpeg"],
    readTime: "7 min read",
    fullContent: {
      lede: "There are few places in the world where a barren desert transforms into a celebration of color, music, and culture. Every year, as winter arrives in Gujarat, the vast white salt desert of Kutch becomes the stage for Rann Utsav—a festival unlike any other. Beneath endless skies, visitors witness folk performances, vibrant handicrafts, traditional cuisine, and breathtaking sunsets that paint the horizon in shades of gold and crimson. But the true magic begins after dark, when moonlight reflects off the white salt plains, turning the landscape into a glowing wonderland that feels almost otherworldly. This is not just a festival; it is an experience that captures the spirit of Kutch in its most spectacular form.",
      bestTime: "November to February (Specially during Full Moon cycles)",
      list: [
        {
          name: "White Rann Plains & Full Moon Magic",
          location: "Dhordo, Kutch, Gujarat",
          details: "The White Rann is the highlight of the festival. As sunlight touches the endless salt plains, the landscape transforms into a dazzling white canvas stretching to the horizon. During sunset, the desert glows with shades of gold, orange, and pink. One of the most memorable experiences is seeing the White Rann under moonlight. On full moon nights, the salt desert reflects the moon's glow, creating a surreal landscape that feels almost magical.",
          img: "/rannmoon.jpeg",
          carouselImages: ["/moon1.jpeg", "/moon11.jpeg", "/moon22.jpeg", "/moon44.jpeg"],
          howToReach: "Bhuj City Hub → Bhada/Khavda Road Route → Dhordo Checkpost Corridor (80 km). Clear flat tarred highway tracks.",
          roadmap: ["Land at Bhuj Airport/Station Hub", "Drive straight north via Bhuj-Khavda highway road", "Present security documents at Dhordo Checkpost window", "Walk into the sprawling white crystallised salt flatlands"],
        },
        {
          name: "Traditional Folk Performances & Handicrafts",
          location: "Dhordo Tent City, Kutch",
          details: "As the sun sets over the salt desert, the festival grounds come alive with the sounds of drums, folk songs, and traditional dances from Gujarat. Dancers in colorful attire spin gracefully under the open sky while musicians bring centuries-old traditions to life. Alongside, the handicraft markets of Kutch are a vibrant showcase of the region's rich artistic heritage. As you stroll through the bustling stalls, you'll discover beautifully embroidered textiles, handcrafted jewellery, colorful Bandhani fabrics, leather products, and a variety of traditional Kutchi handicrafts.",
          img: "/tentcity.jpeg",
          carouselImages: ["/tentcity.jpeg", "/kutuch1.jpeg","kutuch2.jpeg", "/kutuch3.jpeg", "/kutuch22.jpeg"],
          howToReach: "Dhordo Tent City Premises → Inner Festival Event Loops & Haat Courtyards. Accessible via walking tracks.",
          roadmap: ["Enter main cultural arena pavilion at sunset hour", "Take seats for evening energetic Garba & Kutchi musical recitals", "Stroll through local government-approved artisan craft stalls", "Interact with National Award-winning embroidery families directly"],
        },
        {
          name: "Authentic Kutchi Culinary Journey",
          location: "Dhordo Village, Kutch",
          details: "No visit to Rann Utsav is complete without experiencing the flavors of Kutch. The festival offers a delightful journey through Gujarat's culinary traditions, where every dish is prepared with recipes passed down through generations. Visitors can savor local favorites such as the spicy and flavorful Kutchi Dabeli, wholesome Bajra Rotla, comforting Kadhi, and traditional Gujarati thalis filled with a variety of regional delicacies. From simple village-style meals to festive specialties, every bite reflects the warmth, hospitality, and rich cultural heritage of Gujarat.",
          img: "/rannfood.jpeg",
          carouselImages: ["/rannfood.jpeg", "/authentic1.jpeg", "/authentic2.jpeg"],
          howToReach: "Tent City Dining Halls / Local Dhordo Village Food Courtyards via Border Highway Hubs.",
          roadmap: ["Locate authentic dining commons or village-style seating areas", "Order slow-cooked traditional clay-pot preparation meals", "Try hot buttery Bajra Rotla topped with authentic garlic chutney paste", "Conclude with fresh Kutchi sweets and local buttermilk drinks"],
        }
      ],
      note: "The White Rann is located near India's border with Pakistan, so all visitors (Indians and foreigners) need a mandatory Special Permit to enter the White Rann area near Dhordo online or at the checkpost counter.",
    }
  },
  {
    id: 3,
    title: "Hampi: Walking Through the Ruins of a Lost Empire",
    desc: "Empires rise and fall, but Hampi refuses to be forgotten. Scattered across a surreal landscape of giant boulders, walk through the capital remnants of the majestic Vijayanagara Empire.",
    category: "UNESCO WORLD HERITAGE",
    image: "/hampi.jpeg",
    carouselImages: ["/Hampi1.jpeg", "/Hampi2.jpeg", "/Hampi3.jpeg", "/hampi.jpeg"],
    readTime: "10 min read",
    fullContent: {
      lede: "There are places that tell stories, and then there are places like Hampi that seem to whisper them from every stone. Scattered across a surreal landscape of giant boulders and ancient ruins, Hampi was once the glorious capital of the Vijayanagara Empire—one of the richest and most powerful kingdoms in Indian history. Today, its temples, markets, and monuments stand as silent reminders of a civilization that dazzled travelers from around the world.",
      bestTime: "October to March (Cool breezes avoid scorching rock temperatures)",
      list: [
        {
          name: "Virupaksha Temple",
          location: "Hampi Bazaar, Karnataka",
          details: "Long before Hampi became a UNESCO World Heritage Site, prayers were already echoing through the halls of Virupaksha Temple. Dedicated to Lord Shiva, this sacred temple remains an active place of worship even after centuries of political change and historical upheaval. Its towering gopuram welcomes visitors into a world where devotion, architecture, and history exist side by side.",
          img: "/viru.jpeg",
          carouselImages: ["/viru.jpeg", "/viru11.jpeg", "/viru22.jpeg", "/viru33.jpeg"],
          howToReach: "Bengaluru Hub → Chitradurga → Hospet → Hampi (approx. 340 km via NH-48 and NH-50). Travel time is roughly 6–7 hours.",
          roadmap: ["Navigate from Hospet town directly to Hampi Bazaar Road", "Pass through the massive outer stone gateway structures", "Explore the active inner worship chambers and old courtyard corridors", "Interact with the temple elephant and see the inverted shadow camera obscura system"],
        },
        {
          name: "The Stone Chariot",
          location: "Vittala Temple Complex, Hampi",
          details: "Perhaps no monument represents Hampi better than the famous Stone Chariot. Carved with extraordinary precision, this architectural masterpiece has become one of India's most recognized heritage symbols. Though it appears ready to roll forward, the chariot has stood still for centuries, captivating visitors with its craftsmanship and timeless structural beauty.",
          img: "/stone.jpeg",
          carouselImages: ["/stone.jpeg", "/stone11.jpeg", "/stone22.jpeg", "/stone33.jpeg"],
          howToReach: "Hampi Main Road → Vittala Temple Complex Walkway Route via Battery Operated Carts.",
          roadmap: ["Reach the outer parking boundaries of the safe monument zones", "Board an eco-friendly golf cart or take the scenic riverside trek track", "Enter the main courtyard of the iconic stone chariot enclosure", "Examine closely the detailed carvings on the wheels and monolithic elephant guards"],
        },
        {
          name: "Vittala Temple Pillars",
          location: "Vittala Temple, Hampi",
          details: "What if a temple could make music? The Vittala Temple is renowned for its legendary musical pillars, which have fascinated visitors and historians alike. Every carving, corridor, and pillar reflects the artistic excellence of the Vijayanagara era, showcasing a level of detail that continues to inspire awe. The monolithic granite pillars emit distinct frequencies when lightly tapped.",
          img: "/vittala.jpeg",
          carouselImages: ["/vittala.jpeg", "/vit11.jpeg", "/vit22.jpeg","/vit33.jpeg"],
          howToReach: "Hampi Bazaar → River Bank Walking Trail → Vittala Compound Access Line.",
          roadmap: ["Enter the open-air maha-mandapa stone hall complex setup", "Observe the 56 massive structural pillars carved out of solid mountain stone", "Study how minor taps generate accurate musical frequencies across chambers", "Photograph the delicate stone roof eaves designed like flowing wood panels"],
        },
        {
          name: "Hemakuta Hill",
          location: "Near Virupaksha Temple, Hampi",
          details: "As the sun begins to set, Hemakuta Hill offers one of the most breathtaking views in Hampi. From its summit, visitors can watch the golden light spread across temples, ruins, and giant boulders that stretch endlessly across the landscape. It is the perfect place to appreciate the scale and grandeur of what was once a thriving imperial capital.",
          img: "/Hemakuta.jpeg",
          carouselImages: ["/Hemakuta.jpeg", "/hamp11.jpeg","/hamp22.jpeg","/hamp33.jpeg"],
          howToReach: "Adjacent to Virupaksha Temple Complex western gates → Marked Rock Steps Climbing Route.",
          roadmap: ["Begin gentle upward rocky trek an hour before the targeted sunset schedule", "Pass by the distinct double-storied monolithic stone pavilions on top", "Find a quiet ledge overlooking the sprawling green banana plantations", "Watch the golden sun dip behind the dramatic boulder-strewn horizon line"],
        }
      ],
      note: "Wear strong traction footwear as exploring Hampi involves substantial walking and climbing over ancient, uneven rock boulders.",
    }
  },
  {
    id: 4,
    title: "Rajasthan: Where Every Fort Has a Story and Every Sunset Feels Royal",
    desc: "Some destinations are visited. Rajasthan is experienced. Step into a grand historical epic filled with golden deserts, magnificent hilltop forts, and palaces.",
    category: "ROYAL INDULGENCE",
    image: "/Rajasthan.jpeg",
    carouselImages: ["/Rajasthan.jpeg", "/raj1.jpeg", "/raj2.jpeg", "/raj3.jpeg"],
    readTime: "11 min read",
    fullContent: {
      lede: "From golden deserts and magnificent forts to vibrant bazaars and royal palaces, Rajasthan feels like stepping into the pages of a grand historical epic. Every city has its own character, every monument its own legend, and every journey its own unforgettable memory. Some destinations are visited. Rajasthan is experienced.",
      bestTime: "November to February (Avoids harsh desert summer heatwaves)",
      list: [
        {
          name: "Amber Fort",
          location: "Amer, Jaipur, Rajasthan",
          details: "Rising above the rugged hills of Jaipur, Amber Fort is a masterpiece of Rajput architecture. As visitors walk through its grand gateways, mirrored halls, and royal courtyards, it is easy to imagine the era when kings, warriors, and nobles filled these spaces. The fort's commanding views over the surrounding landscape reveal why it was once one of Rajasthan's most important strongholds.",
          img: "/amber.jpeg",
          carouselImages: ["/amber.jpeg", "/am1.jpeg","/am2.jpeg"],
          howToReach: "Delhi → NH-48 Expressway Route → Jaipur Outer Amer Road Bypass Corridor (260 km). Dynamic six-lane road link.",
          roadmap: ["Drive through Jaipur old pink city gates north towards Amer village", "Ascend the fort stone pathways via jeep transit or walking ramps", "Enter the Diwan-i-Aam and explore Sheesh Mahal glass reflections", "Look down upon the manicured floating saffron gardens on Maota lake"],
        },
        {
          name: "Mehrangarh Fort",
          location: "Jodhpur, Rajasthan",
          details: "Perched high above Jodhpur, Mehrangarh Fort dominates the skyline like a giant stone crown. Behind its massive walls lie palaces, museums, and centuries of royal history. From the fort's ramparts, visitors can admire the famous blue houses of Jodhpur stretching endlessly below, creating one of Rajasthan's most iconic views.",
          img: "/mehra.jpeg",
          carouselImages: ["/mehra.jpeg", "/meh1.jpeg", "/meh22.jpeg", "/meh33.jpeg", "/meh44.jpeg"],
          howToReach: "Jaipur → NH-25 National Highway Route → Jodhpur Blue City Link Road (340 km). Standard multi-lane tar tracks.",
          roadmap: ["Drive up the steep winding mountain road to Fort main entry", "Pass through the historical Jai Pol gate with old battle scars", "Tour museum galleries showcasing royal elephant howdahs and weaponry", "Walk to the cliff lookout to photograph cobalt blue houses below"],
        },
        {
          name: "Jaisalmer Fort",
          location: "Jaisalmer, Rajasthan",
          details: "Unlike many historic forts that stand abandoned, Jaisalmer Fort remains alive. Within its golden sandstone walls are homes, temples, shops, and narrow streets bustling with activity. As the evening sun illuminates the fort, it glows like molten gold, earning Jaisalmer its reputation as the Golden City of India.",
          img: "/Jaisalmer.jpeg",
          carouselImages: ["/Jaisalmer.jpeg", "/jai1.jpeg","/jai2.jpeg", "/jai3.jpeg","/jai4.jpeg"],
          howToReach: "Jodhpur → NH-11 Desert Highway Route → Pokhran Corridor → Jaisalmer (285 km). Beautifully flat, empty desert views.",
          roadmap: ["Drive down the desert highway into the focal tri-junction circle", "Walk past the massive wooden gates into the active living fort zone", "Explore ancient multi-story Jain stone temples with intricate lattices", "Sip local tea on a fortress terrace as the stone turns deep gold"],
        },
        {
          name: "City Palace & Thar Desert Magic",
          location: "Udaipur & Thar Wilderness, Rajasthan",
          details: "Overlooking the serene waters of Lake Pichola, the City Palace of Udaipur combines elegance, history, and breathtaking scenery. Balconies, courtyards, and ornate halls offer glimpses into the luxurious lives of Rajasthan's royal families. At sunset, the palace and lake create a picture-perfect scene. No trip to Rajasthan is complete without venturing into the Thar Desert. Camel safaris across rolling sand dunes, traditional folk performances under star-filled skies, and unforgettable desert sunsets create experiences that stay with travelers long after they leave.",
          img: "/desert.jpeg",
          carouselImages: ["/desert.jpeg", "/road1.jpeg","/road22.jpeg","/road3.jpeg"],
          howToReach: "Udaipur Central / Jaisalmer to Sam Sand Dunes Desert Access Link Road Route (45 km).",
          roadmap: ["Drive out from Jaisalmer city towards Sam Sand Dunes village roads", "Check into a luxury desert camp or hop onto designated camel handlers", "Ride deep into the shifting crest lines for a clear wilderness sunset", "Return to camp for open-sky folk dances by local Kalbeliya artist troupes"],
        }
      ],
      note: "Keep small cash denominations handy for hiring local state-certified history guides at the fort counters and purchasing local authentic artwork.",
    }
  },
  {
    id: 5,
    title: "Leh: Where the Mountains Touch the Sky",
    desc: "It is more than a destination — it is an experience that changes the way you see nature. Travel to India's high-altitude wonderland of blue lakes and monasteries.",
    category: "HIGH-ALTITUDE ADVENTURE",
    image: "/Ladakh.jpeg",
    carouselImages: ["/leh1.jpeg",  "/leh3.jpeg", "/Ladakh.jpeg"],
    readTime: "9 min read",
    fullContent: {
      lede: "There are destinations that impress you, and then there are places that leave you speechless. Nestled between some of the world's highest mountain ranges, Leh–Ladakh is a land of turquoise lakes, ancient monasteries, dramatic roads, and landscapes so surreal they feel borrowed from another planet. Every turn reveals a new wonder, making Ladakh one of India's most unforgettable travel destination. It changes the way you see nature.",
      bestTime: "May to September (High mountain passes remain cleared of winter snow)",
      list: [
        {
          name: "Pangong Tso",
          location: "Ladakh, Jammu & Kashmir",
          details: "Beyond winding mountain roads lies a lake so stunning that it hardly seems real. Stretching across the Himalayas, Pangong Tso mesmerizes visitors with its ever-changing shades of blue. Depending on the sunlight and weather, the lake transforms from turquoise to deep sapphire, creating a spectacle that feels different every hour of the day. Surrounded by barren mountains and endless skies, it is one of Ladakh's most iconic sights.",
          img: "/pangong (2).jpeg",
          carouselImages: ["/pangong (2).jpeg", "/pa1.jpeg","/pa2.jpeg","/pa4.jpeg"],
          howToReach: "Leh Town Hub → Karu Junction Route → Chang La Pass Crossing → Pangong (225 km). Highly challenging mountain pass terrain.",
          roadmap: ["Leave Leh town before dawn to maintain optimal travel windows", "Cross Chang La pass (one of the highest motorable roads globally) safely", "Descend through remote high altitude marshlands into the alpine valley", "Witness the shifting sapphire shades of the landlocked salt lake"],
        },
        {
          name: "Nubra Valley",
          location: "Nubra Valley, Ladakh",
          details: "Imagine finding sand dunes in the middle of towering snow-capped mountains. Nubra Valley is a place of contrasts, where cold deserts, flowing rivers, and rugged peaks coexist in perfect harmony. Visitors can explore the dunes, ride the famous double-humped Bactrian camels, and experience a landscape unlike anywhere else in India.",
          img: "/nubra.jpeg",
          carouselImages: ["/nu5.jpeg", "/nu1.jpeg", "/nu2.jpeg", "/nu3.jpeg", "/nu4.jpeg"],
          howToReach: "Leh Town → Khardung La Pass Mountain Track Route → Diskit Town Junction (160 km). Steep vertical climbing switchbacks.",
          roadmap: ["Drive up the dramatic mountain cuts to reach Khardung La pass", "Descend slowly into the deep Shyok River basin flat fields", "Reach the expansive grey-toned Hunder Sand Dunes boundary parks", "Mount the double-humped Bactrian camel for a cold-desert caravan"],
        },
        {
          name: "Magnetic Hill",
          location: "Leh-Srinagar Highway, Ladakh",
          details: "Imagine stopping your vehicle on an empty mountain road and watching it slowly move uphill on its own. No engine. No pushing. Just silence, mountains, and a strange feeling that the road itself is pulling you forward. Magnetic Hill has become one of Ladakh’s most talked-about mysteries. Surrounded by barren mountains and endless skies, the place creates an illusion so strange that visitors often step out just to watch it happen again. But beyond the mystery, the journey itself is unforgettable — dramatic roads cutting through cold deserts, army trucks crossing distant valleys, and landscapes that feel untouched by modern life. In Ladakh, even the roads come with stories.",
          img: "/hiils.jpeg",
          carouselImages: ["/hiils.jpeg", "/ma1.jpeg", "/ma2.jpeg", "/ma3.jpeg","/ma4.jpeg"],
          howToReach: "Leh City Main Center → Srinagar-Leh NH-1 National Highway Route (30 km). Superb smooth mountain tarmac quality.",
          roadmap: ["Drive west from Leh town center along the smooth NH-1 highway", "Locate the marked yellow box zone painted on the mountain asphalt", "Shift vehicle gearbox into neutral and cut ignition systems completely", "Observe vehicle moving forward due to the natural optical slope illusion"],
        },
        {
          name: "Leh Palace",
          location: "Leh Town, Ladakh",
          details: "Standing high above Leh town, Leh Palace offers a glimpse into Ladakh's royal past. Built in the 17th century, the palace overlooks the surrounding mountains and valleys, providing breathtaking panoramic views. As the sun sets over the Himalayas, the palace becomes a perfect reminder of the region's rich history and enduring beauty.",
          img: "/palace.jpeg",
          carouselImages: ["/palace.jpeg", "/pal1.jpeg", "/pal2.jpeg","/pal3.jpeg"],
          howToReach: "Walkable or local cab approach from Main Leh Bazaar road limits up towards the historical ridge.",
          roadmap: ["Navigate up the steep walking paths from old Leh town corridors", "Enter the wooden structural gateway of the nine-story palace", "Explore historical royal living rooms and old Tibetan dynamic artifacts", "Reach the top open terrace exactly at sunset for a 360-degree high-altitude view"],
        }
      ],
      note: "Acclimatize completely in Leh town for at least 48 hours upon arrival to avoid severe acute mountain sickness (AMS).",
    }
  }
];

/* ─── IMAGE WITH FALLBACK ─── */
const Img = ({ src, alt, className, style }) => (
  <img
    src={src} alt={alt} className={className} style={style}
    onError={e => { e.target.style.background = '#e2e8f0'; e.target.src = ''; }}
  />
);

/* ─── BLOG CARD CAROUSEL ─── */
const BlogCardCarousel = ({ images, alt }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    timerRef.current = setInterval(next, 3000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const goTo = (idx) => {
    clearInterval(timerRef.current);
    setCurrent(idx);
    timerRef.current = setInterval(next, 3000);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Img src={images[current]} alt={`${alt} ${current + 1}`} className="w-full h-full object-cover" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent z-10" />

      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
            style={{
              width: i === current ? '22px' : '7px',
              height: '7px',
              borderRadius: '4px',
              background: i === current ? '#ffffff' : 'rgba(255,255,255,0.45)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.35s ease',
              flexShrink: 0,
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="absolute top-3 right-3 z-20 bg-black/40 backdrop-blur-sm text-white text-[10px] font-black px-2 py-0.5 rounded-md tracking-wide">
        {current + 1} / {images.length}
      </div>
    </div>
  );
};

/* ─── ARTICLE ITEM — Replaced single image with BlogCardCarousel ─── */
const ArticleItem = ({ item, number }) => {
  const isEven = number % 2 === 0;

  return (
    <div className="py-12 md:py-16 border-b border-slate-100 last:border-0">
      <div className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-stretch`}>

        {/* ── IMAGE CAROUSEL CONTAINER — Now identical setup to list view ── */}
        <div className="w-full md:w-[52%] flex-shrink-0 flex flex-col">
          <div
            className="relative overflow-hidden rounded-2xl bg-slate-100 w-full"
            style={{ minHeight: '340px', height: '100%', aspectRatio: '5/4' }}
          >
            {/* Added Carousel using fallback to single item image array if list has no sub-carousel images */}
            <BlogCardCarousel images={item.carouselImages || [item.img]} alt={item.name} />
          </div>
          <p className="mt-2 text-[11px] text-slate-400 font-medium">{item.name}, India</p>
        </div>

        {/* ── CONTENT — all data directly visible ── */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-5">

          {/* Number + Title */}
          <div className="flex items-center gap-4">
            <span
              className="flex-shrink-0 font-black select-none leading-none"
              style={{ fontSize: '3rem', color: '#2563eb', fontVariantNumeric: 'lining-nums' }}
            >
              {number}
            </span>
            <h2
              className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {item.name}
            </h2>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-blue-600 flex-shrink-0" />
            <p className="text-sm font-black text-slate-900">
              <span className="font-normal text-slate-600">{item.location}</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {item.details}
          </p>

          {/* How to Reach */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-800 font-black text-[10px] uppercase tracking-wide">
              <Navigation size={12} className="text-blue-600" />
              How to Reach
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{item.howToReach}</p>
          </div>

          {/* Roadmap */}
          <div>
            <p className="text-[10px] uppercase tracking-wider font-black text-slate-400 mb-2.5">Step-by-Step Route</p>
            <div className="space-y-2">
              {item.roadmap.map((step, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-slate-600">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white font-black flex items-center justify-center mt-0.5 text-[10px]">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed pt-0.5">{step}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ─── MORE ARTICLES — Greenish background changed to an elegant light blue ─── */
const MoreArticles = ({ currentId, onSelect }) => {
  const others = blogs.filter(b => b.id !== currentId).slice(0, 3);
  return (
    <section className="py-14 md:py-20 bg-sky-100/80">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <h3
          className="text-3xl md:text-4xl font-black text-slate-800 mb-8 md:mb-10"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          More articles like this
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {others.map(b => (
            <button
              key={b.id}
              onClick={() => { window.scrollTo(0, 0); onSelect(b); }}
              className="relative overflow-hidden rounded-2xl group text-left border-0 p-0 bg-transparent cursor-pointer"
              style={{ aspectRatio: '3/4' }}
            >
              <Img src={b.image} alt={b.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="inline-block bg-black/40 backdrop-blur-sm text-white text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md">
                  {b.category}
                </span>
              </div>
              <div className="absolute bottom-5 left-4 right-4">
                <p className="text-white font-black text-sm md:text-base leading-snug"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                  {b.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── BLOG DETAIL PAGE ─── */
const BlogDetail = ({ blog, onBack, onSelect }) => (
  <motion.div
    key={`detail-${blog.id}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="bg-white min-h-screen"
  >
    {/* HERO */}
    <div className="relative w-full overflow-hidden flex flex-col justify-end" style={{ height: '64vh', minHeight: 420 }}>
      <Img src={blog.image} alt={blog.title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

      <div className="relative z-10 max-w-4xl w-full mx-auto px-4 md:px-8 pb-8 md:pb-10">
        <span className="text-white/70 font-black text-[10px] uppercase tracking-widest block mb-2">{blog.category}</span>
        <h1
          className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-xl mb-4"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
          <div className="flex items-center gap-4 text-white/70 text-xs">
            <span className="flex items-center gap-1.5"><Clock size={13} /> {blog.readTime}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} /> Best time: {blog.fullContent.bestTime.split(' (')[0]}</span>
          </div>

          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white font-black text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-md cursor-pointer"
          >
            <ArrowLeft size={12} /> Back to Blogs
          </button>
        </div>
      </div>
    </div>

    {/* ARTICLE BODY */}
    <div className="max-w-5xl mx-auto px-4 md:px-8">
      <div className="pt-10 md:pt-14 pb-8 border-b border-slate-100">
        <p
          className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {blog.fullContent.lede}
        </p>
        <div className="mt-5 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Best time to visit:</span>
          <span className="text-xs font-black text-slate-700">{blog.fullContent.bestTime}</span>
        </div>
      </div>

      <div>
        {blog.fullContent.list.map((item, i) => (
          <ArticleItem key={i} item={item} number={i + 1} />
        ))}
      </div>

      <div className="my-10 md:my-14 p-6 bg-blue-600 text-white rounded-2xl">
        <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70">Travel Advisory</p>
        <p className="text-sm md:text-base font-semibold leading-relaxed">{blog.fullContent.note}</p>
      </div>
    </div>

    <MoreArticles currentId={blog.id} onSelect={onSelect} />
  </motion.div>
);

/* ─── BLOG LISTING PAGE — Images aspect updated to 4/5 for maximum length and premium vertical height ─── */
const BlogList = ({ onSelect }) => (
  <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

    {/* Hero */}
    <div className="relative w-full h-screen bg-[#0f172a] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/heroblog.jpeg')" }} />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/60 via-transparent to-[#0f172a]/40" />
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex flex-col items-center mb-6 mt-8 px-6 py-2 border border-white/10 backdrop-blur-md bg-white/5"
        >
          <span className="text-white font-serif text-xl md:text-2xl font-bold tracking-tight italic text-center leading-tight">
            Incredible <span className="text-blue-500 font-sans not-italic font-black">!</span>ndia
          </span>
          <span className="text-[7px] md:text-[8px] text-blue-400 font-black uppercase tracking-[0.3em] mt-1">
            Travel Chronicles & Insights
          </span>
        </motion.div>
        <motion.h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">
          BLOG
        </motion.h1>
      </div>
    </div>

    {/* Blog Cards */}
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-16 md:space-y-24">
      {blogs.map((blog, i) => (
        <motion.div
          key={blog.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-12`}
        >
          {/* IMAGE CONTAINER — aspect-[5/5] */}
          <div className="w-full md:w-[48%] relative overflow-hidden shadow-xl rounded-xl aspect-[5/5] bg-slate-100 flex-shrink-0">
            <BlogCardCarousel images={blog.carouselImages || [blog.image]} alt={blog.title} />
          </div>

          {/* TEXT — Vertically centers beautifully against the tall image format */}
          <div className={`w-full md:flex-1 relative ${i % 2 === 0 ? 'text-left' : 'text-right'}`}>
            <div className={`absolute top-0 ${i % 2 === 0 ? 'left-0' : 'right-0'} w-8 md:w-12 h-8 md:h-12 border-t-2 ${i % 2 === 0 ? 'border-l-2' : 'border-r-2'} border-blue-600`} />

            <div className="pt-6 px-2 md:px-4">
              <div className={`flex items-center gap-3 mb-2 ${i % 2 !== 0 ? 'justify-end' : ''}`}>
                {i % 2 === 0 && (
                  <span className="text-2xl font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100 select-none">
                    {i + 1}
                  </span>
                )}
                <p className="text-blue-600 font-bold text-[8px] md:text-[9px] tracking-widest uppercase">
                  {blog.category}
                </p>
                {i % 2 !== 0 && (
                  <span className="text-2xl font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100 select-none">
                    {i + 1}
                  </span>
                )}
              </div>

              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase mb-3 leading-tight tracking-tight">
                {blog.title}
              </h2>
              <p className="text-xs font-medium text-slate-500 leading-relaxed mb-5">
                {blog.desc}
              </p>

              <button
                onClick={() => onSelect(blog)}
                className={`flex items-center gap-2 text-slate-900 font-black text-[9px] md:text-[10px] uppercase border-b-2 border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all ${i % 2 !== 0 ? 'ml-auto' : ''}`}
              >
                Read More <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

/* ─── ROOT ─── */
const BlogPage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleSelect = (blog) => { window.scrollTo(0, 0); setSelectedBlog(blog); };
  const handleBack = () => { window.scrollTo(0, 0); setSelectedBlog(null); };

  return (
    <div className="bg-[#fcfdfe] min-h-screen font-sans text-slate-700 selection:bg-blue-100">
      <AnimatePresence mode="wait">
        {!selectedBlog ? (
          <BlogList key="list" onSelect={handleSelect} />
        ) : (
          <BlogDetail key={`detail-${selectedBlog.id}`} blog={selectedBlog} onBack={handleBack} onSelect={handleSelect} />
        )}
      </AnimatePresence>
    </div>
  );
};

=======
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ExternalLink, Calendar, Clock, X, MapPin, Navigation } from 'lucide-react';

const blogs = [
  {
    id: 1,
    title: "3 Chola Temples in Tamil Nadu That Feel Beyond Human",
    desc: "There are places in Tamil Nadu where granite sings, shadows predict time, and kings built temples so powerful that even after 1000 years, they still dominate the skyline.",
    category: "ARCHITECTURAL MARVELS",
    image: "/chola.jpeg",
    carouselImages: ["/aira.jpeg", "/Briha.jpeg", "/GANGAI.jpeg", "/south.jpeg"],
    readTime: "8 min read",
    fullContent: {
      lede: "Tamil Nadu's Chola temples aren't just monuments — they are living institutions where devotion, mathematics, and art were fused into stone over a thousand years ago. These three UNESCO-listed marvels represent the absolute pinnacle of Dravidian temple architecture.",
      bestTime: "November to February (Pleasant winter winds)",
      list: [
        {
          name: "Brihadisvara Temple",
          location: "Thanjavur, Tamil Nadu",
          details: "Imagine standing in Thanjavur 1000 years ago. The sound of chisels echoes across the city. Hundreds of workers pull gigantic stones under the burning sun while Raja Raja Chola watches his dream rise into the sky. Oil lamps flicker at night, priests chant inside unfinished halls, and slowly — a mountain of granite becomes one of the greatest temples India has ever seen. The 66-metre vimana (tower) was the tallest structure in the Indian subcontinent at the time of its completion in 1010 CE. Even after centuries of storms, invasions, and changing kingdoms, the temple stands untouched in pride, carrying ancient Tamil inscriptions, giant sculptures, and the powerful silence of an empire that once ruled the seas.",
          img: "/Briha.jpeg",
          howToReach: "Trichy Airport → NH-83 Highway Route → Thanjavur City Center (55 km). The highways offer seamless four-lane road connectivity.",
          roadmap: ["Arrive at Thanjavur Junction/Trichy Hub", "Take local highway transit to the Grand Temple Complex", "Marvel at the massive 66-meter towering Vimana rocket structure", "Explore ancient Tamil inscriptions & hidden inner sanctuary frescoes"],
        },
        {
          name: "Gangaikonda Cholapuram",
          location: "Ariyalur District, Tamil Nadu",
          details: "Rajendra Chola conquered lands so far north that he brought back water from the Ganges — and built an entire city to celebrate it. Today, Gangaikonda Cholapuram carries a strange and unforgettable atmosphere. The temple feels calm, powerful, and almost abandoned by time itself. Its elegant curves, giant Shiva lingam, lion well, and quiet courtyards create the feeling of walking through the remains of a once unstoppable empire. Unlike crowded tourist spots, this temple whispers its history slowly — rewarding visitors who pause long enough to listen.",
          img: "/GANGAI.jpeg",
          howToReach: "Kumbakonam → Anaikkarai Bridge Route → Gangaikonda Cholapuram Highway (34 km). Well maintained dual-carriageway setup.",
          roadmap: ["Reach Kumbakonam or Ariyalur hub via highway or rail", "Hire private cab or state transport towards Jayankondam route", "Walk through the pristine uncrowded lawn perimeter to the sanctum", "Visit the unique Simhakeni (Lion Well) and check structural symmetries"],
        },
        {
          name: "Airavatesvara Temple",
          location: "Darasuram, Kumbakonam",
          details: "Long before modern optical illusions appeared in books and galleries, Chola sculptors were already challenging the human eye. Hidden within Airavatesvara Temple is a fascinating bull-and-elephant carving where two animals share a single head. Depending on the angle from which it is viewed, the sculpture appears as either a bull or an elephant. More than 800 years after it was carved, this ingenious creation remains one of the temple's most intriguing attractions and a testament to the brilliance of Chola artistry. Walking through Darasuram feels less like visiting a monument and more like discovering a forgotten world where art, music, and devotion were carved together forever.",
          img: "/aira.jpeg",
          howToReach: "Kumbakonam Central Stand → Local Darasuram Bypass Road Route (4 km). Extremely short but busy road approach.",
          roadmap: ["Arrive at Kumbakonam central junction point", "Take a short 10-minute road trip down to Darasuram village limits", "Observe the iconic horse-drawn chariot structural design foundations", "Locate the optical illusion carving and test acoustic musical stone steps"],
        }
      ],
      note: "Respect the sacred guidelines of these living ancient heritage installations by walking barefoot over the stone courtyards.",
    }
  },
  {
    id: 2,
    title: "Where Moonlight Dances on Salt: The Magic of Rann Utsav",
    desc: "As the sun sets over the salt desert, the festival grounds come alive with the sounds of drums, folk songs, and traditional dances from Gujarat.",
    category: "DESERT FESTIVAL SPECIAL",
    image: "/rann.jpeg",
    carouselImages: ["/rann.jpeg", "/rann1.jpeg", "/rann2.jpeg", "/rann3.jpeg"],
    readTime: "7 min read",
    fullContent: {
      lede: "There are few places in the world where a barren desert transforms into a celebration of color, music, and culture. Every year, as winter arrives in Gujarat, the vast white salt desert of Kutch becomes the stage for Rann Utsav—a festival unlike any other. Beneath endless skies, visitors witness folk performances, vibrant handicrafts, traditional cuisine, and breathtaking sunsets that paint the horizon in shades of gold and crimson. But the true magic begins after dark, when moonlight reflects off the white salt plains, turning the landscape into a glowing wonderland that feels almost otherworldly. This is not just a festival; it is an experience that captures the spirit of Kutch in its most spectacular form.",
      bestTime: "November to February (Specially during Full Moon cycles)",
      list: [
        {
          name: "White Rann Plains & Full Moon Magic",
          location: "Dhordo, Kutch, Gujarat",
          details: "The White Rann is the highlight of the festival. As sunlight touches the endless salt plains, the landscape transforms into a dazzling white canvas stretching to the horizon. During sunset, the desert glows with shades of gold, orange, and pink. One of the most memorable experiences is seeing the White Rann under moonlight. On full moon nights, the salt desert reflects the moon's glow, creating a surreal landscape that feels almost magical.",
          img: "/rannmoon.jpeg",
          howToReach: "Bhuj City Hub → Bhada/Khavda Road Route → Dhordo Checkpost Corridor (80 km). Clear flat tarred highway tracks.",
          roadmap: ["Land at Bhuj Airport/Station Hub", "Drive straight north via Bhuj-Khavda highway road", "Present security documents at Dhordo Checkpost window", "Walk into the sprawling white crystallised salt flatlands"],
        },
        {
          name: "Traditional Folk Performances & Handicrafts",
          location: "Dhordo Tent City, Kutch",
          details: "As the sun sets over the salt desert, the festival grounds come alive with the sounds of drums, folk songs, and traditional dances from Gujarat. Dancers in colorful attire spin gracefully under the open sky while musicians bring centuries-old traditions to life. Alongside, the handicraft markets of Kutch are a vibrant showcase of the region's rich artistic heritage. As you stroll through the bustling stalls, you'll discover beautifully embroidered textiles, handcrafted jewellery, colorful Bandhani fabrics, leather products, and a variety of traditional Kutchi handicrafts.",
          img: "/tentcity.jpeg",
          howToReach: "Dhordo Tent City Premises → Inner Festival Event Loops & Haat Courtyards. Accessible via walking tracks.",
          roadmap: ["Enter main cultural arena pavilion at sunset hour", "Take seats for evening energetic Garba & Kutchi musical recitals", "Stroll through local government-approved artisan craft stalls", "Interact with National Award-winning embroidery families directly"],
        },
        {
          name: "Authentic Kutchi Culinary Journey",
          location: "Dhordo Village, Kutch",
          details: "No visit to Rann Utsav is complete without experiencing the flavors of Kutch. The festival offers a delightful journey through Gujarat's culinary traditions, where every dish is prepared with recipes passed down through generations. Visitors can savor local favorites such as the spicy and flavorful Kutchi Dabeli, wholesome Bajra Rotla, comforting Kadhi, and traditional Gujarati thalis filled with a variety of regional delicacies. From simple village-style meals to festive specialties, every bite reflects the warmth, hospitality, and rich cultural heritage of Gujarat.",
          img: "/rannfood.jpeg",
          howToReach: "Tent City Dining Halls / Local Dhordo Village Food Courtyards via Border Highway Hubs.",
          roadmap: ["Locate authentic dining commons or village-style seating areas", "Order slow-cooked traditional clay-pot preparation meals", "Try hot buttery Bajra Rotla topped with authentic garlic chutney paste", "Conclude with fresh Kutchi sweets and local buttermilk drinks"],
        }
      ],
      note: "The White Rann is located near India's border with Pakistan, so all visitors (Indians and foreigners) need a mandatory Special Permit to enter the White Rann area near Dhordo online or at the checkpost counter.",
    }
  },
  {
    id: 3,
    title: "Hampi: Walking Through the Ruins of a Lost Empire",
    desc: "Empires rise and fall, but Hampi refuses to be forgotten. Scattered across a surreal landscape of giant boulders, walk through the capital remnants of the majestic Vijayanagara Empire.",
    category: "UNESCO WORLD HERITAGE",
    image: "/hampi.jpeg",
    carouselImages: ["/Hampi1.jpeg", "/Hampi2.jpeg", "/Hampi3.jpeg", "/hampi.jpeg"],
    readTime: "10 min read",
    fullContent: {
      lede: "There are places that tell stories, and then there are places like Hampi that seem to whisper them from every stone. Scattered across a surreal landscape of giant boulders and ancient ruins, Hampi was once the glorious capital of the Vijayanagara Empire—one of the richest and most powerful kingdoms in Indian history. Today, its temples, markets, and monuments stand as silent reminders of a civilization that dazzled travelers from around the world.",
      bestTime: "October to March (Cool breezes avoid scorching rock temperatures)",
      list: [
        {
          name: "Virupaksha Temple",
          location: "Hampi Bazaar, Karnataka",
          details: "Long before Hampi became a UNESCO World Heritage Site, prayers were already echoing through the halls of Virupaksha Temple. Dedicated to Lord Shiva, this sacred temple remains an active place of worship even after centuries of political change and historical upheaval. Its towering gopuram welcomes visitors into a world where devotion, architecture, and history exist side by side.",
          img: "/viru.jpeg",
          howToReach: "Bengaluru Hub → Chitradurga → Hospet → Hampi (approx. 340 km via NH-48 and NH-50). Travel time is roughly 6–7 hours.",
          roadmap: ["Navigate from Hospet town directly to Hampi Bazaar Road", "Pass through the massive outer stone gateway structures", "Explore the active inner worship chambers and old courtyard corridors", "Interact with the temple elephant and see the inverted shadow camera obscura system"],
        },
        {
          name: "The Stone Chariot",
          location: "Vittala Temple Complex, Hampi",
          details: "Perhaps no monument represents Hampi better than the famous Stone Chariot. Carved with extraordinary precision, this architectural masterpiece has become one of India's most recognized heritage symbols. Though it appears ready to roll forward, the chariot has stood still for centuries, captivating visitors with its craftsmanship and timeless structural beauty.",
          img: "/stone.jpeg",
          howToReach: "Hampi Main Road → Vittala Temple Complex Walkway Route via Battery Operated Carts.",
          roadmap: ["Reach the outer parking boundaries of the safe monument zones", "Board an eco-friendly golf cart or take the scenic riverside trek track", "Enter the main courtyard of the iconic stone chariot enclosure", "Examine closely the detailed carvings on the wheels and monolithic elephant guards"],
        },
        {
          name: "Vittala Temple Pillars",
          location: "Vittala Temple, Hampi",
          details: "What if a temple could make music? The Vittala Temple is renowned for its legendary musical pillars, which have fascinated visitors and historians alike. Every carving, corridor, and pillar reflects the artistic excellence of the Vijayanagara era, showcasing a level of detail that continues to inspire awe. The monolithic granite pillars emit distinct frequencies when lightly tapped.",
          img: "/vittala.jpeg",
          howToReach: "Hampi Bazaar → River Bank Walking Trail → Vittala Compound Access Line.",
          roadmap: ["Enter the open-air maha-mandapa stone hall complex setup", "Observe the 56 massive structural pillars carved out of solid mountain stone", "Study how minor taps generate accurate musical frequencies across chambers", "Photograph the delicate stone roof eaves designed like flowing wood panels"],
        },
        {
          name: "Hemakuta Hill",
          location: "Near Virupaksha Temple, Hampi",
          details: "As the sun begins to set, Hemakuta Hill offers one of the most breathtaking views in Hampi. From its summit, visitors can watch the golden light spread across temples, ruins, and giant boulders that stretch endlessly across the landscape. It is the perfect place to appreciate the scale and grandeur of what was once a thriving imperial capital.",
          img: "/Hemakuta.jpeg",
          howToReach: "Adjacent to Virupaksha Temple Complex western gates → Marked Rock Steps Climbing Route.",
          roadmap: ["Begin gentle upward rocky trek an hour before the targeted sunset schedule", "Pass by the distinct double-storied monolithic stone pavilions on top", "Find a quiet ledge overlooking the sprawling green banana plantations", "Watch the golden sun dip behind the dramatic boulder-strewn horizon line"],
        }
      ],
      note: "Wear strong traction footwear as exploring Hampi involves substantial walking and climbing over ancient, uneven rock boulders.",
    }
  },
  {
    id: 4,
    title: "Rajasthan: Where Every Fort Has a Story and Every Sunset Feels Royal",
    desc: "Some destinations are visited. Rajasthan is experienced. Step into a grand historical epic filled with golden deserts, magnificent hilltop forts, and palaces.",
    category: "ROYAL INDULGENCE",
    image: "/Rajasthan.jpeg",
    carouselImages: ["/Rajasthan.jpeg", "/raj1.jpeg", "/raj2.jpeg", "/raj3.jpeg"],
    readTime: "11 min read",
    fullContent: {
      lede: "From golden deserts and magnificent forts to vibrant bazaars and royal palaces, Rajasthan feels like stepping into the pages of a grand historical epic. Every city has its own character, every monument its own legend, and every journey its own unforgettable memory. Some destinations are visited. Rajasthan is experienced.",
      bestTime: "November to February (Avoids harsh desert summer heatwaves)",
      list: [
        {
          name: "Amber Fort",
          location: "Amer, Jaipur, Rajasthan",
          details: "Rising above the rugged hills of Jaipur, Amber Fort is a masterpiece of Rajput architecture. As visitors walk through its grand gateways, mirrored halls, and royal courtyards, it is easy to imagine the era when kings, warriors, and nobles filled these spaces. The fort's commanding views over the surrounding landscape reveal why it was once one of Rajasthan's most important strongholds.",
          img: "/amber.jpeg",
          howToReach: "Delhi → NH-48 Expressway Route → Jaipur Outer Amer Road Bypass Corridor (260 km). Dynamic six-lane road link.",
          roadmap: ["Drive through Jaipur old pink city gates north towards Amer village", "Ascend the fort stone pathways via jeep transit or walking ramps", "Enter the Diwan-i-Aam and explore Sheesh Mahal glass reflections", "Look down upon the manicured floating saffron gardens on Maota lake"],
        },
        {
          name: "Mehrangarh Fort",
          location: "Jodhpur, Rajasthan",
          details: "Perched high above Jodhpur, Mehrangarh Fort dominates the skyline like a giant stone crown. Behind its massive walls lie palaces, museums, and centuries of royal history. From the fort's ramparts, visitors can admire the famous blue houses of Jodhpur stretching endlessly below, creating one of Rajasthan's most iconic views.",
          img: "/mehra.jpeg",
          howToReach: "Jaipur → NH-25 National Highway Route → Jodhpur Blue City Link Road (340 km). Standard multi-lane tar tracks.",
          roadmap: ["Drive up the steep winding mountain road to Fort main entry", "Pass through the historical Jai Pol gate with old battle scars", "Tour museum galleries showcasing royal elephant howdahs and weaponry", "Walk to the cliff lookout to photograph cobalt blue houses below"],
        },
        {
          name: "Jaisalmer Fort",
          location: "Jaisalmer, Rajasthan",
          details: "Unlike many historic forts that stand abandoned, Jaisalmer Fort remains alive. Within its golden sandstone walls are homes, temples, shops, and narrow streets bustling with activity. As the evening sun illuminates the fort, it glows like molten gold, earning Jaisalmer its reputation as the Golden City of India.",
          img: "/Jaisalmer.jpeg",
          howToReach: "Jodhpur → NH-11 Desert Highway Route → Pokhran Corridor → Jaisalmer (285 km). Beautifully flat, empty desert views.",
          roadmap: ["Drive down the desert highway into the focal tri-junction circle", "Walk past the massive wooden gates into the active living fort zone", "Explore ancient multi-story Jain stone temples with intricate lattices", "Sip local tea on a fortress terrace as the stone turns deep gold"],
        },
        {
          name: "City Palace & Thar Desert Magic",
          location: "Udaipur & Thar Wilderness, Rajasthan",
          details: "Overlooking the serene waters of Lake Pichola, the City Palace of Udaipur combines elegance, history, and breathtaking scenery. Balconies, courtyards, and ornate halls offer glimpses into the luxurious lives of Rajasthan's royal families. At sunset, the palace and lake create a picture-perfect scene. No trip to Rajasthan is complete without venturing into the Thar Desert. Camel safaris across rolling sand dunes, traditional folk performances under star-filled skies, and unforgettable desert sunsets create experiences that stay with travelers long after they leave.",
          img: "/desert.jpeg",
          howToReach: "Udaipur Central / Jaisalmer to Sam Sand Dunes Desert Access Link Road Route (45 km).",
          roadmap: ["Drive out from Jaisalmer city towards Sam Sand Dunes village roads", "Check into a luxury desert camp or hop onto designated camel handlers", "Ride deep into the shifting crest lines for a clear wilderness sunset", "Return to camp for open-sky folk dances by local Kalbeliya artist troupes"],
        }
      ],
      note: "Keep small cash denominations handy for hiring local state-certified history guides at the fort counters and purchasing local authentic artwork.",
    }
  },
  {
    id: 5,
    title: "Leh: Where the Mountains Touch the Sky",
    desc: "It is more than a destination — it is an experience that changes the way you see nature. Travel to India's high-altitude wonderland of blue lakes and monasteries.",
    category: "HIGH-ALTITUDE ADVENTURE",
    image: "/Ladakh.jpeg",
    carouselImages: ["/leh1.jpeg", "/leh2.jpeg", "/leh3.jpeg", "/Ladakh.jpeg"],
    readTime: "9 min read",
    fullContent: {
      lede: "There are destinations that impress you, and then there are places that leave you speechless. Nestled between some of the world's highest mountain ranges, Leh–Ladakh is a land of turquoise lakes, ancient monasteries, dramatic roads, and landscapes so surreal they feel borrowed from another planet. Every turn reveals a new wonder, making Ladakh one of India's most unforgettable travel destination. It changes the way you see nature.",
      bestTime: "May to September (High mountain passes remain cleared of winter snow)",
      list: [
        {
          name: "Pangong Tso",
          location: "Ladakh, Jammu & Kashmir",
          details: "Beyond winding mountain roads lies a lake so stunning that it hardly seems real. Stretching across the Himalayas, Pangong Tso mesmerizes visitors with its ever-changing shades of blue. Depending on the sunlight and weather, the lake transforms from turquoise to deep sapphire, creating a spectacle that feels different every hour of the day. Surrounded by barren mountains and endless skies, it is one of Ladakh's most iconic sights.",
          img: "/pangong (2).jpeg",
          howToReach: "Leh Town Hub → Karu Junction Route → Chang La Pass Crossing → Pangong (225 km). Highly challenging mountain pass terrain.",
          roadmap: ["Leave Leh town before dawn to maintain optimal travel windows", "Cross Chang La pass (one of the highest motorable roads globally) safely", "Descend through remote high altitude marshlands into the alpine valley", "Witness the shifting sapphire shades of the landlocked salt lake"],
        },
        {
          name: "Nubra Valley",
          location: "Nubra Valley, Ladakh",
          details: "Imagine finding sand dunes in the middle of towering snow-capped mountains. Nubra Valley is a place of contrasts, where cold deserts, flowing rivers, and rugged peaks coexist in perfect harmony. Visitors can explore the dunes, ride the famous double-humped Bactrian camels, and experience a landscape unlike anywhere else in India.",
          img: "/nubra.jpeg",
          howToReach: "Leh Town → Khardung La Pass Mountain Track Route → Diskit Town Junction (160 km). Steep vertical climbing switchbacks.",
          roadmap: ["Drive up the dramatic mountain cuts to reach Khardung La pass", "Descend slowly into the deep Shyok River basin flat fields", "Reach the expansive grey-toned Hunder Sand Dunes boundary parks", "Mount the double-humped Bactrian camel for a cold-desert caravan"],
        },
        {
          name: "Magnetic Hill",
          location: "Leh-Srinagar Highway, Ladakh",
          details: "Imagine stopping your vehicle on an empty mountain road and watching it slowly move uphill on its own. No engine. No pushing. Just silence, mountains, and a strange feeling that the road itself is pulling you forward. Magnetic Hill has become one of Ladakh’s most talked-about mysteries. Surrounded by barren mountains and endless skies, the place creates an illusion so strange that visitors often step out just to watch it happen again. But beyond the mystery, the journey itself is unforgettable — dramatic roads cutting through cold deserts, army trucks crossing distant valleys, and landscapes that feel untouched by modern life. In Ladakh, even the roads come with stories.",
          img: "/hiils.jpeg",
          howToReach: "Leh City Main Center → Srinagar-Leh NH-1 National Highway Route (30 km). Superb smooth mountain tarmac quality.",
          roadmap: ["Drive west from Leh town center along the smooth NH-1 highway", "Locate the marked yellow box zone painted on the mountain asphalt", "Shift vehicle gearbox into neutral and cut ignition systems completely", "Observe vehicle moving forward due to the natural optical slope illusion"],
        },
        {
          name: "Leh Palace",
          location: "Leh Town, Ladakh",
          details: "Standing high above Leh town, Leh Palace offers a glimpse into Ladakh's royal past. Built in the 17th century, the palace overlooks the surrounding mountains and valleys, providing breathtaking panoramic views. As the sun sets over the Himalayas, the palace becomes a perfect reminder of the region's rich history and enduring beauty.",
          img: "/palace.jpeg",
          howToReach: "Walkable or local cab approach from Main Leh Bazaar road limits up towards the historical ridge.",
          roadmap: ["Navigate up the steep walking paths from old Leh town corridors", "Enter the wooden structural gateway of the nine-story palace", "Explore historical royal living rooms and old Tibetan dynamic artifacts", "Reach the top open terrace exactly at sunset for a 360-degree high-altitude view"],
        }
      ],
      note: "Acclimatize completely in Leh town for at least 48 hours upon arrival to avoid severe acute mountain sickness (AMS).",
    }
  }
];

/* ─── IMAGE WITH FALLBACK ─── */
const Img = ({ src, alt, className, style }) => (
  <img
    src={src} alt={alt} className={className} style={style}
    onError={e => { e.target.style.background = '#e2e8f0'; e.target.src = ''; }}
  />
);

/* ─── BLOG CARD CAROUSEL ─── */
const BlogCardCarousel = ({ images, alt }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    timerRef.current = setInterval(next, 3000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const goTo = (idx) => {
    clearInterval(timerRef.current);
    setCurrent(idx);
    timerRef.current = setInterval(next, 3000);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Img src={images[current]} alt={`${alt} ${current + 1}`} className="w-full h-full object-cover" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent z-10" />

      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
            style={{
              width: i === current ? '22px' : '7px',
              height: '7px',
              borderRadius: '4px',
              background: i === current ? '#ffffff' : 'rgba(255,255,255,0.45)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.35s ease',
              flexShrink: 0,
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="absolute top-3 right-3 z-20 bg-black/40 backdrop-blur-sm text-white text-[10px] font-black px-2 py-0.5 rounded-md tracking-wide">
        {current + 1} / {images.length}
      </div>
    </div>
  );
};

/* ─── ARTICLE ITEM — no modal, all data inline beside image ─── */
const ArticleItem = ({ item, number }) => {
  const isEven = number % 2 === 0;

  return (
    <div className="py-12 md:py-16 border-b border-slate-100 last:border-0">
      <div className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-stretch`}>

        {/* ── IMAGE — bigger, fixed height ── */}
        <div className="w-full md:w-[52%] flex-shrink-0 flex flex-col">
          <div
            className="relative overflow-hidden rounded-2xl bg-slate-100 w-full"
            style={{ minHeight: '340px', height: '100%' }}
          >
            <Img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <p className="mt-2 text-[11px] text-slate-400 font-medium">{item.name}, India</p>
        </div>

        {/* ── CONTENT — all data directly visible ── */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-5">

          {/* Number + Title */}
          <div className="flex items-center gap-4">
            <span
              className="flex-shrink-0 font-black select-none leading-none"
              style={{ fontSize: '3rem', color: '#2563eb', fontVariantNumeric: 'lining-nums' }}
            >
              {number}
            </span>
            <h2
              className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {item.name}
            </h2>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-blue-600 flex-shrink-0" />
            <p className="text-sm font-black text-slate-900">
              <span className="font-normal text-slate-600">{item.location}</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {item.details}
          </p>

          {/* How to Reach */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-800 font-black text-[10px] uppercase tracking-wide">
              <Navigation size={12} className="text-blue-600" />
              How to Reach
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{item.howToReach}</p>
          </div>

          {/* Roadmap */}
          <div>
            <p className="text-[10px] uppercase tracking-wider font-black text-slate-400 mb-2.5">Step-by-Step Route</p>
            <div className="space-y-2">
              {item.roadmap.map((step, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-slate-600">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white font-black flex items-center justify-center mt-0.5 text-[10px]">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed pt-0.5">{step}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ─── MORE ARTICLES — Greenish background changed to an elegant light blue ─── */
const MoreArticles = ({ currentId, onSelect }) => {
  const others = blogs.filter(b => b.id !== currentId).slice(0, 3);
  return (
    <section className="py-14 md:py-20 bg-sky-100/80">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <h3
          className="text-3xl md:text-4xl font-black text-slate-800 mb-8 md:mb-10"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          More articles like this
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {others.map(b => (
            <button
              key={b.id}
              onClick={() => { window.scrollTo(0, 0); onSelect(b); }}
              className="relative overflow-hidden rounded-2xl group text-left border-0 p-0 bg-transparent cursor-pointer"
              style={{ aspectRatio: '3/4' }}
            >
              <Img src={b.image} alt={b.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="inline-block bg-black/40 backdrop-blur-sm text-white text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md">
                  {b.category}
                </span>
              </div>
              <div className="absolute bottom-5 left-4 right-4">
                <p className="text-white font-black text-sm md:text-base leading-snug"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                  {b.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── BLOG DETAIL PAGE ─── */
const BlogDetail = ({ blog, onBack, onSelect }) => (
  <motion.div
    key={`detail-${blog.id}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="bg-white min-h-screen"
  >
    {/* HERO */}
    <div className="relative w-full overflow-hidden flex flex-col justify-end" style={{ height: '64vh', minHeight: 420 }}>
      <Img src={blog.image} alt={blog.title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

      <div className="relative z-10 max-w-4xl w-full mx-auto px-4 md:px-8 pb-8 md:pb-10">
        <span className="text-white/70 font-black text-[10px] uppercase tracking-widest block mb-2">{blog.category}</span>
        <h1
          className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-xl mb-4"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
          <div className="flex items-center gap-4 text-white/70 text-xs">
            <span className="flex items-center gap-1.5"><Clock size={13} /> {blog.readTime}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} /> Best time: {blog.fullContent.bestTime.split(' (')[0]}</span>
          </div>

          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white font-black text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-md cursor-pointer"
          >
            <ArrowLeft size={12} /> Back to Blogs
          </button>
        </div>
      </div>
    </div>

    {/* ARTICLE BODY */}
    <div className="max-w-5xl mx-auto px-4 md:px-8">
      <div className="pt-10 md:pt-14 pb-8 border-b border-slate-100">
        <p
          className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {blog.fullContent.lede}
        </p>
        <div className="mt-5 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Best time to visit:</span>
          <span className="text-xs font-black text-slate-700">{blog.fullContent.bestTime}</span>
        </div>
      </div>

      <div>
        {blog.fullContent.list.map((item, i) => (
          <ArticleItem key={i} item={item} number={i + 1} />
        ))}
      </div>

      <div className="my-10 md:my-14 p-6 bg-blue-600 text-white rounded-2xl">
        <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70">Travel Advisory</p>
        <p className="text-sm md:text-base font-semibold leading-relaxed">{blog.fullContent.note}</p>
      </div>
    </div>

    <MoreArticles currentId={blog.id} onSelect={onSelect} />
  </motion.div>
);

/* ─── BLOG LISTING PAGE — Images aspect updated to 4/5 for maximum length and premium vertical height ─── */
const BlogList = ({ onSelect }) => (
  <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

    {/* Hero */}
    <div className="relative w-full h-screen bg-[#0f172a] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/heroblog.jpeg')" }} />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/60 via-transparent to-[#0f172a]/40" />
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex flex-col items-center mb-6 mt-8 px-6 py-2 border border-white/10 backdrop-blur-md bg-white/5"
        >
          <span className="text-white font-serif text-xl md:text-2xl font-bold tracking-tight italic text-center leading-tight">
            Incredible <span className="text-blue-500 font-sans not-italic font-black">!</span>ndia
          </span>
          <span className="text-[7px] md:text-[8px] text-blue-400 font-black uppercase tracking-[0.3em] mt-1">
            Travel Chronicles & Insights
          </span>
        </motion.div>
        <motion.h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">
          BLOG
        </motion.h1>
      </div>
    </div>

    {/* Blog Cards */}
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-16 md:space-y-24">
      {blogs.map((blog, i) => (
        <motion.div
          key={blog.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-12`}
        >
          {/* IMAGE CONTAINER — aspect-[5/5] */}
          <div className="w-full md:w-[48%] relative overflow-hidden shadow-xl rounded-xl aspect-[5/5] bg-slate-100 flex-shrink-0">
            <BlogCardCarousel images={blog.carouselImages || [blog.image]} alt={blog.title} />
          </div>

          {/* TEXT — Vertically centers beautifully against the tall image format */}
          <div className={`w-full md:flex-1 relative ${i % 2 === 0 ? 'text-left' : 'text-right'}`}>
            <div className={`absolute top-0 ${i % 2 === 0 ? 'left-0' : 'right-0'} w-8 md:w-12 h-8 md:h-12 border-t-2 ${i % 2 === 0 ? 'border-l-2' : 'border-r-2'} border-blue-600`} />

            <div className="pt-6 px-2 md:px-4">
              <div className={`flex items-center gap-3 mb-2 ${i % 2 !== 0 ? 'justify-end' : ''}`}>
                {i % 2 === 0 && (
                  <span className="text-2xl font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100 select-none">
                    {i + 1}
                  </span>
                )}
                <p className="text-blue-600 font-bold text-[8px] md:text-[9px] tracking-widest uppercase">
                  {blog.category}
                </p>
                {i % 2 !== 0 && (
                  <span className="text-2xl font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100 select-none">
                    {i + 1}
                  </span>
                )}
              </div>

              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase mb-3 leading-tight tracking-tight">
                {blog.title}
              </h2>
              <p className="text-xs font-medium text-slate-500 leading-relaxed mb-5">
                {blog.desc}
              </p>

              <button
                onClick={() => onSelect(blog)}
                className={`flex items-center gap-2 text-slate-900 font-black text-[9px] md:text-[10px] uppercase border-b-2 border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all ${i % 2 !== 0 ? 'ml-auto' : ''}`}
              >
                Read More <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

/* ─── ROOT ─── */
const BlogPage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleSelect = (blog) => { window.scrollTo(0, 0); setSelectedBlog(blog); };
  const handleBack = () => { window.scrollTo(0, 0); setSelectedBlog(null); };

  return (
    <div className="bg-[#fcfdfe] min-h-screen font-sans text-slate-700 selection:bg-blue-100">
      <AnimatePresence mode="wait">
        {!selectedBlog ? (
          <BlogList key="list" onSelect={handleSelect} />
        ) : (
          <BlogDetail key={`detail-${selectedBlog.id}`} blog={selectedBlog} onBack={handleBack} onSelect={handleSelect} />
        )}
      </AnimatePresence>
    </div>
  );
};

>>>>>>> 1e45f578ee5120e1963d79fc2b9cef32542fdb94
export default BlogPage;