// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CertificationBanner from '../components/CertificationBanner.jsx';
import LocalSEOContent from '../components/LocalSEOContent.jsx';
import GeneralEnquiryModal from '../components/GeneralEnquiryModal.jsx';

function HomePage() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const openEnquiryModal = () => setIsEnquiryModalOpen(true);
  const closeEnquiryModal = () => setIsEnquiryModalOpen(false);

  return (
    <div className="w-full">
      {/* Hero Section with Image */}
      <section className="relative h-[500px] md:h-[600px] mb-12">
        <div className="absolute inset-0">
          <img 
            src="/images/debbie-hero-poodle.jpg" 
            alt="Debbie with a happy poodle and soccer ball"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>
        
        {/* Hero Content Overlay */}
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Welcome to Debbie's Awesome Pawsome
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md">
              Your trusted pet care partner in Washington, DC. 
              Where every pet is treated with love, respect, and professional expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Certification Banner */}
      <div className="px-4 md:px-8 lg:px-12">
        <CertificationBanner />
      </div>

      {/* Main Navigation Cards */}
      <section className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            How Can We Help You Today?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* About Card */}
            <Link to="/about" className="group">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                <div className="text-center">
                  <div className="text-4xl mb-4">👋</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600">
                    About Debbie
                  </h3>
                  <p className="text-gray-600">
                    Meet your ABC-certified pet care professional
                  </p>
                </div>
              </div>
            </Link>

            {/* Services Card - Updated to use anchor link */}
            <a href="/#services" className="group">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                <div className="text-center">
                  <div className="text-4xl mb-4">🐾</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600">
                    Our Services
                  </h3>
                  <p className="text-gray-600">
                    Explore our core & special pet care offerings
                  </p>
                </div>
              </div>
            </a>

            {/* Testimonials Card */}
            <Link to="/testimonials" className="group">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                <div className="text-center">
                  <div className="text-4xl mb-4">⭐</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600">
                    Testimonials
                  </h3>
                  <p className="text-gray-600">
                    See what our happy clients say about us
                  </p>
                </div>
              </div>
            </Link>

            {/* Contact Card - Updated to open modal directly */}
            <button 
              onClick={openEnquiryModal}
              className="group text-left w-full"
            >
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                <div className="text-center">
                  <div className="text-4xl mb-4">📧</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600">
                    Contact Us
                  </h3>
                  <p className="text-gray-600">
                    Get in touch for booking or questions
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="bg-purple-50 py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Your Pet's Happiness is Our Priority
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you need a reliable dog walker, a caring pet sitter, or specialized care 
            for your furry family member, Debbie's Awesome Pawsome is here to help. 
            With professional training and genuine love for animals, we provide peace of mind 
            while you're away and joy for your pets every day.
          </p>
          <a 
            href="/#services" 
            className="inline-block mt-6 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all hover:scale-105"
          >
            View Our Services
          </a>
        </div>
      </section>

      {/* Service Areas */}
      <LocalSEOContent />

      {/* General Enquiry Modal */}
      <GeneralEnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={closeEnquiryModal} 
      />
    </div>
  );
}

export default HomePage;