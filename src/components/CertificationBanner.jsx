// frontend/src/components/CertificationBanner.jsx
import React from 'react';

export default function CertificationBanner() {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 py-6 sm:py-8 my-8 rounded-lg shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          
          {/* Photo Section */}
          <div className="flex-shrink-0">
            <img 
              src="/images/debbie-with-dogs.jpg" 
              alt="Debbie providing loving care to two happy dogs"
              className="rounded-lg shadow-xl w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-cover"
            />
          </div>
          
          {/* Text Section */}
          <div className="text-center md:text-left flex-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-purple-800 mb-3">
              🎓 Your Pets Deserve an Expert!
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              Debbie is a proud graduate of the prestigious <strong className="font-bold text-purple-700">Animal Behavior College (ABC)</strong>, 
              ensuring professional, knowledgeable, and compassionate care for your beloved companions.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-md text-sm font-medium text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                ABC Certified Professional
              </span>
              <span className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-md text-sm font-medium text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Experienced and Caring
              </span>
              <span className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-md text-sm font-medium text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Trusted in DC
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}