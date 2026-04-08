// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// // 1. Layout & Common Components
// import Header from './components/Header';
// import Tour from './components/Tour';
// import Herosection from './components/Herosection';
// import Footer from './components/Footer';
// import About from './components/About';
// import Fleet from './components/Fleet';
// import AboutPage from './components/AboutPage';
// import Blog from './components/Blog'; 
// import Services from './components/Services';
// import ContactUs from './components/Contact';
// import PaymentPartners from './components/payment';
// import EnquiryPage from './components/enquery'; 
// import FloatingControls from './components/FloatingIcons';

// // 2. Regional Components
// import AndamanTours from './components/AndamanTours';
// import NepalHome from './components/Nepal_home'; 
// import NorthIndiaHome from './components/NorthIndia_home'; 
// import TelanganaHome from './components/Telangana_home'; 
// import KashmirHome from './components/Kashmir_home';
// import GujaratHome from './components/Gujarat_home';

// // 3. Dynamic & Listing Components
// import CategoryPage from './components/CategoryPage';
// import { IndiaToursList } from './components/IndiaToursPage';
// import { InternationalList } from './components/InternationalToursPage';
// import HomeFeaturedPackages from './components/HomeFeaturedPackages';

// // 4. Admin Components
// import AdminLogin from './components/admin/AdminLogin';
// import AdminLayout from './components/admin/AdminLayout';
// import AdminDashboard from './components/admin/AdminDashboard';
// import AdminCategories from './components/admin/AdminCategories';
// import AdminPackages from './components/admin/AdminPackages';
// import AdminEnquiries from './components/admin/AdminEnquiries';

// // Scroll To Top Utility
// function ScrollToTop() {
//   const { pathname } = useLocation();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   return null;
// }

// function App() {
//   return (
//     <Router>
//       <ScrollToTop />
//       <div className="min-h-screen bg-white font-sans text-slate-800">
//         <Header />
//         <main>
//           <Routes>
//             {/* --- HOME ROUTES --- */}
//             <Route path="/" element={
//               <>
//                 <Herosection />
//                 <HomeFeaturedPackages />
//                 <About />
//                 <Tour />
//                 <Fleet />
//               </>
//             } />
            
//             <Route path="/home" element={
//               <>
//                 <Herosection />
//                 <HomeFeaturedPackages />
//                 <About />
//                 <Tour />
//                 <Fleet />
//               </>
//             } />

//             {/* --- GENERAL PAGES --- */}
//             <Route path="/about" element={<AboutPage />} />
//             <Route path="/blog" element={<Blog />} />
//             <Route path="/services" element={<Services />} />
//             <Route path="/contact" element={<ContactUs />} />
//             <Route path="/enquiry" element={<EnquiryPage />} />

//             {/* --- DYNAMIC & LISTING ROUTES --- */}
//             <Route path="/category/:categorySlug" element={<CategoryPage />} />
//             <Route path="/tours/india" element={<IndiaToursList />} />
//             <Route path="/tours/international" element={<InternationalList />} />
//             <Route path="/tours/:slug" element={<div className="p-20 text-center">Tour Detail Page Coming Soon</div>} />

//             {/* --- REGIONAL ROUTES --- */}
//             <Route path="/tours/india/andaman" element={<AndamanTours />} />
//             <Route path="/tours/india/nepal" element={<NepalHome />} />
//             <Route path="/tours/india/north-india-home" element={<NorthIndiaHome />} />
//             <Route path="/tours/india/telangana-home" element={<TelanganaHome />} />
//             <Route path="/tours/india/kashmir-home" element={<KashmirHome />} />
//             <Route path="/tours/india/Gujarat-home" element={<GujaratHome />} />

//             {/* --- ADMIN PANEL (Temporary unprotected for testing) --- */}
//             <Route path="/admin/login" element={<AdminLogin />} />
//             <Route path="/admin" element={<AdminLayout />}>
//               <Route index element={<AdminDashboard />} />
//               <Route path="categories" element={<AdminCategories />} />
//               <Route path="packages" element={<AdminPackages />} />
//               <Route path="enquiries" element={<AdminEnquiries />} />
//             </Route>
            
//           </Routes>
//         </main>
        
//         <PaymentPartners />
//         <Footer />
//         <FloatingControls />
//       </div>
//     </Router>
//   );
// }

// export default App;

















import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// ── Layout ────────────────────────────────────────────────────────────────
import Header           from './components/Header';
import Footer           from './components/Footer';
import PaymentPartners  from './components/payment';
import FloatingControls from './components/FloatingIcons';

// ── Home sections ─────────────────────────────────────────────────────────
import Herosection          from './components/Herosection';
import About                from './components/About';
import Tour                 from './components/Tour';
import HomeFeaturedPackages from './components/HomeFeaturedPackages';
import Fleet                from './components/Fleet'; // Import confirm kiya gaya

// ── Static pages ──────────────────────────────────────────────────────────
import AboutPage   from './components/AboutPage';
import Blog        from './components/Blog';
import Services    from './components/Services';
import ContactUs   from './components/Contact';
import EnquiryPage from './components/enquery';

// ── Dynamic tour pages ────────────────────────────────────────────────────
import CategoryPage                 from './components/CategoryPage';
import { IndiaToursList }           from './components/IndiaToursPage';
import { InternationalList }        from './components/InternationalToursPage';

// ── Admin panel ───────────────────────────────────────────────────────────
import AdminLogin      from './components/admin/AdminLogin';
import AdminLayout     from './components/admin/AdminLayout';
import AdminDashboard  from './components/admin/AdminDashboard';
import AdminCategories from './components/admin/AdminCategories';
import AdminPackages   from './components/admin/AdminPackages';
import AdminEnquiries  from './components/admin/AdminEnquiries';
import ProtectedRoute  from './components/admin/ProtectedRoute';

// ─────────────────────────────────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const PublicLayout = ({ children }) => (
  <div className="min-h-screen bg-white font-sans text-slate-800">
    <Header />
    <main>{children}</main>
    <PaymentPartners />
    <Footer />
    <FloatingControls />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>

        {/* ── ADMIN ROUTES ── */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard"  element={<AdminDashboard />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="packages"   element={<AdminPackages />} />
          <Route path="enquiries"  element={<AdminEnquiries />} />
        </Route>

        {/* ── HOME ── */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Herosection />
              <About />
              <Tour />
              <HomeFeaturedPackages />
              <Fleet /> {/* <--- HOME PAR ADD KIYA */}
            </PublicLayout>
          }
        />
        <Route
          path="/home"
          element={
            <PublicLayout>
              <Herosection />
              <About />
              <Tour />
              <HomeFeaturedPackages />
              <Fleet /> {/* <--- HOME PAR ADD KIYA */}
            </PublicLayout>
          }
        />

        {/* ── STATIC PAGES ── */}
        <Route path="/about"    element={<PublicLayout><AboutPage /></PublicLayout>} />
        <Route path="/blog"     element={<PublicLayout><Blog /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/contact"  element={<PublicLayout><ContactUs /></PublicLayout>} />
        <Route path="/enquiry"  element={<PublicLayout><EnquiryPage /></PublicLayout>} />
        

        {/* ── INDIA TOURS ── */}
        <Route
          path="/tours/india"
          element={<PublicLayout><IndiaToursList /></PublicLayout>}
        />
        <Route
          path="/tours/india/:slug"
          element={<PublicLayout><CategoryPage type="india" /></PublicLayout>}
        />

        {/* ── INTERNATIONAL TOURS ── */}
        <Route
          path="/tours/international"
          element={<PublicLayout><InternationalList /></PublicLayout>}
        />
        <Route
          path="/tours/international/:slug"
          element={<PublicLayout><CategoryPage type="international" /></PublicLayout>}
        />

      </Routes>
    </Router>
  );
}

export default App;