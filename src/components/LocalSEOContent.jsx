// frontend/src/components/LocalSEOContent.jsx
import React from 'react';

export default function LocalSEOContent({ openEnquiryModal }) {
  // Updated for Washington, DC (20001)
  const currentCityBase = "Washington, DC 20001";
  const primaryServiceAreas = [
    "Shaw",
    "Mount Vernon Square",
    "Logan Circle",
    "NoMa",
    "Downtown DC",
    "Penn Quarter",
    "Capitol Hill",
    "Chinatown"
  ];
  const northwestNeighborhoods = [
    "Georgetown",
    "Dupont Circle",
    "Adams Morgan",
    "Columbia Heights",
    "U Street Corridor",
    "Bloomingdale",
    "Ledroit Park"
  ];

  // This function can trigger the General Enquiry Modal in the future
  const handleReachOutClick = () => {
   if (openEnquiryModal) {
      openEnquiryModal();
    } else {
      alert("Please use the 'Contact' link in the header to send us a message about your location!");
    }
  };

  return (
    <section className="py-10 my-10 bg-indigo-50 rounded-lg shadow-sm">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-2xl sm:text-3xl font-semibold text-purple-700 mb-3">
          Pet Sitting & Dog Walking in Washington, DC <span className="text-gray-600 font-normal">(20001 & Nearby)</span>
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          <strong className="text-indigo-700">Debbie's Awesome Pawsome</strong> is now proudly based in <strong>Washington, DC 20001</strong>,
          offering <strong>professional pet sitting, dog walking, and in-home pet care</strong> to these popular neighborhoods:
        </p>
        <div className="mb-6">
          {primaryServiceAreas.map((area) => (
            <span key={area} className="inline-block bg-purple-600 text-white text-sm font-medium mr-2 mb-2 px-4 py-2 rounded-full shadow">
              {area}
            </span>
          ))}
        </div>
        <p className="text-md text-gray-600 mb-4">
          Also serving Northwest DC and more:
        </p>
        <div className="mb-6">
          {northwestNeighborhoods.map((area) => (
            <span key={area} className="inline-block bg-gray-200 text-gray-700 text-xs font-medium mr-2 mb-2 px-3 py-1 rounded-full">
              {area}
            </span>
          ))}
        </div>
        <p className="mt-6 text-sm text-gray-500">
          If you're in Washington, DC or nearby and don't see your specific neighborhood listed, please{" "}
          <button
            onClick={handleReachOutClick}
            className="text-purple-600 hover:text-purple-800 underline font-semibold"
          >
            contact us to inquire!
          </button>
        </p>
        <div className="mt-4 text-xs text-gray-400">
          (Search terms: pet sitter DC, dog walker Washington DC, pet care 20001, cat sitter DC, dog visits Shaw, Mount Vernon, Georgetown, Dupont, Capitol Hill)
        </div>
      </div>
    </section>
  );
}
