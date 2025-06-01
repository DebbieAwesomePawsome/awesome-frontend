// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
// Removed Link from here as "Book Now" is a button, not a router Link for now
// Removed Lottie and animation imports/state/triggers - those are now in MainLayout.jsx

function HomePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // If service card hovers should affect header animations, this needs global state/context.
  // For now, these are local console logs or could trigger local card effects.
  const handleServiceCardMouseEnterExcitement = () => {
    console.log("HomePage: Service card excitement trigger called");
    // This won't directly call triggerPetExcitement in MainLayout without further setup
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 cursor-pointer hover:text-purple-600 transition-colors"
          onMouseEnter={handleServiceCardMouseEnterExcitement} // Changed to local handler
        >
          Our Services
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Professional, loving care for your furry family members
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <span className="ml-4 text-lg text-gray-600">Loading services...</span>
        </div>
      ) : (
        services.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500 hover:border-pink-500"
                onMouseEnter={() => { // Changed to local handlers
                  if (index % 2 === 0) handleServiceCardMouseEnterDog();
                  else handleServiceCardMouseEnterCat();
                }}
              >
                {/* Name now takes on styles previously used by price (size and color) */}
                <h3 className="text-2xl font-bold text-green-600 mb-2">{service.name}</h3>
                {/* Price now takes on styles previously used by name (size and color) */}
                <p className="text-xl font-bold text-gray-800 mb-3">{service.price_string}</p>
                <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-200 font-semibold hover:scale-105 transform"
                  onMouseEnter={handleServiceCardMouseEnterExcitement} // Changed to local handler
                  onClick={handleServiceCardMouseEnterExcitement}    // Changed to local handler
                >
                  Request booking
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No services to display at the moment. Please try again later.</p>
        )
      )}
    </div>
  );
}

export default HomePage;