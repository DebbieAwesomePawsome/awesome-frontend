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
  const footerRef = useRef(null);
  const [mainPaddingTop, setMainPaddingTop] = useState(0);
  const [mainPaddingBottom, setMainPaddingBottom] = useState(0);

  const openEnquiryModal = () => setIsEnquiryModalOpen(true);
  const closeEnquiryModal = () => setIsEnquiryModalOpen(false);

  const triggerPetExcitement = () => { /* ... */ };
  const triggerDogOnly = () => { /* ... */ };
  const triggerCatOnly = () => { /* ... */ };

  useEffect(() => {
    const calculatePadding = () => {
      const isMobile = window.innerWidth < 768; // md breakpoint
      if (isMobile) {
        const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
        const footerActualHeight = footerRef.current ? footerRef.current.querySelector('footer')?.offsetHeight : 0;
        setMainPaddingTop(headerHeight);
        setMainPaddingBottom(footerActualHeight);
      } else {
        setMainPaddingTop(0);
        setMainPaddingBottom(0);
      }
    };
    calculatePadding();
    const timer = setTimeout(calculatePadding, 100);
    window.addEventListener('resize', calculatePadding);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePadding);
    };
  }, []);

  return (
    // MODIFIED: Base is min-h-screen. For mobile fixed layout, we add h-screen and overflow-hidden, 
    // then remove h-screen for md+ using md:h-auto to let min-h-screen and content define height.
    <div className="flex flex-col min-h-screen 
                   max-h-screen overflow-hidden {/* Apply to mobile by default for fixed layout */}
                   md:max-h-none md:h-auto md:overflow-visible {/* Override for desktop */}
                  ">
      
      <header ref={headerRef} className="fixed top-0 inset-x-0 bg-white shadow-lg z-50 md:sticky">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div 
              id="ai-assistant-header-placeholder"
              className="p-1 rounded-full hover:bg-gray-200 cursor-pointer transition-colors duration-200"
              title="Smithie AI Assistant (Coming Soon!)"
              onClick={() => alert('Smithie, our AI Assistant, is learning new tricks and will be here soon!')}
            >
              <img 
                src="/images/smithie-face-icon.png" 
                alt="Smithie AI Assistant" 
                className="h-12 w-12 rounded-full object-cover" // INCREASED Smithie icon size
              />
            </div>
            <div> {/* Removed flex-1 from here to allow brand and AI icon to be more balanced */}
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
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Lottie Mascots */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 ..."><Lottie animationData={dogAnimation} loop={true} autoplay={true} className="w-full h-full" /></div>
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 ..."><Lottie animationData={catAnimation} loop={true} autoplay={true} className="w-full h-full" /></div>
          </div>
        </div>
      </header>

      <main 
        className="flex-grow overflow-y-auto md:overflow-visible"
        style={{ 
          paddingTop: mainPaddingTop > 0 ? `${mainPaddingTop}px` : undefined, 
          paddingBottom: mainPaddingBottom > 0 ? `${mainPaddingBottom}px` : undefined 
        }}
      >
        <Outlet />
      </main>

      <div ref={footerRef} className="fixed bottom-0 inset-x-0 z-40 md:static">
        <Footer openEnquiryModal={openEnquiryModal} />
      </div>

      {/* AI Chatbot Placeholder (the one we originally had at bottom-right, if you still want it there for desktop) */}
      {/* If you moved it permanently to the header, you can remove this one. */}
      {/* For now, let's assume it's only in the header. If you want it bottom-right on desktop, uncomment and adjust. */}
      {/* <div 
        id="ai-assistant-desktop-placeholder" // Different ID if you keep both
        className="hidden md:block fixed bottom-4 right-4 z-50 p-3 ...">
        <svg ... />
      </div>
      */}
      
      <GeneralEnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={closeEnquiryModal} 
      />
    </div>
  );
}

export default MainLayout;