// frontend/src/layouts/MainLayout.jsx
import React, { useState } from 'react';
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

  const openEnquiryModal = () => setIsEnquiryModalOpen(true);
  const closeEnquiryModal = () => setIsEnquiryModalOpen(false);

  const triggerPetExcitement = () => {
    setIsDogActive(true);
    setIsCatActive(true);
    setTimeout(() => {
      setIsDogActive(false);
      setIsCatActive(false);
    }, 2000);
  };

  const triggerDogOnly = () => {
    setIsDogActive(true);
    setTimeout(() => setIsDogActive(false), 2000);
  };

  const triggerCatOnly = () => {
    setIsCatActive(true);
    setTimeout(() => setIsCatActive(false), 2000);
  };

  return (
    <>
      {/* Full viewport height container */}
      <div className="h-screen overflow-hidden flex flex-col">
        
        {/* Header: Always sticky/fixed at top */}
        <header className="sticky top-0 bg-white shadow-lg z-50 flex-shrink-0">
          <div className="w-full px-4 py-3 flex justify-between items-center">
            {/* Left: Brand + Smithie */}
            <div className="flex items-center gap-3 flex-1">
              <img 
                src="/images/smithie-icon.png" 
                alt="Smithie AI Assistant"
                className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => alert('Smithie is learning new tricks!')}
              />
              <div>
                <Link to="/">
                  <h1
                    className="text-2xl md:text-3xl font-bold text-purple-800 tracking-wide cursor-pointer hover:text-purple-600 transition-colors"
                    onMouseEnter={triggerPetExcitement}
                  >
                    Debbie's Awesome Pawsome
                  </h1>
                </Link>
                <p className="text-sm text-gray-600 hidden sm:block">
                  ABC Certified Pet Care Professional
                </p>
              </div>
            </div>
            
            {/* Right: Interactive Mascots */}
            <div className="flex items-center space-x-2">
              <div
                className="w-16 h-16 md:w-20 md:h-20 cursor-pointer transform hover:scale-110 transition-transform duration-300"
                onMouseEnter={triggerDogOnly}
              >
                <Lottie 
                  animationData={dogAnimation} 
                  loop={isDogActive} 
                  autoplay={true} 
                  className="w-full h-full" 
                />
              </div>
              <div
                className="w-16 h-16 md:w-20 md:h-20 cursor-pointer transform hover:scale-110 transition-transform duration-300"
                onMouseEnter={triggerCatOnly}
              >
                <Lottie 
                  animationData={catAnimation} 
                  loop={isCatActive} 
                  autoplay={true} 
                  className="w-full h-full" 
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full">
            <Outlet />
          </div>
        </main>

        {/* Footer: Always fixed at bottom */}
        <div className="flex-shrink-0">
          <Footer openEnquiryModal={openEnquiryModal} />
        </div>
      </div>

      {/* General Enquiry Modal */}
      <GeneralEnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={closeEnquiryModal} 
      />
    </>
  );
}

export default MainLayout;