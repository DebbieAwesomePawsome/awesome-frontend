// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Using ReactDOM.createRoot directly
import App from './App.jsx';
import './index.css'; // Tailwind CSS
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; // ACTUAL IMPORT

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* Using React.StrictMode */}
    <BrowserRouter>
      <AuthProvider> {/* ACTUAL WRAPPER */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);