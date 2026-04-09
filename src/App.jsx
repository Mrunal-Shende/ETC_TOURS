import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// ── Layout ────────────────────────────────────────────────────────────────
import Header           from './components/Header';
import Footer           from './components/Footer';
import PaymentPartners  from './components/payment';
import FloatingControls from './components/FloatingIcons';

// ── Home ──────────────────────────────────────────────────────────────────
import Herosection          from './components/Herosection';
import About                from './components/About';
import Tour                 from './components/Tour'; // Added
import HomeFeaturedPackages from './components/HomeFeaturedPackages';
import Fleet                from './components/Fleet'; // Added

// ── Static pages ──────────────────────────────────────────────────────────
import AboutPage   from './components/AboutPage';
import Blog        from './components/Blog';
import Services    from './components/Services';
import ContactUs   from './components/Contact';
import EnquiryPage from './components/enquery';

// ── Dynamic tour pages ────────────────────────────────────────────────────
import CategoryPage          from './components/CategoryPage';
import PackageDetail         from './components/PackageDetail';
import { IndiaToursList }    from './components/IndiaToursPage';
import { InternationalList } from './components/InternationalToursPage';

// ── Admin ─────────────────────────────────────────────────────────────────
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
    <Header/>
    <main>{children}</main>
    <PaymentPartners/>
    <Footer/>
    <FloatingControls/>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────
function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>

        {/* ── ADMIN ── */}
        <Route path="/admin" element={<AdminLogin/>}/>
        <Route path="/admin/*" element={
          <ProtectedRoute><AdminLayout/></ProtectedRoute>
        }>
          <Route path="dashboard"  element={<AdminDashboard/>}/>
          <Route path="categories" element={<AdminCategories/>}/>
          <Route path="packages"   element={<AdminPackages/>}/>
          <Route path="enquiries"  element={<AdminEnquiries/>}/>
        </Route>

        {/* ── HOME ── */}
        <Route path="/" element={
          <PublicLayout>
            <Herosection/>
            <About/>
            <Tour/> {/* Added here */}
            <HomeFeaturedPackages/>
            <Fleet/> {/* Added here */}
          </PublicLayout>
        }/>
        <Route path="/home" element={
          <PublicLayout>
            <Herosection/>
            <About/>
            <Tour/> {/* Added here */}
            <HomeFeaturedPackages/>
            <Fleet/> {/* Added here */}
          </PublicLayout>
        }/>

        {/* ── STATIC PAGES ── */}
        <Route path="/about"    element={<PublicLayout><AboutPage/></PublicLayout>}/>
        <Route path="/blog"     element={<PublicLayout><Blog/></PublicLayout>}/>
        <Route path="/services" element={<PublicLayout><Services/></PublicLayout>}/>
        <Route path="/contact"  element={<PublicLayout><ContactUs/></PublicLayout>}/>
        <Route path="/enquiry"  element={<PublicLayout><EnquiryPage/></PublicLayout>}/>

        {/* ── INDIA TOURS ── */}
        <Route path="/tours/india"
          element={<PublicLayout><IndiaToursList/></PublicLayout>}/>
        <Route path="/tours/india/:slug"
          element={<PublicLayout><CategoryPage type="india"/></PublicLayout>}/>

        {/* ── INTERNATIONAL TOURS ── */}
        <Route path="/tours/international"
          element={<PublicLayout><InternationalList/></PublicLayout>}/>
        <Route path="/tours/international/:slug"
          element={<PublicLayout><CategoryPage type="international"/></PublicLayout>}/>

        {/* ── PACKAGE DETAIL PAGE ── */}
        <Route path="/package/:packageId"
          element={<PublicLayout><PackageDetail/></PublicLayout>}/>

      </Routes>
    </Router>
  );
}

export default App;