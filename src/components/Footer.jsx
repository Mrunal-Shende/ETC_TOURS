import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [activeBranch, setActiveBranch] = useState(0);

  const branches = [
    { city: 'NEW DELHI', addr: 'F-11/12, Triveni Complex, Sheikh Sarai, Phase-1 - 110017' },
    { city: 'BHOPAL', addr: 'Flat Number F-05, Shri Ram Complex, Shri Ram Colony, Hoshangabad Road, Bhopal - 462026'},
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBranch((prev) => (prev + 1) % branches.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, [branches.length]);

  const styles = `
    .footer-wrapper {
      background-color: #111827;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      padding: 30px 0 0 0;
      border-top: 1px solid #1f2937;
    }

    .footer-grid {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1.2fr 1fr 0.7fr 1.3fr 0.8fr;
      gap: 30px;
      padding: 0 40px 40px 40px;
      align-items: start;
    }

    .footer-column { display: flex; flex-direction: column; }

    .logo-wrapper {
      height: 60px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
    }

    .brand-spacer { height: 60px; margin-bottom: 20px; }

    .branch-heading-btn {
      display: inline-block;
      background-color: #3b82f6;
      color: white !important;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 8px 14px;
      border-radius: 4px;
      text-decoration: none;
      margin-bottom: 20px;
      width: fit-content;
      transition: 0.3s;
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
    }

    .column-title {
      font-size: 14px;
      font-weight: 700;
      color: #ffffff;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin-bottom: 18px;
      position: relative;
    }

    .column-title::after {
      content: "";
      position: absolute;
      left: 0; bottom: -6px;
      width: 20px; height: 2px;
      background-color: #3b82f6;
    }

    .carousel-container {
      position: relative;
      height: 80px;
      overflow: hidden;
      width: 100%;
    }

    .branch-slide {
      position: absolute;
      top: 0; left: 0; width: 100%;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.6s ease-in-out;
      visibility: hidden;
    }

    .branch-slide.active { opacity: 1; transform: translateY(0); visibility: visible; }

    .contact-item-box { display: flex; flex-direction: column; gap: 8px; }

    .contact-row { 
      display: flex; 
      align-items: flex-start; 
      gap: 6px; 
      width: 100%;
    }

    .contact-label { color: #60a5fa; font-weight: 800; min-width: 75px; font-size: 11.5px; }
    .contact-data { color: #f1f5f9; font-size: 12px; flex: 1; }

    .email-text {
      color: #3b82f6;
      font-weight: bold;
      font-size: 12px;
      word-break: break-all;
    }

    .social-flex {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 15px;
    }

    .social-item {
      background-color: #1f2937;
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      border: 1px solid #374151;
      transition: 0.3s;
    }

    .social-item:hover {
      background-color: #3b82f6;
      transform: translateY(-3px);
    }

    .bottom-bar {
      background-color: #0b0f1a;
      padding: 15px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #1f2937;
    }

    @media (max-width: 1200px) {
      .footer-grid { grid-template-columns: 1fr 1fr; }
    }

    @media (max-width: 768px) {
      .information-col { display: none !important; }
      .footer-wrapper { padding: 20px 0 0 0; }
      .footer-grid { 
        grid-template-columns: 1fr; 
        padding: 0 15px 25px 15px; 
        text-align: center;
        gap: 18px;
      }
      .footer-column { align-items: center; }
      .brand-spacer, .logo-wrapper { height: auto; margin-bottom: 10px; }
      .column-title::after { left: 50%; transform: translateX(-50%); }
      .contact-item-box { align-items: center; width: 100%; }
      .contact-row { justify-content: flex-start; max-width: 280px; margin: 0 auto; text-align: left; }
      .contact-label { min-width: 70px; font-size: 10.5px; }
      .contact-data { font-size: 11px; }
      .bottom-bar { padding: 15px 20px; flex-direction: column; gap: 12px; text-align: center; }
      .copyright-text { font-size: 10px !important; line-height: 1.5; order: 1; }
      .powered-by-box { order: 2; justify-content: center; }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <footer className="footer-wrapper">
        <div className="footer-grid">
          
          <div className="footer-column">
            <div className="logo-wrapper">
              <img src="/logo footer2.jpg" alt="Logo" style={{ height: '50px', filter: 'brightness(1.2)', objectFit: 'contain' }} />
            </div>
            <h3 className="column-title">Head Office</h3>
            <div>
              <b style={{ color: '#fff', fontSize: '8x' }}>EXPRESS TRAVEL CORPORATE SERVICES PRIVATE LIMITED</b><br />
              <span style={{ color: '#94a3b8', fontSize: '11px', lineHeight: '1.4' }}>
                Regd. Office <br />Express Building <br />No.20, Duraisamy Street, <br />Nungambakkam, Chennai-600034
              </span>
            </div>
          </div>

          <div className="footer-column">
            <div className="brand-spacer"></div>
            <Link to="/contact" className="branch-heading-btn">Our Branches</Link>
            <div className="carousel-container">
              {branches.map((branch, index) => (
                <div key={index} className={`branch-slide ${index === activeBranch ? 'active' : ''}`}>
                  <span style={{ color: '#fff', fontWeight: '800', fontSize: '10.5px' }}>{branch.city}</span><br/>
                  <span style={{ color: '#94a3b8', fontSize: '10.5px', lineHeight: '1.3' }}>{branch.addr}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '4px', marginTop: '6px', justifyContent: 'center' }}>
              {branches.map((_, i) => (
                <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: i === activeBranch ? '#3b82f6' : '#374151' }} />
              ))}
            </div>
          </div>

          <div className="footer-column information-col">
            <div className="brand-spacer"></div>
            <h3 className="column-title">Information</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{marginBottom: '8px'}}><Link to="/about" style={{fontSize: '12px', color: '#f1f5f9', textDecoration: 'none'}}>› ABOUT US</Link></li>
              <li style={{marginBottom: '8px'}}><Link to="/services" style={{fontSize: '12px', color: '#f1f5f9', textDecoration: 'none'}}>› SERVICES</Link></li>
              <li style={{marginBottom: '8px'}}><Link to="/contact" style={{fontSize: '12px', color: '#f1f5f9', textDecoration: 'none'}}>› CONTACT US</Link></li>
            </ul>
          </div>

          <div className="footer-column" id="contact-us">
            <div className="brand-spacer"></div>
            <h3 className="column-title">Contact Us</h3>
            <div className="contact-item-box">
              <div className="contact-row"><span className="contact-label">Phone:</span><span className="contact-data">+91-44-2827 2279</span></div>
              <div className="contact-row"><span className="contact-label">Mobile:</span><span className="contact-data">Ms. Sapna (+91 97910 07710)</span></div>
              <div className="contact-row"><span className="contact-label">Email:</span><span className="contact-data email-text">enquiry@expresstravelcorp.com</span></div>
            </div>
          </div>

          <div className="footer-column">
            <div className="brand-spacer"></div>
            <h3 className="column-title">Connect</h3>
            <div className="social-flex">
              <a href="https://www.facebook.com/touroperatorsinchennai/" target="_blank" rel="noreferrer" className="social-item">
                <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-2.21c0-.837.398-1.29 1.144-1.29h2.856v-4.21h-3.856c-3.103 0-5.144 1.822-5.144 4.997v2.713z"/></svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/919791007710" target="_blank" rel="noreferrer" className="social-item">
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="social-item">
                <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
            <p style={{ fontSize: '8.5px', marginTop: '4px', color: '#60a5fa', fontWeight: '900', letterSpacing: '1px' }}>EXCELLENCE SINCE 1999</p>
          </div>
        </div>

        <div className="bottom-bar">
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>Copyright © 2026. EXPRESS TRAVEL CORPORATE SERVICES Pvt Ltd. All Rights Reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '8px', color: '#475569', fontWeight: '700' }}>POWERED BY</span>
            <a href="https://royalswebtechpvtltd.com/" target="_blank" rel="noreferrer">
              <img src='/rwtlogo.png' alt="RWT" style={{ height: '30px', filter: 'brightness(1.1)' }} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;