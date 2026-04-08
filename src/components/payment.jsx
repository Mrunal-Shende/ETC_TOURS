import React from 'react';

const PaymentPartners = () => {
  const partners = [
    { name: 'Visa', src: '/payment_image/visa.png' },
    { name: 'MasterCard', src: '/payment_image/mastercard.png' },
    { name: 'Diners Club', src: '/payment_image/dinersclub.png' },
    { name: 'American Express', src: '/payment_image/americanexpresss.png' },
    { name: 'Citibank', src: '/payment_image/citibank.png' },
    { name: 'JCB', src: '/payment_image/jcb.png' },
    { name: 'VeriSign', src: '/payment_image/verisign.png' },
    { name: 'Norton', src: '/payment_image/norton.jpg' },
    { name: 'Mastercard Securecode', src: '/payment_image/mastercardsecurecode.png' },
    { name: 'Verified by Visa', src: '/payment_image/verifiedbyvisa.png' },
    { name: 'American Express safe key', src: '/payment_image/safekey.png' },
  ];

  const carouselItems = [...partners, ...partners];

  return (
    <section className="bg-white py-6 overflow-hidden border-t border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="relative flex overflow-x-hidden group">
          <div className="flex animate-payment-scroll whitespace-nowrap gap-12 py-2 items-center">
            {carouselItems.map((partner, index) => (
              <div 
                key={index} 
                // Is container ki wajah se saare logos equal size ke lagenge
                className="flex-shrink-0 w-[100px] h-[50px] flex items-center justify-center"
              >
                <img 
                  src={partner.src} 
                  alt={partner.name} 
                  // object-contain ensures image box ke bahar na jaye aur stretch na ho
                  className="max-h-full max-w-full object-contain block" 
                />
              </div>
            ))}
            
            {/* Security Text Badges */}
            <div className="flex items-center gap-10 border-l pl-10 border-slate-200">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified by VISA</span>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">MasterCard SecureCode</span>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Norton Secured</span>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes payment-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-payment-scroll {
          animation: payment-scroll 30s linear infinite;
          display: flex;
          width: max-content;
        }
        .group:hover .animate-payment-scroll {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};

export default PaymentPartners;