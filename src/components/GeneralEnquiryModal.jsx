// frontend/src/components/GeneralEnquiryModal.jsx
import React, { useState, useEffect } from 'react';

export default function GeneralEnquiryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Reset form when modal opens
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
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
        } catch (e) {
          console.error("Could not parse error response body:", e);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      setSuccessMessage(result.message || 'Your enquiry has been sent successfully! We will be in touch.');
      // Optionally close modal after success, maybe after a delay
       setTimeout(() => {
         onClose(); 
       }, 3000); // Close after 3 seconds
    } catch (err) {
      setError(err.message || 'Failed to send your enquiry. Please try again.');
      console.error("General enquiry submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4">
      <div className="relative mx-auto py-6 px-8 border w-full max-w-lg shadow-xl rounded-lg bg-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="mt-3 text-center">
          <h3 className="text-2xl leading-6 font-semibold text-gray-900 mb-6">General Enquiry</h3>
        </div>

        {!successMessage ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
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
              <label htmlFor="enquiryMessage" className="block text-sm font-medium text-gray-700">Your Message <span className="text-red-500">*</span></label>
              <textarea name="message" id="enquiryMessage" value={formData.message} onChange={handleChange} rows="4" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>

            {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}

            <div className="items-center gap-2 pt-4 sm:flex">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="mt-3 w-full sm:mt-0 sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6">
            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium text-gray-800 mt-4">{successMessage}</p>
            <button
              onClick={onClose}
              className="mt-6 inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}