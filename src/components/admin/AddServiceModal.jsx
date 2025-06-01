// frontend/src/components/admin/AddServiceModal.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createService } from '../../services/adminApiService';

function AddServiceModal({ isOpen, onClose, onServiceAdded }) {
  const { adminToken } = useAuth();
  const [name, setName] = useState('');
  const [priceString, setPriceString] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Regular'); // Default category
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setPriceString('');
      setDescription('');
      setCategory('Regular');
      setError('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !priceString.trim() || !description.trim()) {
      setError('Name, Price, and Description are required.');
      return;
    }
    setIsSubmitting(true);
    try {
      const newServiceData = {
        name,
        price_string: priceString, // Ensure backend expects 'price_string'
        description,
        category,
      };
      await createService(newServiceData, adminToken);
      onServiceAdded(); // Callback to refresh list and close modal
    } catch (err) {
      setError(err.message || 'Failed to add service. Please try again.');
      console.error("Add service error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-xl leading-6 font-medium text-gray-900 mb-4">Add New Service</h3>
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="serviceName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="servicePrice" className="block text-sm font-medium text-gray-700">Price String (e.g., $30/hour)</label>
              <input
                type="text"
                id="servicePrice"
                value={priceString}
                onChange={(e) => setPriceString(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="serviceDescription" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="serviceDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="serviceCategory" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="serviceCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Regular">Regular</option>
                <option value="Specials">Specials</option>
                {/* Add more categories as needed, or make this dynamic later */}
              </select>
            </div>

            {error && <p className="text-sm text-red-600 bg-red-100 p-2 rounded">{error}</p>}

            <div className="items-center gap-2 pt-3 sm:flex">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Adding...' : 'Add Service'}
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
        </div>
      </div>
    </div>
  );
}

export default AddServiceModal;