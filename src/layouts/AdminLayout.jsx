// frontend/src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path if your context is elsewhere

function AdminLayout() {
  // Use the AuthContext to get user details, authentication status, and logout function
  const { adminUser, isAdminAuthenticated, adminLogout, isLoading: authIsLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    // Redirect to login page after logout to ensure a clean state
    navigate('/admin/login', { replace: true });
  };

  // While AuthContext is figuring out the auth status, show a loading message.
  // AdminProtectedRoute also does this, but it's good for robustness here too,
  // especially if AdminLayout had its own data fetching needs tied to auth.
  if (authIsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading Admin Area...</p>
      </div>
    );
  }

  // This check is a safeguard. AdminProtectedRoute should prevent unauthenticated
  // access to this layout. If somehow reached, redirect.
  if (!isAdminAuthenticated) {
    // This shouldn't ideally be hit if AdminProtectedRoute is working correctly.
    // Forcing a navigate here ensures we don't render for an unauth user.
    navigate('/admin/login', { replace: true });
    return null; // Render nothing while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Admin Navigation Bar */}
      <header className="bg-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/admin/services" className="font-bold text-2xl hover:text-indigo-200">
                Debbie's Pawsome Admin
              </Link>
            </div>
            <div className="flex items-center">
              {adminUser && (
                <span className="hidden sm:block mr-3 text-indigo-100">
                  Welcome, {adminUser.username}!
                </span>
              )}
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area where nested routes will render */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* The <Outlet /> component renders the matched child route's component
            (e.g., AdminServicesDashboardPage when URL is /admin/services) */}
        <Outlet />
      </main>

      {/* Optional Footer */}
      <footer className="bg-gray-200 text-gray-600 text-center py-4">
        &copy; {new Date().getFullYear()} Debbie's Pawsome Pet Care
      </footer>
    </div>
  );
}

export default AdminLayout;