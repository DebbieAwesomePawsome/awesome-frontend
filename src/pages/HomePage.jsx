// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocalSEOContent from '../components/LocalSEOContent.jsx';
import GeneralEnquiryModal from '../components/GeneralEnquiryModal.jsx';

function HomePage() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const openEnquiryModal = () => setIsEnquiryModalOpen(true);
  const closeEnquiryModal = () => setIsEnquiryModalOpen(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      {/* Welcome Banner */}
      <section className="text-center py-8 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          Welcome to Debbie's Awesome Pawsome
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700">
          Your trusted pet care partner in Washington, DC
        </p>
      </section>

      {/* Hero Image in Elliptical Frame */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden rounded-[50%] shadow-2xl border-4 border-purple-200">
            <img 
              src="/images/debbie-hero-poodle-small.jpg" 
              alt="Debbie with a happy poodle and soccer ball"
              className="w-full h-full object-contain"  // Changed from object-cover to object-contain
              style={{ backgroundColor: '#f3f4f6' }}  // Add a background color for empty space
            />
          </div>
        </div>
      </section>

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

            {/* Services Card */}
            <Link to="/services" className="group">
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
            </Link>

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

            {/* Contact Card */}
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

      {/* Your Pet's Happiness Message */}
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
          <Link 
            to="/services" 
            className="inline-block mt-6 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all hover:scale-105"
          >
            View Our Services
          </Link>
        </div>
      </section>

      {/* Service Areas */}
      <LocalSEOContent openEnquiryModal={openEnquiryModal} />

      {/* General Enquiry Modal */}
      <GeneralEnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={closeEnquiryModal} 
      />
    </div>
  );
}

export default HomePage;