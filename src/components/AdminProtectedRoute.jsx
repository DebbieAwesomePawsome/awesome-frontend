// frontend/src/components/AdminProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust path if your context is elsewhere
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner.jsx'; 

function AdminProtectedRoute() {
  const { isAdminAuthenticated, isLoading: authIsLoading } = useAuth();
  const location = useLocation(); // Get current location object

  if (authIsLoading) {
    // Display a loading indicator while the AuthContext determines the auth state
    // This prevents a flash of content or premature redirection
    return <LoadingSpinner message="Authenticating..." />;
  }

  if (!isAdminAuthenticated) {
    // User is not authenticated, redirect them to the /admin/login page.
    // We pass the current location in the `state` prop. This allows the login page
    // to redirect the user back to the page they were originally trying to access
    // after a successful login.
    // The `replace` prop ensures that the login page replaces the current entry in
    // the history stack, so the user doesn't navigate back to the protected route
    // they were just redirected from by pressing the browser's back button.
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If the user is authenticated, render the child component(s)
  // <Outlet /> is a placeholder provided by react-router-dom for rendering
  // the matched nested route defined in App.jsx (e.g., AdminLayout).
  return <Outlet />;
}

export default AdminProtectedRoute;