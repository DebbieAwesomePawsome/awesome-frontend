// frontend/src/components/GeneralEnquiryModal.jsx
import React, { useState, useEffect } from 'react';

export default function GeneralEnquiryModal({ isOpen, onClose }) {
  const initialFormData = { // Defined initial state for easier reset
    name: '',
    email: '',
    subject: '',
    message: '',
    referralSource: '',
    hp_fill_if_bot: ''
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormData); // Reset form when modal opens
      setError('');
      setSuccessMessage('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in Your Name, Your Email, and Your Message.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiUrl = isLocal 
        ? 'http://localhost:4000/api/general-enquiry' 
        : '/api/general-enquiry';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status} - ${response.statusText}`;
        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            const errorResult = await response.json();
            errorMessage = errorResult.error || errorResult.message || errorMessage;
          } else {
            const textError = await response.text();
            if (textError) errorMessage += `\nResponse: ${textError.substring(0, 200)}`;
          }
        } catch (parseErr) {
          console.error("Could not parse error response as JSON, or response was not JSON:", parseErr);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      setSuccessMessage(result.message || 'Your enquiry has been sent successfully! We will be in touch.');
      // Optionally close after a delay or let user close
      // setTimeout(() => {
      //   onClose(); 
      // }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to send your enquiry. Please try again.');
      console.error("General enquiry submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-2 xs:p-4">
      {/* Modal Panel: Constrained height, flex column */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg 
                      max-h-[80vh] xs:max-h-[75vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            {successMessage ? "Enquiry Sent!" : "General Enquiry"}
          </h3>
          <button 
            onClick={onClose} 
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            aria-label="Close modal"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body (Scrollable Form Area or Success Message) */}
        <div className="px-4 sm:px-6 py-5 overflow-y-auto flex-grow">
          {!successMessage ? (
            <form onSubmit={handleSubmit} id="generalEnquiryForm" className="space-y-4">
              <div>
                <label htmlFor="enquiryName" className="block text-sm font-medium text-gray-700">Your Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" id="enquiryName" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="enquiryEmail" className="block text-sm font-medium text-gray-700">Your Email <span className="text-red-500">*</span></label>
                <input type="email" name="email" id="enquiryEmail" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="enquirySubject" className="block text-sm font-medium text-gray-700">Subject (Optional)</label>
                <input type="text" name="subject" id="enquirySubject" value={formData.subject} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
            <label htmlFor="enquirySubject" className="block text-sm font-medium text-gray-700">Subject (Optional)</label>
            <input type="text" name="subject" id="enquirySubject" value={formData.subject} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>

          
          <div>
            <label htmlFor="enquiryReferralSource" className="block text-sm font-medium text-gray-700">
              How did you hear about us? (Optional)
            </label>
            <select
              name="referralSource" // This MUST match the key in formData
              id="enquiryReferralSource"
              value={formData.referralSource}
              onChange={handleChange} // Your existing handleChange should handle this
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Please select an option</option>
              <option value="Google Search">Google Search</option>
              <option value="Facebook">Facebook</option>
              <option value="Nextdoor">Nextdoor</option>
              <option value="Referral from Friend/Family">Referral from Friend/Family</option>
              <option value="Referral from Vet">Referral from Vet</option>
              <option value="Local Ad/Flyer/Business Card">Local Ad/Flyer/Business Card</option>
              <option value="Saw Debbie Caring for a Pet">Saw Debbie Caring for a Pet</option>
              <option value="Other">Other</option>
            </select>
          </div>
              <div>
                <label htmlFor="enquiryMessage" className="block text-sm font-medium text-gray-700">Your Message <span className="text-red-500">*</span></label>
                <textarea name="message" id="enquiryMessage" value={formData.message} onChange={handleChange} rows="4" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              </div>
              <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
              <label htmlFor="ge_hp_comments">Please leave this field blank</label>
              <input 
                type="text" 
                name="hp_fill_if_bot" // Using the same name for backend consistency
                id="ge_hp_comments"   // Unique ID for this form
                tabIndex={-1} 
                autoComplete="off"
                value={formData.hp_fill_if_bot}
                onChange={handleChange}
              />
              </div>
              {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
            </form>
          ) : (
            <div className="text-center py-6">
              <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-medium text-gray-800 mt-4">{successMessage}</p>
            </div>
          )}
        </div>

        {/* Modal Footer (Buttons) */}
        <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3 flex-shrink-0">
          {!successMessage ? (
            <>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="generalEnquiryForm" // Links to the form's ID
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}