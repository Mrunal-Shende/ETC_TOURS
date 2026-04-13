import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, Globe, Send, X, CreditCard, ChevronRight } from 'lucide-react';

const Header = () => {
  const [langDropdown, setLangDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
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

  // 1. Initialize Google Translate
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

  // 2. Language Change Logic
  const changeLanguage = (langCode, langName) => {
    setSelectedLang(langName);
    const googleCombo = document.querySelector('.goog-te-combo');
    
    if (googleCombo) {
      googleCombo.value = langCode;
      googleCombo.dispatchEvent(new Event('change'));
    } else {
      setTimeout(() => changeLanguage(langCode, langName), 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1280) {
        setIsScrolled(window.scrollY > 50);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Updated Menu Items: Redirecting directly to the list pages
  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'About Us', link: '/about' },
    { name: 'India Tours', link: '/tours/india' }, // Redirects to IndiaToursList
    { name: 'International', link: '/tours/international' }, // Redirects to InternationalList
    { name: 'Blog', link: '/blog' },
    { name: 'Car Rentals', link: 'https://www.etconline.in/', isExternal: true },
    { name: 'Services', link: '/services' },
    { name: 'Contact', link: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans">
      
      {/* Hidden container for Google Widget */}
      <div id="google_translate_element" style={{ position: 'absolute', top: '-9999px' }}></div>

      {/* LAYER 1: BRANDING BAR */}
      <div className={`bg-white px-2 md:px-8 shadow-sm transition-all duration-500 overflow-visible ${isScrolled ? 'xl:max-h-0 xl:opacity-0 xl:invisible xl:py-0' : 'max-h-[200px] py-2 md:py-4 opacity-100 visible'}`}>
        <div className="max-w-[1440px] mx-auto flex justify-between items-center gap-4">
          
          <Link to="/" className="flex items-center gap-1 md:gap-4 shrink-0 min-w-0">
            <img src="/LOGO.jpg" alt="Logo" className="h-8 md:h-16 w-auto object-contain" />
            <div className="flex flex-col border-l-2 border-blue-900 pl-1.5 md:pl-3">
              <span className="text-[11px] md:text-[24px] font-black tracking-tighter text-blue-900 uppercase">Express Travel</span>
              <span className="text-[6px] md:text-[12px] font-bold text-blue-600 uppercase">Corporate Services Pvt Ltd</span>
            </div>
          </Link>

          <div className="flex items-center gap-1 md:gap-6 shrink-0">
            <div className="flex items-center gap-1 md:gap-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-10 md:w-20 md:h-14 flex flex-col items-center justify-center rounded-sm transition-all">
                <CreditCard size={12} className="md:size-5" />
                <span className="text-[5px] md:text-[8px] font-black uppercase mt-0.5">Pay Online</span>
              </button>

              <div className="relative" ref={langRef}>
                <button 
                  onClick={() => setLangDropdown(!langDropdown)}
                  className={`flex flex-col items-center justify-center w-12 h-10 md:w-20 md:h-14 transition-all rounded-sm border ${langDropdown ? 'bg-blue-600 text-white border-blue-600' : 'text-blue-600 border-blue-100 bg-blue-50 hover:bg-blue-100'}`}
                >
                  <Globe size={12} className="md:size-5" /> 
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <span className="text-[5px] md:text-[8px] font-black uppercase">{selectedLang}</span>
                    <ChevronDown size={7} className={`transition-transform ${langDropdown ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                
                {langDropdown && (
                  <div className="absolute top-[105%] right-0 w-32 md:w-48 bg-white shadow-2xl border border-gray-100 z-[100] animate-in fade-in duration-200">
                    <div className="bg-blue-600 h-1 w-full"></div>
                    <ul className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
                      {languageOptions.map((lang, idx) => (
                        <li key={idx} 
                          onClick={() => { changeLanguage(lang.code, lang.name); setLangDropdown(false); }} 
                          className="px-3 md:px-4 py-2 text-[9px] md:text-[11px] font-bold text-gray-700 hover:bg-blue-600 hover:text-white border-b border-gray-50 last:border-0 cursor-pointer uppercase"
                        >
                          {lang.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="hidden xl:flex flex-col items-end border-l pl-6 border-gray-100">
              <span className="text-[20px] font-black text-blue-900 leading-none uppercase tracking-tight">
                Incredible <span className="text-blue-600">!</span>ndia
              </span>
              <p className="text-[9px] font-bold text-gray-500 uppercase mt-1 text-right leading-tight">
                Recognized by Ministry of Tourism<br/>Govt. of India
              </p>
            </div>

            <button className="xl:hidden p-1 text-blue-900" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* LAYER 2: DESKTOP NAVBAR */}
      <div className={`hidden xl:flex justify-center px-4 transition-all duration-300 ${isScrolled ? 'mt-4' : 'mt-2'}`}>
        <div className="bg-white shadow-xl border border-gray-100 flex items-center h-12 max-w-fit px-2">
          <nav className="flex items-center h-full">
            <ul className="flex items-center h-full">
              {menuItems.map((item, index) => (
                <li key={index} className="relative h-12 flex items-center px-5 border-r border-gray-100 last:border-0">
                  {item.isExternal ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-slate-700 hover:text-blue-600 transition-all">
                      {item.name}
                    </a>
                  ) : (
                    <Link to={item.link} onClick={handleLinkClick} className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-slate-700 hover:text-blue-600 transition-all">
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
              <li className="h-12 flex items-center px-4 bg-gray-50 border-l border-gray-100">
                <Link to="/enquiry" onClick={handleLinkClick}>
                  <button className="bg-blue-600 text-white py-2 px-5 text-[10px] font-black uppercase flex items-center gap-2 hover:bg-blue-800 transition-all">
                    <Send size={12} /> Enquiry
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-white w-full h-full flex flex-col p-6 overflow-y-auto xl:hidden">
          <div className="flex justify-between items-center mb-8">
            <img src="/LOGO.jpg" alt="Logo" className="h-10 w-auto" />
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-blue-900 bg-blue-50 p-2 rounded-full"><X size={28} /></button>
          </div>
          <nav className="flex flex-col gap-2">
            {menuItems.map((item, idx) => (
              <div key={idx} className="flex flex-col border-b border-gray-50">
                <div className="flex justify-between items-center py-4">
                  {item.isExternal ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[15px] font-black text-blue-900 uppercase w-full">{item.name}</a>
                  ) : (
                    <Link to={item.link} onClick={handleLinkClick} className="text-[15px] font-black text-blue-900 uppercase w-full">{item.name}</Link>
                  )}
                </div>
              </div>
            ))}
          </nav>

          {/* Mobile Language Selector */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Select Language</p>
            <div className="flex flex-wrap gap-2">
              {languageOptions.map((lang, idx) => (
                <button key={idx} onClick={() => { changeLanguage(lang.code, lang.name); setIsMobileMenuOpen(false); }} className={`px-3 py-1.5 rounded-md text-[11px] font-bold uppercase ${selectedLang === lang.name ? 'bg-blue-600 text-white' : 'bg-white text-blue-900 border border-gray-200'}`}>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        


        
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2563eb; }
        .goog-te-banner-frame.skiptranslate, .goog-te-banner-frame { display: none !important; }
        body { top: 0px !important; }
        .goog-logo-link { display:none !important; }
        .goog-te-gadget { color: transparent !important; font-size: 0px !important; }
        .goog-te-gadget span { display: none !important; }
        #goog-gt-tt { display: none !important; visibility: hidden !important; }
        html { height: 100%; }
        body { position: relative; min-height: 100%; }
      `}</style>
    </header>
  );
};

export default Header;