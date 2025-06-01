// frontend/src/components/admin/EditServiceModal.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateService } from '../../services/adminApiService';

function EditServiceModal({ isOpen, onClose, onServiceUpdated, serviceToEdit }) {
  const { adminToken } = useAuth();

  // Form state
  const [name, setName] = useState('');
  const [priceString, setPriceString] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Regular');
  // We don't edit sort_order directly in this form; that's handled by reordering UI.

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when serviceToEdit changes or modal opens
  useEffect(() => {
    if (serviceToEdit && isOpen) {
      setName(serviceToEdit.name || '');
      setPriceString(serviceToEdit.price_string || '');
      setDescription(serviceToEdit.description || '');
      setCategory(serviceToEdit.category || 'Regular');
      setError(''); // Clear previous errors
    }
    if (!isOpen) { // Clear form if modal is closed externally
        setIsSubmitting(false);
        setError('');
    }
  }, [serviceToEdit, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !priceString.trim() || !description.trim()) {
      setError('Name, Price, and Description are required.');
      return;
    }
    if (!serviceToEdit || !serviceToEdit.id) {
        setError('No service selected for editing.');
        return;
    }

    setIsSubmitting(true);
    try {
      const updatedServiceData = {
        name,
        price_string: priceString,
        description,
        category,
        // We don't send sort_order here, it's managed separately
      };
      await updateService(serviceToEdit.id, updatedServiceData, adminToken);
      onServiceUpdated(); // Callback to refresh list and close modal
    } catch (err) {
      setError(err.message || 'Failed to update service. Please try again.');
      console.error("Update service error:", err);
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
          <h3 className="text-xl leading-6 font-medium text-gray-900 mb-4">Edit Service</h3>
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label htmlFor="editServiceName" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="editServiceName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="editServicePrice" className="block text-sm font-medium text-gray-700">Price String (e.g., $30/hour)</label>
              <input
                type="text"
                id="editServicePrice"
                value={priceString}
                onChange={(e) => setPriceString(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="editServiceDescription" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="editServiceDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="editServiceCategory" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="editServiceCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Regular">Regular</option>
                <option value="Specials">Specials</option>
                {/* Add more categories as needed */}
              </select>
            </div>

            {error && <p className="text-sm text-red-600 bg-red-100 p-2 rounded">{error}</p>}

            <div className="items-center gap-2 pt-3 sm:flex">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
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

export default EditServiceModal;