// frontend/src/pages/admin/AdminServicesDashboardPage.jsx
import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
// import { useAuth } from '../../context/AuthContext'; // No longer directly needed here if modal handles token
import { getAllServices } from '../../services/adminApiService';
import AddServiceModal from '../../components/admin/AddServiceModal';
import EditServiceModal from '../../components/admin/EditServiceModal';
import { useAuth } from '../../context/AuthContext';
import { deleteService, reorderServices } from '../../services/adminApiService';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';


function AdminServicesDashboardPage() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for modal visibility
  // <<< NEW: State for Edit Modal >>>
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentServiceToEdit, setCurrentServiceToEdit] = useState(null);
  const { adminToken } = useAuth(); // <<< --- ADD THIS LINE to get the token

  // Function to fetch services - wrapped in useCallback for stability if passed as prop
  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const responseData = await getAllServices();
      if (responseData && Array.isArray(responseData.services)) {
        setServices(responseData.services);
      } else if (Array.isArray(responseData)) {
        setServices(responseData);
      } else {
        console.error("Services data is not in the expected format:", responseData);
        setError("Failed to load services: Unexpected data format from server.");
        setServices([]);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch services.');
      console.error("Dashboard fetch error:", err);
      setServices([]);
    } finally {
      setIsLoading(false);
    }
  }, []); // useCallback dependency array

  useEffect(() => {
    fetchServices();
  }, [fetchServices]); // useEffect depends on fetchServices

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleServiceAdded = () => {
    fetchServices(); // Re-fetch services to update the list
    handleCloseAddModal(); // Close the modal
    // Optionally, add a success notification here
  };

  // --- <<< NEW: Edit Modal Handlers >>> ---
  const handleOpenEditModal = (service) => {
    console.log('Attempting to open edit modal for service:', service); // <<< --- ADD THIS LINE
    setCurrentServiceToEdit(service);
    setIsEditModalOpen(true);
    console.log('After setting state: isEditModalOpen should be true, currentServiceToEdit should be set.'); // <<< --- ADD THIS LINE

  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentServiceToEdit(null); // Clear the service being edited
  };

  const handleServiceUpdated = () => {
    fetchServices(); // Re-fetch services to update the list
    handleCloseEditModal(); // Close the modal
    // Optionally, add a success notification here
  };

  // <<< --- NEW: Delete Service Handler --- >>>
  const handleDeleteService = async (serviceId, serviceName) => {
    // Show a confirmation dialog
    if (window.confirm(`Are you sure you want to delete the service: "${serviceName}"? This action cannot be undone.`)) {
      setError(null); // Clear previous errors
      // Consider setting a specific loading state for delete if it's slow
      // setIsLoading(true); // Or a different loading state like isDeleting
      try {
        if (!adminToken) {
          setError("Authentication error. Please log in again.");
          // Potentially redirect to login or show a more prominent auth error
          return;
        }
        await deleteService(serviceId, adminToken);
        // alert('Service deleted successfully!'); // Simple notification
        fetchServices(); // Refresh the list of services
      } catch (err) {
        setError(err.message || 'Failed to delete service.');
        console.error("Delete service error:", err);
      } finally {
        // setIsLoading(false); // Reset loading state if you used one
      }
    }
  };

  if (isLoading && services.length === 0) { // Show loading only if services are not yet populated
    return <div className="text-center p-4">Loading totally Pawsome services...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600 bg-red-100 rounded-md">Error: {error}</div>;
  }

  

  const handleMoveService = async (serviceId, direction) => {
    const currentIndex = services.findIndex(s => s.id === serviceId);
    if (currentIndex === -1) return; // Should not happen

    let newIndex;
    if (direction === 'up') {
      if (currentIndex === 0) return; // Already at the top
      newIndex = currentIndex - 1;
    } else if (direction === 'down') {
      if (currentIndex === services.length - 1) return; // Already at the bottom
      newIndex = currentIndex + 1;
    } else {
      return; // Invalid direction
    }

    // Create a new array with the reordered services for optimistic update
    const reorderedServices = [...services];
    const [movedService] = reorderedServices.splice(currentIndex, 1); // Remove item
    reorderedServices.splice(newIndex, 0, movedService); // Insert item at new position

    setServices(reorderedServices); // Optimistic UI update

    // Now, prepare the array of IDs in the new order for the backend
    const orderedIds = reorderedServices.map(s => s.id);

    try {
      if (!adminToken) {
        setError("Authentication error. Please log in again.");
        fetchServices(); // Revert optimistic update by fetching original order
        return;
      }
      await reorderServices(orderedIds, adminToken);
      // Success! The optimistic update is now confirmed by the backend.
      // You might want a subtle success message or just rely on the UI change.
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message || 'Failed to update service order.');
      console.error("Reorder service error:", err);
      // Revert optimistic update by fetching the original order from server
      fetchServices();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Services</h1>
        <button
          onClick={handleOpenAddModal} // Make button open the modal
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow hover:shadow-md transition duration-150 ease-in-out"
        >
          Add New Service
        </button>
      </div>

      {/* Services Table (same as before) */}
      {!isLoading && services.length === 0 && !error ? ( // Check isLoading too
        <p className="text-gray-600">No services found. Try adding some!</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            {/* ...thead (same as before)... */}
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
                <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold uppercase tracking-wider">Price</th>
                <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold uppercase tracking-wider">Category</th>
                <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold uppercase tracking-wider">Description (Excerpt)</th>
                <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold uppercase tracking-wider min-w-[180px]">Actions</th> 
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {services.map((service, index) => (
                <tr key={service.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-5 py-4 whitespace-nowrap"><p className="font-semibold">{service.name}</p></td>
                  <td className="px-5 py-4 whitespace-nowrap"><p>{service.price_string}</p></td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                      <span aria-hidden className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"></span>
                      <span className="relative">{service.category}</span>
                    </span>
                  </td>
                  <td className="px-5 py-4"><p className="truncate w-64">{service.description}</p></td>
                  {/* MODIFIED: The content of this 'Actions' <td> cell */}
                  <td className="px-5 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                        onClick={() => {
                            console.log('Edit button physically clicked for service ID:', service.id);
                            handleOpenEditModal(service);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                        Edit
                    </button>
                    {/* <<< --- MODIFIED: "Delete" button action --- >>> */}
                    <button
                      onClick={() => handleDeleteService(service.id, service.name)}
                      className="text-red-600 hover:text-red-900"
                    >
                      DELETE
                    </button>
                    {/* NEW: Move Up Button */}
                    <button
                      onClick={() => handleMoveService(service.id, 'up')}
                      disabled={index === 0} 
                      className="text-gray-500 hover:text-gray-700 mr-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Move Up"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L11 6.414V16a1 1 0 11-2 0V6.414L5.707 9.707a1 1 0 01-1.414-1.414l5-5A1 1 0 0110 3z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {/* NEW: Move Down Button */}
                    <button
                      onClick={() => handleMoveService(service.id, 'down')}
                      disabled={index === services.length - 1} 
                      className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Move Down"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 17a1 1 0 01-.707-.293l-5-5a1 1 0 011.414-1.414L9 13.586V4a1 1 0 112 0v9.586l3.293-3.293a1 1 0 011.414 1.414l-5 5A1 1 0 0110 17z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Render the AddServiceModal */}
      <AddServiceModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onServiceAdded={handleServiceAdded}
      />

      {/* <<< NEW: Render the EditServiceModal >>> */}
      {currentServiceToEdit && ( // Render only if there's a service to edit
        <EditServiceModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onServiceUpdated={handleServiceUpdated}
          serviceToEdit={currentServiceToEdit}
        />
      )}
    </div>
  );
}

export default AdminServicesDashboardPage;