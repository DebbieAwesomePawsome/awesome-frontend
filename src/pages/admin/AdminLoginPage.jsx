// frontend/src/pages/admin/AdminLoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Adjust path if you placed AuthContext elsewhere
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';

function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { adminLogin, isAdminAuthenticated, isLoading: authIsLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // To redirect users to their original destination

  // Effect to redirect if user is already authenticated
  useEffect(() => {
    if (isAdminAuthenticated) {
      const from = location.state?.from?.pathname || '/admin/services';
      navigate(from, { replace: true });
    }
  }, [isAdminAuthenticated, navigate, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsSubmitting(true);

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await adminLogin({ username, password });
      if (result.success) {
        const from = location.state?.from?.pathname || '/admin/services';
        navigate(from, { replace: true }); // Redirect to dashboard or intended page
      } else {
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      // This catch is a fallback, adminLogin should ideally return structured errors
      setError(err.message || 'An unexpected error occurred during login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If AuthContext is still verifying the token (e.g. on page load)
  // or if user is authenticated and about to be redirected, show loading.
  if (authIsLoading) { 
    return <LoadingSpinner message="Loading..." />;
  }
  // The useEffect for redirecting if isAdminAuthenticated will still handle the redirect logic.
  // If already isAdminAuthenticated, the spinner might flash briefly before redirect.

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* You can add a logo here if you like */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Portal Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <div>
                <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;