// frontend/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ openEnquiryModal }) { // Receives openEnquiryModal from MainLayout
  const currentYear = new Date().getFullYear();

  const handleContactClick = (e) => { // Renamed from handleInquiryClick for clarity
    e.preventDefault();
    if (openEnquiryModal) {
      openEnquiryModal();
    } else {
      console.warn("Footer: openEnquiryModal function not provided or triggered incorrectly.");
    }
  };

  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          
          {/* Left Side: Copyright & Certification */}
          <div className="text-center sm:text-left mb-3 sm:mb-0">
            <p className="text-gray-400">&copy; {currentYear} Debbie's Awesome Pawsome.</p>
            <p className="text-xs text-indigo-300 mt-1">🎓 Animal Behavior College Certified</p>
          </div>

          {/* Right Side: Navigation Links & Social Media (Horizontal) */}
          <nav className="flex flex-wrap justify-center sm:justify-end items-center gap-x-3 xs:gap-x-4 gap-y-2 text-xs sm:text-sm">
            <Link to="/" className="hover:text-purple-400 transition-colors px-1 sm:px-2">Home</Link>
            <Link to="/about" className="hover:text-purple-400 transition-colors px-1 sm:px-2">About</Link>
            <Link to="/#services" className="hover:text-purple-400 transition-colors px-1 sm:px-2">Services</Link>
            <Link to="/testimonials" className="hover:text-purple-400 transition-colors px-1 sm:px-2">Testimonials</Link>
            {/* MODIFIED: "Inquire" button text changed to "Contact" */}
            <button 
              onClick={handleContactClick} 
              className="hover:text-purple-400 underline transition-colors px-1 sm:px-2"
            >
              Contact {/* <<< CHANGED TEXT HERE */}
            </button>
            <Link to="/privacy-policy" className="hover:text-purple-400 transition-colors px-1 sm:px-2">Privacy</Link>
            
            <span className="hidden xs:inline mx-1 sm:mx-2 text-gray-600">|</span>

            {/* Social Media Links */}
            <a href="#" target="_blank" rel="noopener noreferrer" title="Facebook (Coming Soon)" className="hover:text-purple-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">{/* FB Icon Path */}</svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" title="Instagram (Coming Soon)" className="hover:text-purple-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">{/* IG Icon Path */}</svg>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}