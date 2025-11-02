import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import NotepadApp from './components/NotepadApp';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('isDarkMode') === 'true';
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('isDarkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('isDarkMode', 'false');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <AuthProvider>
      <div className="font-sans text-gray-800 dark:text-gray-200">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route 
            path="/app" 
            element={
              <ProtectedRoute>
                <NotepadApp isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
