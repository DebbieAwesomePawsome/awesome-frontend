// frontend/src/components/LocalSEOContent.jsx
import React from 'react';
// Removed Link as it's not used, the button has an alert for now.

export default function LocalSEOContent() {
  // !!! IMPORTANT FOR FUTURE UPDATE !!!
  // When Debbie moves to DC, update these arrays and the introductory text below.
  const currentCityBase = "Fairfax, VA"; // Will change to "Washington D.C."
  const primaryServiceAreas = ["Fairfax City", "Vienna", "McLean", "Merrifield", "Oakton"];
  const surroundingServiceAreas = ["Annandale", "Burke", "Springfield", "Falls Church", "Reston"]; 
  // !!! END OF IMPORTANT UPDATE SECTION !!!

  // This function will eventually trigger the General Enquiry Modal
  // For now, it uses an alert. We'll need to pass down openEnquiryModal prop later.
  const handleReachOutClick = () => {
    alert("Please use the 'Contact' link in the header or footer to send us a message about your location!");
    // TODO: When integrating properly, call a prop like openEnquiryModal()
  };

  return (
    <section className="py-10 my-10 bg-indigo-50 rounded-lg shadow-sm">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-2xl sm:text-3xl font-semibold text-purple-700 mb-3">
          Proudly Serving Your Neighborhood
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          Based in <strong className="text-indigo-700">{currentCityBase}</strong>, Debbie provides exceptional, ABC Certified pet care services 
          primarily in the following areas:
        </p>
        <div className="mb-6">
          {primaryServiceAreas.map((area) => (
            <span key={area} className="inline-block bg-purple-600 text-white text-sm font-medium mr-2 mb-2 px-4 py-2 rounded-full shadow">
              {area}
            </span>
          ))}
        </div>
        <p className="text-md text-gray-600 mb-4">
          Care also extends to pets in these surrounding Northern Virginia communities:
        </p>
        <div className="mb-6">
          {surroundingServiceAreas.map((area) => (
            <span key={area} className="inline-block bg-gray-200 text-gray-700 text-xs font-medium mr-2 mb-2 px-3 py-1 rounded-full">
              {area}
            </span>
          ))}
        </div>
        <p className="mt-6 text-sm text-gray-500">
          If you're nearby and don't see your specific location listed, please {' '}
          <button 
            onClick={handleReachOutClick} 
            className="text-purple-600 hover:text-purple-800 underline font-semibold"
          >
            reach out to inquire!
          </button>
        </p>
      </div>
    </section>
  );
}