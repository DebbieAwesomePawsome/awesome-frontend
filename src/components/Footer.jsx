// frontend/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ openEnquiryModal }) {
  const currentYear = new Date().getFullYear();

  const handleInquiryClick = (e) => {
    e.preventDefault();
    if (openEnquiryModal) {
      openEnquiryModal();
    } else {
      console.warn("openEnquiryModal function not provided to Footer");
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
            <button 
              onClick={handleInquiryClick} 
              className="hover:text-purple-400 underline transition-colors px-1 sm:px-2"
            >
              Inquire
            </button>
            <Link to="/privacy-policy" className="hover:text-purple-400 transition-colors px-1 sm:px-2">Privacy</Link>
            
            {/* Separator for visual clarity before social icons on larger small screens */}
            <span className="hidden xs:inline mx-1 sm:mx-2 text-gray-600">|</span>

            {/* Social Media Links */}
            <a href="#" target="_blank" rel="noopener noreferrer" title="Facebook (Coming Soon)" className="hover:text-purple-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" title="Instagram (Coming Soon)" className="hover:text-purple-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.028 3.7c.636-.247 1.363.416 2.427.465C9.531 2.013 9.885 2 12.315 2zm0 1.623c-2.383 0-2.706.01-3.664.056-.928.045-1.505.208-1.997.393a3.268 3.268 0 00-1.189.814 3.268 3.268 0 00-.814 1.189c-.185.492-.348 1.07-.393 1.997-.046.958-.056 1.281-.056 3.664s.01 2.706.056 3.664c.045.928.208 1.505.393 1.997a3.268 3.268 0 00.814 1.189 3.268 3.268 0 001.189.814c.492.185 1.07.348 1.997.393.958.046 1.281.056 3.664.056s2.706-.01 3.664-.056c.928-.045 1.505-.208 1.997-.393a3.268 3.268 0 001.189-.814 3.268 3.268 0 00.814-1.189c.185-.492.348-1.07.393-1.997.046-.958-.056-1.281-.056-3.664s-.01-2.706-.056-3.664c-.045-.928-.208-1.505-.393-1.997a3.268 3.268 0 00-.814-1.189 3.268 3.268 0 00-1.189-.814c-.492-.185-1.07-.348-1.997-.393C15.021 3.633 14.698 3.623 12.315 3.623zM12 7.169a4.831 4.831 0 100 9.662 4.831 4.831 0 000-9.662zM12 15a3 3 0 110-6 3 3 0 010 6zm4.805-7.778a1.154 1.154 0 100-2.308 1.154 1.154 0 000 2.308z" clipRule="evenodd" /></svg>
                </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}