// frontend/src/components/BookingFormModal.jsx
import React, { useState, useEffect } from 'react';

function BookingFormModal({ isOpen, onClose, serviceName }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    petName: '',
    petType: '',
    serviceName: '', // Will be pre-filled
    preferredDateTime: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData(prevData => ({
        ...prevData,
        serviceName: serviceName || '', // Pre-fill service name if provided
        // Reset other fields when modal opens, unless you want them to persist
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        petName: '',
        petType: '',
        preferredDateTime: '',
        notes: ''
      }));
      setError('');
      setSuccessMessage('');
      setIsSubmitting(false);
    }
  }, [isOpen, serviceName]);

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

    // Basic Client-Side Validation
    if (!formData.customerName || !formData.customerEmail || !formData.petName || !formData.serviceName || !formData.preferredDateTime) {
      setError('Please fill in all required fields: Your Name, Email, Pet Name(s), Service, and Preferred Date/Time.');
      return;
    }
    // Rudimentary email validation
    if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
        setError('Please enter a valid email address.');
        return;
    }

    setIsSubmitting(true);

   // Inside handleSubmit function in BookingFormModal.jsx
    setIsSubmitting(true);
    setError(''); // Clear previous errors
    setSuccessMessage(''); // Clear previous success messages

    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiUrl = isLocal 
        ? 'http://localhost:4000/api/booking-request' 
        : '/api/booking-request';
      
      console.log(`BookingFormModal: Submitting to API URL: ${apiUrl}`); // Optional: for debugging

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // formData should be defined and populated
      });

      // Check if the response was not OK (e.g., 4xx or 5xx errors)
      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status} - ${response.statusText}`;
        try {
          // Attempt to parse the error response body if it's JSON
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            const errorResult = await response.json();
            // Use the error message from the backend if available
            errorMessage = errorResult.error || errorResult.message || errorMessage;
          } else {
            // If not JSON, try to get the response as text (might be an HTML error page)
            const textError = await response.text();
            if (textError) errorMessage += `\nResponse: ${textError.substring(0, 200)}`; // Limit length
          }
        } catch (e) {
          // If parsing the error response body fails, log it but stick with the HTTP status
          console.error("Could not parse error response body:", e);
        }
        throw new Error(errorMessage); // This will be caught by the catch (err) block below
      }

      // If response.ok is true, then we expect a valid JSON success response from our backend
      const result = await response.json(); 

      setSuccessMessage(result.message || 'Your booking request has been sent successfully! We will contact you soon.');
      // Optionally, reset form fields here after successful submission
      setFormData({ 
        customerName: '', customerEmail: '', customerPhone: '', 
        petName: '', petType: '', serviceName: serviceName, // Keep pre-filled serviceName
        preferredDateTime: '', notes: '' 
      });
      // Or you could call onClose() after a delay:
      // setTimeout(() => {
      //   onClose(); 
      // }, 3000);

    } catch (err) {
      setError(err.message || 'Failed to send booking request. Please try again.');
      console.error("Booking form submission error:", err);
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
          <h3 className="text-2xl leading-6 font-semibold text-gray-900 mb-6">Request a Booking</h3>
        </div>

        {!successMessage ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Service Name (Pre-filled and Read-only) */}
            <div>
              <label htmlFor="serviceNameDisplay" className="block text-sm font-medium text-gray-700">Service</label>
              <input
                type="text"
                id="serviceNameDisplay"
                name="serviceName" // Still need name for formData
                value={formData.serviceName}
                onChange={handleChange} // Allow change if user clears prefill by mistake, but it's mainly for display
                readOnly // Makes it clear it's pre-selected
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm"
              />
            </div>

            {/* Customer Name */}
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Your Name <span className="text-red-500">*</span></label>
              <input type="text" name="customerName" id="customerName" value={formData.customerName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            {/* Customer Email */}
            <div>
              <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700">Your Email <span className="text-red-500">*</span></label>
              <input type="email" name="customerEmail" id="customerEmail" value={formData.customerEmail} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            {/* Customer Phone */}
            <div>
              <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700">Your Phone (Optional)</label>
              <input type="tel" name="customerPhone" id="customerPhone" value={formData.customerPhone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            
            {/* Pet Name(s) */}
            <div>
              <label htmlFor="petName" className="block text-sm font-medium text-gray-700">Pet Name(s) <span className="text-red-500">*</span></label>
              <input type="text" name="petName" id="petName" value={formData.petName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            {/* Pet Type */}
            <div>
              <label htmlFor="petType" className="block text-sm font-medium text-gray-700">Pet Type (e.g., Dog, Cat, Rabbit)</label>
              <input type="text" name="petType" id="petType" value={formData.petType} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            {/* Preferred Date/Time */}
            <div>
              <label htmlFor="preferredDateTime" className="block text-sm font-medium text-gray-700">Preferred Date(s) / Time(s) <span className="text-red-500">*</span></label>
              <input type="text" name="preferredDateTime" id="preferredDateTime" value={formData.preferredDateTime} onChange={handleChange} required placeholder="e.g., Next Tuesday afternoon, or Weekends" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Additional Notes / Special Requirements</label>
              <textarea name="notes" id="notes" value={formData.notes} onChange={handleChange} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>

            {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}

            <div className="items-center gap-2 pt-4 sm:flex">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
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

export default BookingFormModal;