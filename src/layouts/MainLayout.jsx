// frontend/src/layouts/MainLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import Lottie from 'lottie-react';
import dogAnimation from '../assets/animations/happydog.json';
import catAnimation from '../assets/animations/happycat.json';
import Footer from '../components/Footer.jsx';
import GeneralEnquiryModal from '../components/GeneralEnquiryModal.jsx';
import SmithieMessageModal from '../components/SmithieMessageModal.jsx';

function MainLayout() {
  const [isDogActive, setIsDogActive] = useState(false); 
  const [isCatActive, setIsCatActive] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSmithieModalOpen, setIsSmithieModalOpen] = useState(false);

  const openSmithieModal = () => setIsSmithieModalOpen(true);
  const closeSmithieModal = () => setIsSmithieModalOpen(false);
  const openEnquiryModal = () => setIsEnquiryModalOpen(true);
  const closeEnquiryModal = () => setIsEnquiryModalOpen(false);
  
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => { /* ... useEffect for initial animation remains the same ... */
    const timer = setTimeout(() => {
      setIsDogActive(true); setIsCatActive(true);
      setTimeout(() => { setIsDogActive(false); setIsCatActive(false); }, 2000);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const triggerPetExcitement = () => { /* ... remains the same ... */ setIsDogActive(false); setIsCatActive(false); setTimeout(() => { setIsDogActive(true); setIsCatActive(true); setTimeout(() => { setIsDogActive(false); setIsCatActive(false); }, 2000); }, 10); };
  const triggerDogOnly = () => { /* ... remains the same ... */ setIsDogActive(false); setTimeout(() => { setIsDogActive(true); setTimeout(() => setIsDogActive(false), 2000); }, 10); };
  const triggerCatOnly = () => { /* ... remains the same ... */ setIsCatActive(false); setTimeout(() => { setIsCatActive(true); setTimeout(() => setIsCatActive(false), 2000); }, 10); };

  const navLinkStyle = ({ isActive }) => isActive ? "text-purple-700 font-semibold py-2 px-3 rounded-md bg-purple-100" : "text-gray-700 hover:text-purple-600 hover:bg-purple-50 py-2 px-3 rounded-md transition-colors";
  const handleMobileMenuLinkClick = () => { triggerPetExcitement(); setIsMobileMenuOpen(false); };
  const handleMobileMenuEnquiryClick = () => { triggerPetExcitement(); openEnquiryModal(); setIsMobileMenuOpen(false); };
  const handleDesktopNavClick = () => { triggerPetExcitement(); };
  const handleDesktopEnquiryClick = () => { triggerPetExcitement(); openEnquiryModal(); };

  return (
    <>
      <div className="h-[100dvh] md:h-screen overflow-hidden flex flex-col bg-gray-50">
        <header className="sticky top-0 bg-white shadow-lg z-50 flex-shrink-0">
          {/* Reduced horizontal padding slightly for very small screens: px-2 sm:px-4 */}
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-3">
            <div className="flex justify-between items-center">
              {/* Left: Hamburger + Smithie + Brand */}
              {/* Reduced gap for very small screens: gap-1 sm:gap-2 md:gap-3 */}
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
                <button
                  className="md:hidden p-1 sm:p-2 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" // p-1 on smallest
                  onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); triggerPetExcitement(); }}
                  aria-label="Open navigation menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <img 
                  src="/images/smithie-face-icon.png" 
                  alt="Smithie AI Assistant icon"
                  className="w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-transform flex-shrink-0" // Added flex-shrink-0
                  onMouseEnter={triggerPetExcitement}
                  onClick={() => { triggerPetExcitement(); openSmithieModal(); }}
                />
                
                {/* === VVVV MODIFIED BRAND & SUBTITLE BLOCK FOR STACKING VVVV === */}
                <div className="flex flex-col text-center md:text-left leading-tight">
                  <Link to="/" onClick={handleDesktopNavClick} className="inline-block">
                    {/* Adjusted font sizes for more pronounced stacking and narrowness on mobile */}
                    <h1 className="font-bold text-purple-800 tracking-normal hover:text-purple-600 transition-colors">
                      <span className="block text-xs sm:text-sm md:text-base">Debbie's</span>
                      <span className="block text-base sm:text-lg md:text-xl leading-snug">AWESOME</span>
                      <span className="block text-base sm:text-lg md:text-xl leading-snug">PAWSOME</span>
                    </h1>
                  </Link>
                  <p className="text-[9px] sm:text-[10px] md:text-xs text-indigo-700 font-medium tracking-tight md:tracking-normal">
                    Certified Professional Pet Care
                  </p>
                </div>
                {/* === ^^^^ END OF MODIFIED BRAND & SUBTITLE BLOCK ^^^^ === */}

              </div> {/* End of Left side */}
              
              {/* Right: Interactive Mascots */}
              {/* Reduced space and potentially size for very small screens */}
              <div className="flex items-center space-x-0 xs:space-x-1 sm:space-x-2">
                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 cursor-pointer transform hover:scale-110 transition-transform duration-300" onClick={triggerDogOnly} onMouseEnter={triggerDogOnly}>
                    <Lottie animationData={dogAnimation} loop={isDogActive} autoplay={isDogActive} className="w-full h-full" />
                </div>
                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 cursor-pointer transform hover:scale-110 transition-transform duration-300" onClick={triggerCatOnly} onMouseEnter={triggerCatOnly}>
                    <Lottie animationData={catAnimation} loop={isCatActive} autoplay={isCatActive} className="w-full h-full" />
                </div>
              </div>
            </div> {/* End of Top row (Logo/Mascots) */}

            {/* Desktop Navigation Bar (remains the same) */}
            <nav className="hidden md:flex items-center justify-center gap-2 lg:gap-4 mt-2 text-sm">
              {/* ... Desktop nav links ... */}
              <NavLink to="/" className={navLinkStyle} onClick={handleDesktopNavClick} end>Home</NavLink>
              <NavLink to="/about" className={navLinkStyle} onClick={handleDesktopNavClick}>About</NavLink>
              <NavLink to="/services" className={navLinkStyle} onClick={handleDesktopNavClick}>Services</NavLink>
              <NavLink to="/testimonials" className={navLinkStyle} onClick={handleDesktopNavClick}>Testimonials</NavLink>
              <button onClick={handleDesktopEnquiryClick} className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 py-2 px-3 rounded-md transition-colors">Contact</button>
            </nav>

            {/* Mobile Navigation Dropdown (remains the same) */}
            {isMobileMenuOpen && (
              <nav className="md:hidden mt-3 pt-3 border-t border-gray-200 absolute top-full left-0 w-full bg-white shadow-md">
                {/* ... Mobile nav links ... */}
                <div className="flex flex-col space-y-1 px-2 pb-3">
                  <NavLink to="/" className={navLinkStyle} onClick={handleMobileMenuLinkClick} end>Home</NavLink>
                  {/* ... other links ... */}
                  <NavLink 
                    to="/about" 
                    className={navLinkStyle}
                    onClick={handleMobileMenuLinkClick}
                  >
                    About
                  </NavLink>
                  <NavLink to="/services" className={navLinkStyle} onClick={handleDesktopNavClick}>Services</NavLink>
                  <NavLink 
                    to="/testimonials" 
                    className={navLinkStyle}
                    onClick={handleMobileMenuLinkClick}
                  >
                    Testimonials
                  </NavLink>
                  <button 
                    onClick={handleMobileMenuEnquiryClick} // This handles openEnquiryModal & closes menu
                    className="block w-full text-left text-gray-700 hover:text-purple-600 hover:bg-purple-50 py-2 px-3 rounded-md transition-colors"
                  >
                    Contact
                  </button>
                   <Link to="/privacy-policy" className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 py-2 px-3 rounded-md transition-colors" onClick={handleMobileMenuLinkClick}>Privacy Policy</Link>
                </div>
              </nav>
            )}
          </div>
        </header>

        {/* Main Content Area & Footer & Modals (remain the same) */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="min-h-full">
            <Outlet />
          </div>
        </main>
        <div className="flex-shrink-0">
          <Footer openEnquiryModal={openEnquiryModal} />
        </div>
      </div>
      <GeneralEnquiryModal isOpen={isEnquiryModalOpen} onClose={closeEnquiryModal} />
      <SmithieMessageModal isOpen={isSmithieModalOpen} onClose={closeSmithieModal} />
    </>
  );
}

export default MainLayout;