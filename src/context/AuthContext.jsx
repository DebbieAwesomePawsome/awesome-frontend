import React, { createContext, useContext, useEffect, useState } from "react";

// Adjust this if you later want to switch between prod and local
const API_BASE_URL = "https://debspawsome.com/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount: initialize from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("pawsome_admin_token");
    const storedUser = localStorage.getItem("pawsome_admin_user");
    if (storedToken && storedUser) {
      setAdminToken(storedToken);
      setAdminUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  async function adminLogin({ username, password }) {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Login failed");
      }
      const data = await res.json();
      setAdminToken(data.token);
      setAdminUser(data.user);
      localStorage.setItem("pawsome_admin_token", data.token);
      localStorage.setItem("pawsome_admin_user", JSON.stringify(data.user));
      return { success: true };
    } catch (err) {
      setAdminToken(null);
      setAdminUser(null);
      localStorage.removeItem("pawsome_admin_token");
      localStorage.removeItem("pawsome_admin_user");
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  }

  // Logout function
  function adminLogout() {
    setAdminToken(null);
    setAdminUser(null);
    localStorage.removeItem("pawsome_admin_token");
    localStorage.removeItem("pawsome_admin_user");
  }

  const isAdminAuthenticated = !!adminToken;

  return (
    <AuthContext.Provider
      value={{
        adminUser,
        adminToken,
        isAdminAuthenticated,
        isLoading,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy use in components
export function useAuth() {
  return useContext(AuthContext);
}
