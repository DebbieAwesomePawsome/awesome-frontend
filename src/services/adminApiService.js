// frontend/src/services/adminApiService.js

// Using the production API base URL as per our current strategy
const API_BASE_URL = "https://debspawsome.com/api";

// Helper function to get authorization headers
const getAuthHeaders = (token) => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

// Fetch all services (public endpoint, but we might call it from admin context)
export const getAllServices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/services`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error; // Re-throw to be caught by the calling component
  }
};

// Create a new service (Protected Endpoint)
export const createService = async (serviceData, token) => {
  if (!token) {
    throw new Error("Authentication token not provided for creating service.");
  }
  try {
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(serviceData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

// Update an existing service (Protected Endpoint)
export const updateService = async (serviceId, serviceData, token) => {
  if (!token) {
    throw new Error("Authentication token not provided for updating service.");
  }
  try {
    const response = await fetch(`${API_BASE_URL}/services/${serviceId}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(serviceData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

// Delete a service (Protected Endpoint)
export const deleteService = async (serviceId, token) => {
  if (!token) {
    throw new Error("Authentication token not provided for deleting service.");
  }
  try {
    const response = await fetch(`${API_BASE_URL}/services/${serviceId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token), // Ensure Content-Type is not set if no body by some fetch defaults
    });
    // DELETE might return 204 No Content, which is ok and might not have JSON body
    if (response.status === 204) {
        return { success: true, message: 'Service deleted successfully' };
    }
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Or specific success message if API returns one
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

// frontend/src/services/adminApiService.js
// ... (API_BASE_URL, getAuthHeaders, getAllServices, createService, updateService, deleteService functions remain) ...

// Reorder services (Protected Endpoint)
export const reorderServices = async (orderedIds, token) => {
  if (!token) {
    throw new Error("Authentication token not provided for reordering services.");
  }
  if (!Array.isArray(orderedIds)) {
    throw new Error("Invalid input: orderedIds must be an array.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/services/order`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify({ orderedIds }), // Backend expects { orderedIds: [...] }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Should return { message: 'Services reordered successfully.' }
  } catch (error) {
    console.error("Error reordering services:", error);
    throw error;
  }
};