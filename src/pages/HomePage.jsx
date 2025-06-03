// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import BookingFormModal from '../components/BookingFormModal'; 
import LoadingSpinner from '../components/LoadingSpinner.jsx'; 
import CertificationBanner from '../components/CertificationBanner.jsx';
import LocalSEOContent from '../components/LocalSEOContent.jsx';
// ... other imports

function HomePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for Booking Modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('');

  // Local handlers for potential future animation integration
  const handleServiceCardMouseEnterExcitement = () => {
    console.log("HomePage: Service card excitement trigger called");
  };
  const handleServiceCardMouseEnterDog = () => {
    console.log("HomePage: Service card dog trigger called");
  };
  const handleServiceCardMouseEnterCat = () => {
    console.log("HomePage: Service card cat trigger called");
  };

  useEffect(() => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const effectiveApiURL = isLocal
      ? 'http://localhost:4000/api/services'
      : '/api/services';

    console.log(`HomePage: Fetching services from: ${effectiveApiURL}`);
    setLoading(true);
    fetch(effectiveApiURL)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status} while fetching from ${effectiveApiURL}`);
        }
        return res.json();
      })
      .then(data => {
        if (data && data.services && Array.isArray(data.services)) {
          setServices(data.services);
        } else {
          console.error('HomePage: Fetched data does not contain a valid services array:', data);
          setServices([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('HomePage: Error fetching services:', err);
        setServices([]);
        setLoading(false);
      });
  }, []);

  // Booking Modal Handlers
  const handleOpenBookingModal = (serviceName) => {
    setSelectedServiceForBooking(serviceName);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedServiceForBooking(''); 
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 cursor-pointer hover:text-purple-600 transition-colors"
          onMouseEnter={handleServiceCardMouseEnterExcitement}
        >
          Our Services
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Professional, loving care in Fairfax, VA and surrounds
        </p>
      </div>
<     CertificationBanner /> {/* <<< ADD THE BANNER HERE */}


      {/* Services Section */}
      {loading ? (
        <LoadingSpinner message="Loading our totally Pawsome services..." />
        ) : (
        services.length > 0 ? (
          <div className="w-full space-y-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500 hover:border-pink-500 w-full"
                onMouseEnter={() => {
                  if (index % 2 === 0) handleServiceCardMouseEnterDog();
                  else handleServiceCardMouseEnterCat();
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Left side: Service details */}
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-green-600 mb-2">{service.name}</h3>
                    <p className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{service.price_string}</p>
                    <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
                  </div>
                  
                  {/* Right side: Book button */}
                  <div className="md:flex-shrink-0">
                    <button
                      className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-all duration-200 font-semibold hover:scale-105 transform text-lg"
                      onClick={() => handleOpenBookingModal(service.name)}
                    >
                      Request Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No services to display at the moment. Please try again later.</p>
        )
      )}

      <LocalSEOContent />

      {/* Booking Modal */}
      <BookingFormModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        serviceName={selectedServiceForBooking}
      />
    </div>
  );
}

export default HomePage;