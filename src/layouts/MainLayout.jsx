// src/layouts/MainLayout.jsx
import React, { useState } from 'react'; // Added useState here
import { Outlet, Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import dogAnimation from '../assets/animations/happydog.json'; // Ensure paths are correct
import catAnimation from '../assets/animations/happycat.json'; // Ensure paths are correct

function MainLayout() {
  // Animation states and triggers are moved here as they are part of the header
  // Note: With Lottie autoplay={true}, these states currently don't visually start/stop the always-on animations,
  // but the functions are still called by onMouseEnter events.
  const [isDogActive, setIsDogActive] = useState(false); // Kept for potential future use with autoplay={isDogActive}
  const [isCatActive, setIsCatActive] = useState(false); // Kept for potential future use with autoplay={isCatActive}

  const triggerPetExcitement = () => {
    console.log("MainLayout: Pet excitement triggered!"); // For testing
    setIsDogActive(true);
    setIsCatActive(true);
    setTimeout(() => {
      setIsDogActive(false);
      setIsCatActive(false);
    }, 2000);
  };

  const triggerDogOnly = () => {
    console.log("MainLayout: Dog only triggered!"); // For testing
    setIsDogActive(true);
    setTimeout(() => setIsDogActive(false), 1500);
  };

  const triggerCatOnly = () => {
    console.log("MainLayout: Cat only triggered!"); // For testing
    setIsCatActive(true);
    setTimeout(() => setIsCatActive(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="w-full bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Left: Brand */}
          <div className="flex-1">
            <Link to="/"> {/* Make brand clickable */}
              <h1
                className="text-2xl md:text-3xl font-bold text-purple-800 tracking-wide cursor-pointer hover:text-purple-600 transition-colors"
                onMouseEnter={triggerPetExcitement} // This calls the function in MainLayout
              >
                Debbie's Awesome Pawsome
              </h1>
            </Link>
            <p className="text-sm text-gray-600 hidden sm:block">
              Professional Pet Care Services
            </p>
          </div>

          {/* Right: Interactive Mascots */}
          <div className="flex items-center space-x-2">
            {/* Dog */}
            <div
              className="w-16 h-16 md:w-20 md:h-20 cursor-pointer transform hover:scale-110 transition-transform duration-300"
              onMouseEnter={triggerDogOnly} // This calls the function in MainLayout
            >
              <Lottie
                animationData={dogAnimation}
                loop={true}
                autoplay={true} // As per your current setup
                className="w-full h-full"
              />
            </div>

            {/* Cat */}
            <div
              className="w-16 h-16 md:w-20 md:h-20 cursor-pointer transform hover:scale-110 transition-transform duration-300"
              onMouseEnter={triggerCatOnly} // This calls the function in MainLayout
            >
              <Lottie
                animationData={catAnimation}
                loop={true}
                autoplay={true} // As per your current setup
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main content for public pages will be rendered here */}
      <main>
        <Outlet />
      </main>

      {/* Optional: You can add a common public footer here later */}
      {/* <footer className="text-center p-4 bg-gray-200 text-gray-700">
           © {new Date().getFullYear()} Debbie's Awesome Pawsome. All rights reserved.
         </footer> */}
    </div>
  );
}

export default MainLayout;