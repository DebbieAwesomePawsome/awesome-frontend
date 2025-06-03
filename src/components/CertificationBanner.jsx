// frontend/src/components/CertificationBanner.jsx
import React from 'react';

export default function CertificationBanner() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-4 sm:py-6 my-8 rounded-lg shadow-md">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-xl sm:text-2xl font-semibold mb-1">
          🎓 Your Pets Deserve an Expert!
        </p>
        <p className="text-md sm:text-lg">
          Debbie is a proud graduate of the prestigious <strong className="font-bold">Animal Behavior College (ABC)</strong>, 
          ensuring professional, knowledgeable, and compassionate care for your beloved companions.
        </p>
      </div>
    </div>
  );
}