// frontend/src/pages/AboutPage.jsx

import React, { useState, useEffect } from 'react';  // Add useEffect here

// Removed: import MainLayout from '../layouts/MainLayout.jsx'; 
import { Link } from 'react-router-dom'; // Keep Link if used inside

export default function AboutPage() {
  const debbieBio = "Debbie is a passionate and certified pet care professional with over 20 years of experience. This includes dog training and caring for cats and other animals. Debbie has volunteered for many years in animal shelters on the principle that all animals deserve our love and support. Working with shelter dogs with difficult behaviour issues has given her the the confidence to tackle any challenge. It has also enhanced her expertise in helping dogs settle into their new homes. Debbie believes in providing kind, reliable, and expert care for your pets.";
  const debbiePhoto = "/images/debbie-about-photo.jpg";
  const abcBadge = "/images/abc-certification-badge-placeholder.png";

   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // No <MainLayout> wrapper here
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-xl rounded-lg p-6 md:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-8">
          About Debbie
        </h1>
        <div className="text-center mb-10">
          <img
            src={debbiePhoto}
            alt="Debbie - Certified Pet Care Professional"
            className="rounded-full w-40 h-40 sm:w-48 sm:h-48 object-cover mx-auto mb-4 shadow-lg border-4 border-purple-300"
            loading="lazy"
          />
        </div>
        <div 
          className="bg-indigo-50 border-l-4 border-indigo-600 p-6 mb-10 rounded-md shadow-md" 
          data-testid="certification-section"
        >
          <div className="flex flex-col sm:flex-row items-center">
            <img
              src={abcBadge}
              alt="Animal Behavior College Certified"
              className="w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-0 sm:mr-6 flex-shrink-0 object-contain"
              loading="lazy"
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-indigo-800 mb-2">
                Animal Behavior College Certified Professional
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Debbie is a proud graduate of the prestigious Animal Behavior College (ABC). This certification signifies a deep understanding of animal behavior, positive reinforcement training techniques, pet first aid & CPR, health, and nutrition. Choosing an ABC-certified professional means your beloved pets receive care that is not only loving but also informed by expert knowledge and best practices in the pet care industry.
              </p>
            </div>
          </div>
        </div>
        <div className="text-lg text-gray-700 space-y-6 leading-relaxed">
          <h2 className="text-2xl font-semibold text-purple-700 mb-3">Meet Your Pet's Next Best Friend!</h2>
          <p>{debbieBio}</p>
          <p>
            Debbie is committed to providing a stress-free and enriching experience for your pets, giving you peace of mind while you're away.
            All services are tailored to meet the individual needs of your animal companions.
          </p>
          <div className="mt-6 p-4 bg-purple-50 rounded-lg shadow">
            <p className="font-medium text-center sm:text-left">
              Ready to discuss your pet care needs? Please use our {' '}
              <Link 
                to="/#services"
                className="text-purple-600 hover:text-purple-800 font-semibold underline transition-colors duration-200"
              >
                Request Booking form or Contact form 
              </Link>
              {' '} found under each available service on our Services page. If you can't find what you're looking for, contact us!
            </p>
          </div>
        </div>
      </div>
    </section>
    // No </MainLayout> wrapper here
  );
}