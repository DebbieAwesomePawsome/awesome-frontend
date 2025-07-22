// src/pages/ServicesPage.jsx
import React, { useState, useEffect } from 'react';
import BookingFormModal from '../components/BookingFormModal'; 
import LoadingSpinner from '../components/LoadingSpinner.jsx'; 
import CertificationBanner from '../components/CertificationBanner.jsx';
import LocalSEOContent from '../components/LocalSEOContent.jsx';

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for Booking Modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const effectiveApiURL = isLocal
      ? 'http://localhost:4000/api/services'
      : '/api/services';

    setLoading(true);
    fetch(effectiveApiURL)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data && data.services && Array.isArray(data.services)) {
          setServices(data.services);
        } else {
          setServices([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching services:', err);
        setServices([]);
        setLoading(false);
      });
  }, []);

  // Separate services by category
  const coreServices = services.filter(s => 
    s.category === 'Regular' || !s.category || s.category === ''
  );
  const specialServices = services.filter(s => 
    s.category === 'Specials' || s.category === 'Special'
  );

  const handleOpenBookingModal = (serviceName) => {
    setSelectedServiceForBooking(serviceName);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedServiceForBooking(''); 
  };

  const renderServiceCard = (service) => (
    <div
      key={service.id}
      className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500 hover:border-pink-500 w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold text-green-600 mb-2">{service.name}</h3>
          <p className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{service.price_string}</p>
          <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
        </div>
        
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
  );

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-8">
      {/* Header Section - Reduced bottom margin */}
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Our Services
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Professional, loving pet care in Washington, DC
        </p>
      </div>

      <CertificationBanner />

      {/* Introductory Pricing Notice */}
      <div className="text-center mb-8 mt-8">
        <div className="inline-block bg-green-50 border-2 border-green-500 rounded-lg px-6 py-3 shadow-md">
          <p className="text-lg font-semibold text-green-800">
            🎉 Take advantage of our introductory pricing, good through December 31st, 2025! And don't forget to ask for your first-time client discount!
          </p>
        </div>
      </div>

      {/* Services Sections */}
      {loading ? (
        <LoadingSpinner message="Loading our totally Pawsome services..." />
      ) : (
        <div className="space-y-12" id="services">
          {/* Core Services */}
          {coreServices.length > 0 && (
            <section>
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
                  <span className="text-3xl">❤️</span>
                  Core Services
                  <span className="text-3xl">❤️</span>
                </h3>
                <p className="text-gray-600 mt-2">
                  Our foundation services for your pet's daily care and wellbeing
                </p>
              </div>
              <div className="space-y-6 max-w-4xl mx-auto">
                {coreServices.map(renderServiceCard)}
              </div>
            </section>
          )}

          {/* Divider - keeping the star */}
          {coreServices.length > 0 && specialServices.length > 0 && (
            <div className="flex items-center justify-center my-12">
              <div className="h-px bg-gray-300 flex-1"></div>
              <div className="px-6">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>
          )}

          {/* Special Services */}
          {specialServices.length > 0 && (
            <section>
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-purple-600 flex items-center justify-center gap-3">
                  <span className="text-3xl">✨</span>
                  Special Services
                  <span className="text-3xl">✨</span>
                </h3>
                <p className="text-gray-600 mt-2">
                  Enhanced care packages that build on our core services
                </p>
              </div>
              <div className="space-y-6 max-w-4xl mx-auto">
                {specialServices.map(renderServiceCard)}
              </div>
            </section>
          )}

          {/* If no services at all */}
          {services.length === 0 && (
            <p className="text-center text-gray-600">
              No services to display at the moment. Please try again later.
            </p>
          )}
        </div>
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

export default ServicesPage;