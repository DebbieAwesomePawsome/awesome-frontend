// frontend/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Added Navigate for potential future use or explicit redirects

// Layouts
import MainLayout from './layouts/MainLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';

// Public Pages
import HomePage from './pages/HomePage.jsx';
// import AboutPage from './pages/AboutPage.jsx'; // Future page
import AboutPage from './pages/AboutPage.jsx';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx';
import AdminServicesDashboardPage from './pages/admin/AdminServicesDashboardPage.jsx';
// import ServiceAddPage from './pages/admin/ServiceAddPage.jsx'; // Future page
// import ServiceEditPage from './pages/admin/ServiceEditPage.jsx'; // Future page

// Import the AdminProtectedRoute (we will create this file in the next step)
import AdminProtectedRoute from './components/AdminProtectedRoute.jsx';

function App() {
  return (
    <Routes>
      {/* Public Site Routes: Wrapped by MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        {/* <Route path="about" element={<AboutPage />} /> */}
         <Route path="/about" element={<AboutPage />} />
         {/* <Route path="privacy-policy" element={<PrivacyPolicyPage />} /> ... we'll add this next */}
      </Route>


      {/* --- Admin Routes --- */}

      {/* 1. Publicly accessible Admin Login Page */}
      {/* This route is NOT protected. Users go here to log in. */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* 2. Protected Admin Section */}
      {/* Routes wrapped by AdminProtectedRoute will require authentication. */}
      {/* If not authenticated, AdminProtectedRoute will redirect to /admin/login. */}
      <Route element={<AdminProtectedRoute />}> {/* ✨ This is the protection wrapper ✨ */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Default route for /admin (e.g., redirects to /admin/services or shows dashboard directly) */}
          {/* Option 1: Redirect /admin to /admin/services */}
          <Route index element={<Navigate to="services" replace />} />
          {/* Option 2: Directly render dashboard for /admin (your current approach, also fine) */}
          {/* <Route index element={<AdminServicesDashboardPage />} /> */}

          <Route path="services" element={<AdminServicesDashboardPage />} />
          {/* Future protected admin routes would go here: */}
          {/* <Route path="services/new" element={<ServiceAddPage />} /> */}
          {/* <Route path="services/edit/:serviceId" element={<ServiceEditPage />} /> */}
          {/* <Route path="settings" element={<AdminSettingsPage />} /> */}
        </Route>
      </Route>

      {/* Optional: Add a catch-all 404 Not Found route here later */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

export default App;