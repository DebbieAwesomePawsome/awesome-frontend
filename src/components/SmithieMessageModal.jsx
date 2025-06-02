// frontend/src/components/SmithieMessageModal.jsx
import React from 'react';

export default function SmithieMessageModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-[60] flex justify-center items-center p-4"> {/* Higher z-index than header */}
      <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm">
        <img 
          src="/images/smithie-face-icon.png" 
          alt="Smithie" 
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-purple-700 mb-2">Hi, I'm Smithie!</h3>
        <p className="text-gray-700 mb-4">
          I'm your future AI assistant, still learning new tricks and getting ready to help you out. I'll be joining the Awesome Pawsome team officially very soon!
        </p>
        <button
          onClick={onClose}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}