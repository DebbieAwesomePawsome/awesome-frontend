// frontend/src/layouts/MainLayout.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import dogAnimation from '../assets/animations/happydog.json';
import catAnimation from '../assets/animations/happycat.json';
import Footer from '../components/Footer.jsx';
import GeneralEnquiryModal from '../components/GeneralEnquiryModal.jsx';

function MainLayout() {
  const [isDogActive, setIsDogActive] = useState(false);
  const [isCatActive, setIsCatActive] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const headerRef = useRef(null);
  const footerRef = useRef(null); // Keep for desktop static footer measurement if needed, or remove if footer height is stable
  const [mainPaddingTop, setMainPaddingTop] = useState(0);
  const [mainPaddingBottom, setMainPaddingBottom] = useState(0);

  const openEnquiryModal = () => setIsEnquiryModalOpen(true);
  const closeEnquiryModal = () => setIsEnquiryModalOpen(false);

  const triggerPetExcitement = () => { /* ... */ };
  const triggerDogOnly = () => { /* ... */ };
  const triggerCatOnly = () => { /* ... */ };

  useEffect(() => {
    const calculatePadding = () => {
      if (window.innerWidth < 768) { // md breakpoint
        const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
        const footerActualHeight = footerRef.current ? footerRef.current.querySelector('footer')?.offsetHeight : 0; // Get height of actual footer tag
        setMainPaddingTop(headerHeight);
        setMainPaddingBottom(footerActualHeight);
      } else {
        setMainPaddingTop(0);
        setMainPaddingBottom(0);
      }
    };

    calculatePadding();
    // Add a small timeout for initial Lottie animations to settle if their height affects header
    const timer = setTimeout(calculatePadding, 100); 
    window.addEventListener('resize', calculatePadding);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePadding);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden md:min-h-screen md:overflow-visible">
      
      <header ref={headerRef} className="fixed top-0 inset-x-0 bg-white shadow-lg z-50 md:sticky">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex justify-between items-center"> {/* Slightly reduced py for header */}
          
          {/* Left: AI Assistant Icon + Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3"> {/* Container for icon and brand */}
            {/* AI Chatbot Placeholder - MOVED TO HEADER */}
            <div 
              id="ai-assistant-header-placeholder"
              className="p-2 rounded-full hover:bg-gray-200 cursor-pointer transition-colors duration-200" // Removed fixed, bottom, right. Added padding, hover.
              title="AI Assistant (Coming Soon!)"
              onClick={() => alert('Smithie, our AI Assistant, is learning new tricks and will be here soon!')}
              data-testid="ai-chatbot-placeholder-header"
            >
              <img 
                src="/images/smithie-face-icon.png" // <<< UPDATE THIS to your new filename
                alt="Smithie AI Assistant" 
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover" // These classes make it round!
              />
            </div>

            {/* Brand */}
            <div className="flex-1"> {/* flex-1 might not be needed if AI icon is small */}
              <Link to="/">
                <h1
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-800 tracking-wide cursor-pointer hover:text-purple-600 transition-colors"
                  onMouseEnter={triggerPetExcitement}
                >
                  Debbie's Awesome Pawsome
                </h1>
              </Link>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block"> 
                Professional Pet Care Services
              </p>
            </div>
          </div>
          
          {/* Right: Interactive Mascots */}
          <div className="flex items-center space-x-1 sm:space-x-2"> {/* Reduced space for mascots */}
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 cursor-pointer transform hover:scale-110 transition-transform duration-300"
              onMouseEnter={triggerDogOnly}
            >
              <Lottie animationData={dogAnimation} loop={true} autoplay={true} className="w-full h-full" />
            </div>
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 cursor-pointer transform hover:scale-110 transition-transform duration-300"
              onMouseEnter={triggerCatOnly}
            >
              <Lottie animationData={catAnimation} loop={true} autoplay={true} className="w-full h-full" />
            </div>
          </div>
        </div>
      </header>

      <main 
        className="flex-grow overflow-y-auto" // Scrollable content area
        style={{ 
          paddingTop: mainPaddingTop > 0 ? `${mainPaddingTop}px` : undefined, 
          paddingBottom: mainPaddingBottom > 0 ? `${mainPaddingBottom}px` : undefined 
        }}
      >
        <Outlet />
      </main>

      {/* Footer Wrapper: Fixed on mobile, static on desktop */}
      <div ref={footerRef} className="fixed bottom-0 inset-x-0 z-40 md:static">
        <Footer openEnquiryModal={openEnquiryModal} />
      </div>

      {/* General Enquiry Modal */}
      <GeneralEnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={closeEnquiryModal} 
      />
      
      {/* Old AI Chatbot Placeholder at bottom is REMOVED from here */}
    </div>
  );
}

export default MainLayout;