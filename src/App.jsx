// frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; // Added useLocation

// Layouts
import MainLayout from './layouts/MainLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';

// Public Pages
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import TestimonialsPage from './pages/TestimonialsPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import ServicesPage from './pages/ServicesPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx';
import AdminServicesDashboardPage from './pages/admin/AdminServicesDashboardPage.jsx';

// Components
import GeneralEnquiryModal from './components/GeneralEnquiryModal';
import AdminProtectedRoute from './components/AdminProtectedRoute.jsx';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const openEnquiryModal = () => setIsEnquiryModalOpen(true);
  const closeEnquiryModal = () => setIsEnquiryModalOpen(false);
  
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <>
    <ScrollToTop /> 
      <Routes>
        {/* Public Site Routes: Wrapped by MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="testimonials" element={<TestimonialsPage openEnquiryModal={openEnquiryModal} />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} /> 
        </Route>

        {/* --- Admin Routes --- */}
        {/* 1. Publicly accessible Admin Login Page */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* 2. Protected Admin Section */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="services" replace />} />
            <Route path="services" element={<AdminServicesDashboardPage />} />
          </Route>
        </Route>
      </Routes>
      
      <GeneralEnquiryModal isOpen={isEnquiryModalOpen} onClose={closeEnquiryModal} />
    </>
  );
}

export default App;