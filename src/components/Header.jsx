import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X, Globe, CreditCard } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toursDropdown, setToursDropdown] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  
  // Mobile specific states
  const [mobileToursOpen, setMobileToursOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  const toursRef = useRef(null);
  const langRef = useRef(null);

  const languageOptions = [
    { name: 'English', code: 'en' },
    { name: 'Hindi', code: 'hi' },
    { name: 'Tamil', code: 'ta' },
    { name: 'French', code: 'fr' },
    { name: 'German', code: 'de' },
    { name: 'Spanish', code: 'es' },
    { name: 'Arabic', code: 'ar' }
  ];

  useEffect(() => {
    if (!document.getElementById('google-translate-script')) {
      const addScript = document.createElement('script');
      addScript.id = 'google-translate-script';
      addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
      document.body.appendChild(addScript);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,hi,ta,fr,de,es,ar', 
          autoDisplay: false,
        }, 'google_translate_element');
      };
    }
  }, []);

  const changeLanguage = (langCode, langName) => {
    setSelectedLang(langName);
    const googleCombo = document.querySelector('.goog-te-combo');
    if (googleCombo) {
      googleCombo.value = langCode;
      googleCombo.dispatchEvent(new Event('change'));
    }
    setLangDropdown(false);
    setMobileLangOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toursRef.current && !toursRef.current.contains(event.target)) setToursDropdown(false);
      if (langRef.current && !langRef.current.contains(event.target)) setLangDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setMobileToursOpen(false);
    setMobileLangOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'About Us', link: '/about' },
    { 
      name: 'Tours', 
      isDropdown: true, 
      subItems: [
        { name: 'India Tours', link: '/tours/india' },
        { name: 'International', link: '/tours/international' }
      ] 
    },
    { name: 'Blog', link: '/blog' },
    { name: 'Car Rentals', link: 'https://www.etconline.in/', isExternal: true },
    { name: 'Services', link: '/services' },
    { name: 'Contact', link: '/contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 font-sans
      ${isScrolled ? 'py-3 bg-white/80 backdrop-blur-xl shadow-md border-b border-gray-100' : 'py-6 bg-transparent'}`}>
      
      <div id="google_translate_element" className="hidden"></div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center h-12">
        
        {/* LEFT: LOGO */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <img src="/LOGO.jpg" alt="Logo" className="h-10 md:h-14 w-auto object-contain transition-transform group-hover:scale-105" />
          {/* Vertical Line for Logo - Always present, color changes on scroll */}
          <div className={`h-10 w-[1px] ml-1 transition-colors duration-500 ${isScrolled ? 'bg-blue-900' : 'bg-white/50'}`}></div>
          <div className="flex flex-col pl-2">
            <span className={`text-[14px] md:text-[25px] font-black tracking-tighter uppercase leading-none transition-colors duration-500 ${isScrolled ? 'text-blue-900' : 'text-white'}`}>
              Express Travel
            </span>
            <span className={`text-[7px] md:text-[9px] font-bold uppercase transition-colors duration-500 ${isScrolled ? 'text-blue-600' : 'text-blue-100'}`}>
              Corporate Services Pvt Ltd
            </span>
          </div>
        </Link>

        {/* MIDDLE: NAVIGATION (Tight spacing for laptop) */}
        <nav className="hidden xl:flex items-center absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-x-1"> 
            {menuItems.map((item, idx) => (
              <li key={idx} className="relative group" ref={item.isDropdown ? toursRef : null}>
                {item.isDropdown ? (
                  <button 
                    onClick={() => setToursDropdown(!toursDropdown)}
                    className={`flex items-center gap-1 px-3 py-2 text-[12px] font-black uppercase transition-all duration-300
                      ${isScrolled ? 'text-slate-800 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
                  >
                    {item.name} <ChevronDown size={13} className={`transition-transform duration-300 ${toursDropdown ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link 
                    to={item.isExternal ? '#' : item.link} 
                    onClick={() => item.isExternal ? window.open(item.link) : handleLinkClick()}
                    className={`px-3 py-2 text-[12px] font-black uppercase transition-all duration-300
                      ${isScrolled ? 'text-slate-800 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
                  >
                    {item.name}
                  </Link>
                )}

                {item.isDropdown && toursDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-2xl shadow-2xl border-t-4 border-blue-600 animate-in fade-in slide-in-from-top-2 duration-300">
                    {item.subItems.map((sub, sIdx) => (
                      <Link key={sIdx} to={sub.link} onClick={handleLinkClick} className="block px-6 py-4 text-[11px] font-bold text-gray-700 hover:bg-blue-600 hover:text-white border-b border-gray-50 last:border-0 uppercase transition-colors">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT: TOOLS & INCREDIBLE INDIA */}
        <div className="flex items-center gap-6">
          
          <div className="hidden xl:flex items-center gap-2">
            {/* Pay Online with Hover Expand */}
            <button className={`group flex items-center gap-0 hover:gap-2 px-2.5 py-2 rounded-full transition-all duration-300 border overflow-hidden
              ${isScrolled ? 'border-gray-200 text-blue-900 hover:bg-blue-600 hover:text-white' : 'border-white/20 text-white hover:bg-white hover:text-blue-900'}`}>
              <CreditCard size={18} className="shrink-0" />
              <span className="max-w-0 group-hover:max-w-[100px] transition-all duration-500 overflow-hidden text-[10px] font-black uppercase whitespace-nowrap">
                Pay Online
              </span>
            </button>

            {/* Language with Hover Expand */}
            <div className="relative" ref={langRef}>
              <button 
                onClick={() => setLangDropdown(!langDropdown)}
                className={`group flex items-center gap-0 hover:gap-2 px-2.5 py-2 rounded-full transition-all duration-300 border overflow-hidden
                ${isScrolled ? 'border-gray-200 text-blue-900 hover:bg-blue-600 hover:text-white' : 'border-white/20 text-white hover:bg-white hover:text-blue-900'}`}
              >
                <Globe size={18} className="shrink-0" />
                <span className="max-w-0 group-hover:max-w-[100px] transition-all duration-500 overflow-hidden text-[10px] font-black uppercase whitespace-nowrap">
                  {selectedLang}
                </span>
                <ChevronDown size={10} className="shrink-0 ml-1" />
              </button>

              {langDropdown && (
                <div className="absolute top-full right-0 mt-2 w-36 bg-white shadow-2xl rounded-lg border border-gray-100 z-[110] overflow-hidden">
                  {languageOptions.map((lang, i) => (
                    <button key={i} onClick={() => changeLanguage(lang.code, lang.name)} className="w-full text-left px-4 py-2 text-[10px] font-bold text-gray-700 hover:bg-blue-600 hover:text-white uppercase transition-colors">
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* INCREDIBLE INDIA with Vertical Line */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Same vertical line as logo, color white fix */}
            <div className={`h-10 w-[1px] transition-colors duration-500 ${isScrolled ? 'bg-blue-900' : 'bg-white/50'}`}></div>
            <div className="flex flex-col items-start leading-none pl-1">
              <span className={`text-[18px] md:text-[25px] font-[1000] leading-none uppercase tracking-tighter transition-colors duration-500
                ${isScrolled ? 'text-blue-900' : 'text-white'}`}>
                Incredible <span className="text-blue-600">!</span>ndia
              </span>
              <span className={`text-[7px] font-bold uppercase tracking-widest mt-1 transition-colors duration-500
                ${isScrolled ? 'text-gray-500' : 'text-blue-100/80'}`}>
                Recognized by Govt. of India
              </span>
            </div>
          </div>

          {/* Stable Hamburger Toggle */}
          <button 
            className={`xl:hidden p-2 rounded-full transition-all ${isScrolled ? 'text-blue-900 bg-blue-50' : 'text-white bg-white/10 backdrop-blur-sm'}`} 
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU (Accordion Logic Added) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col animate-in slide-in-from-right duration-300 overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-gray-100">
            <img src="/LOGO.jpg" alt="Logo" className="h-10 w-auto" />
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-blue-900 p-2 bg-blue-50 rounded-full">
              <X size={32} />
            </button>
          </div>
          
          <nav className="p-8 flex flex-col gap-5 overflow-y-auto h-full">
            {menuItems.map((item, idx) => (
              <div key={idx} className="border-b border-gray-50 pb-2">
                {item.isDropdown ? (
                  <div>
                    <button 
                      onClick={() => setMobileToursOpen(!mobileToursOpen)}
                      className="flex justify-between items-center w-full text-[18px] font-black text-blue-900 uppercase py-2"
                    >
                      {item.name} <ChevronDown size={20} className={`transition-transform ${mobileToursOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {/* Accordion content for India & International */}
                    {mobileToursOpen && (
                      <div className="pl-4 py-2 flex flex-col gap-3 animate-in fade-in">
                        {item.subItems.map((sub, sIdx) => (
                          <Link key={sIdx} to={sub.link} onClick={handleLinkClick} className="text-[16px] font-bold text-blue-600 uppercase">
                            • {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={item.link} onClick={handleLinkClick} className="text-[18px] font-black text-blue-900 uppercase block py-2">{item.name}</Link>
                )}
              </div>
            ))}

            {/* Pay Online - Hamburger Menu */}
            <button className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-xl font-black uppercase text-sm mt-2">
                <CreditCard size={20} /> Pay Online
            </button>

            {/* Language Selection Accordion Mobile */}
            <div className="pb-10">
              <button 
                onClick={() => setMobileLangOpen(!mobileLangOpen)}
                className="w-full flex justify-between items-center border border-gray-200 px-4 py-3 rounded-xl font-black text-blue-900 uppercase text-sm mt-2"
              >
                <div className="flex items-center gap-2"><Globe size={20} /> {selectedLang}</div>
                <ChevronDown size={18} className={`transition-transform ${mobileLangOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileLangOpen && (
                <div className="grid grid-cols-2 gap-2 mt-3 p-2 bg-gray-50 rounded-xl animate-in fade-in">
                  {languageOptions.map((lang, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => changeLanguage(lang.code, lang.name)}
                      className={`py-2 px-3 text-[10px] font-bold rounded-lg border ${selectedLang === lang.name ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-100'}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-auto pt-8 border-t border-gray-100 text-center">
               <p className="text-[32px] font-[1000] text-blue-900 uppercase leading-none tracking-tighter">Incredible <span className="text-blue-600">!</span>ndia</p>
               <p className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-widest leading-none">Recognized by Govt. of India</p>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        .goog-te-banner-frame.skiptranslate, .goog-te-banner-frame { display: none !important; }
        body { top: 0px !important; }
        .goog-te-gadget { color: transparent !important; font-size: 0px !important; }
        #goog-gt-tt { display: none !important; visibility: hidden !important; }
      `}</style>
    </header>
  );
};

export default Header;