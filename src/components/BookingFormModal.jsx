// frontend/src/components/BookingFormModal.jsx
import React, { useState, useEffect } from 'react';

export default function BookingFormModal({ isOpen, onClose, serviceName }) {
  const initialFormData = { // Defined initial state for easier reset
    customerName: '', customerEmail: '', customerPhone: '',
    petName: '', petType: '', serviceName: '',
    preferredDateTime: '', notes: '', referralSource: '', hp_fill_if_bot: '' 
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Reset form and messages when modal opens
      setFormData({ ...initialFormData, serviceName: serviceName || '' });
      setError('');
      setSuccessMessage('');
      setIsSubmitting(false);
    }
  }, [isOpen, serviceName]); // Rerun effect if isOpen or serviceName changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Client-Side Validation
    if (!formData.customerName || !formData.customerEmail || !formData.petName || !formData.serviceName || !formData.preferredDateTime) {
      setError('Please fill in all required fields: Your Name, Email, Pet Name(s), Service, and Preferred Date/Time.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
        setError('Please enter a valid email address.');
        return;
    }

    setIsSubmitting(true);
    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiUrl = isLocal 
        ? 'http://localhost:4000/api/booking-request' 
        : '/api/booking-request';
      
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
            if (textError) errorMessage += `\nResponse: ${textError.substring(0,200)}`;
          }
        } catch (parseErr) { 
          console.error("Could not parse error response as JSON, or response was not JSON:", parseErr);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      setSuccessMessage(result.message || 'Your booking request has been sent successfully!');
      // Form fields are reset by useEffect when modal re-opens or on successful close.
      // If you want it to clear immediately after success message before auto-close:
      // setFormData(initialFormData);
    } catch (err) {
      setError(err.message || 'Failed to send booking request. Please try again.');
      console.error("Booking form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    // Modal Overlay: Fixed position, covers screen, centers content
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 h-full w-full z-50 flex justify-center items-center p-2 xs:p-4">
      
      {/* Modal Panel: Constrained width and height, flex column for internal layout */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg 
                      max-h-[80vh] xs:max-h-[75vh] flex flex-col"> {/* Max height of viewport, flex column */}
        
        {/* Modal Header: Fixed title and close button */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            {successMessage ? "Request Sent!" : `Request Booking: ${formData.serviceName || "Service"}`}
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

        {/* Modal Body: This section will scroll if content overflows */}
        <div className="px-4 sm:px-6 py-5 overflow-y-auto flex-grow">
          {!successMessage ? (
            <form onSubmit={handleSubmit} id="bookingFormModal" className="space-y-4">
              {/* Service Name (Read-only display if pre-filled) */}
              {formData.serviceName && ( // Only show if serviceName is pre-filled
                <div>
                  <label htmlFor="bookingServiceNameDisplay" className="block text-sm font-medium text-gray-700">Service</label>
                  <input type="text" id="bookingServiceNameDisplay" value={formData.serviceName} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm text-gray-600" />
                </div>
              )}
              {/* Customer Name */}
              <div>
                <label htmlFor="bookingCustomerName" className="block text-sm font-medium text-gray-700">Your Name <span className="text-red-500">*</span></label>
                <input type="text" name="customerName" id="bookingCustomerName" value={formData.customerName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              {/* Customer Email */}
              <div>
                <label htmlFor="bookingCustomerEmail" className="block text-sm font-medium text-gray-700">Your Email <span className="text-red-500">*</span></label>
                <input type="email" name="customerEmail" id="bookingCustomerEmail" value={formData.customerEmail} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              {/* Customer Phone */}
              <div>
                <label htmlFor="bookingCustomerPhone" className="block text-sm font-medium text-gray-700">Your Phone (Optional)</label>
                <input type="tel" name="customerPhone" id="bookingCustomerPhone" value={formData.customerPhone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              {/* Pet Name(s) */}
              <div>
                <label htmlFor="bookingPetName" className="block text-sm font-medium text-gray-700">Pet Name(s) <span className="text-red-500">*</span></label>
                <input type="text" name="petName" id="bookingPetName" value={formData.petName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              {/* Pet Type */}
              <div>
                <label htmlFor="bookingPetType" className="block text-sm font-medium text-gray-700">Pet Type (e.g., Dog, Cat, Rabbit)</label>
                <input type="text" name="petType" id="bookingPetType" value={formData.petType} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="bookingReferralSource" className="block text-sm font-medium text-gray-700">
                  How did you hear about us? (Optional)
                </label>
                <select
                  name="referralSource" // This MUST match the key in formData and what backend expects
                  id="bookingReferralSource"
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
              {/* Preferred Date/Time */}
              <div>
                <label htmlFor="bookingPreferredDateTime" className="block text-sm font-medium text-gray-700">Preferred Date(s) / Time(s) <span className="text-red-500">*</span></label>
                <input type="text" name="preferredDateTime" id="bookingPreferredDateTime" value={formData.preferredDateTime} onChange={handleChange} required placeholder="e.g., Next Tuesday afternoon, or Weekends" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              {/* Notes */}
              <div>
                <label htmlFor="bookingNotes" className="block text-sm font-medium text-gray-700">Additional Notes / Special Requirements</label>
                <textarea name="notes" id="bookingNotes" value={formData.notes} onChange={handleChange} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              </div>
              <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
              <label htmlFor="b_hp_comments">Please leave this field blank</label> {/* Label for accessibility/bots */}
              <input 
                type="text" 
                name="hp_fill_if_bot" // This name MUST match what backend checks
                id="b_hp_comments"    // Unique ID
                tabIndex={-1} 
                autoComplete="off"
                value={formData.hp_fill_if_bot} // Controlled component
                onChange={handleChange} 
              />
              </div>
              {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
            </form>
          ) : ( // Success Message display
            <div className="text-center py-6">
              <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-medium text-gray-800 mt-4">{successMessage}</p>
            </div>
          )}
        </div>

        {/* Modal Footer: Fixed buttons area */}
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
                type="submit" // Submits the form with id="bookingFormModal"
                form="bookingFormModal" 
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
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