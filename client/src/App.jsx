import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Aboutsection from './components/Aboutsection';
import UserBookingPage from './pages/UserBookingPage';
import UserBookingDetailsPage from './pages/UserBookingDetailsPage';
import EditBookingPage from './pages/EditBookingPage';
import BookingSearch from './components/BookingSearch';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './Routes/ProtectedRoute'; 

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem('loggedInUser');
      setIsLoggedIn(!!user);
    };

    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  if (isLoggedIn === null) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <Router>
      <div className="font-sans">
        {isLoggedIn && <Navbar />}

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <div className="w-full">
                    <header
                      className="w-full h-screen bg-cover bg-center bg-no-repeat bg-fixed relative"
                      style={{ backgroundImage: "url('/FirstImage.webp')" }}
                    >
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center px-4 text-center">
                        <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">
                          AK Events: Your Premier Wedding Planners In Chennai
                        </h1>
                        <p className="text-white text-lg">
                          Home | Wedding Events Management Services In Chennai
                        </p>
                      </div>
                    </header>
                  </div>
                  <main>
                    <Aboutsection />
                  </main>
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/book"
            element={
              <ProtectedRoute>
                <UserBookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-details"
            element={
              <ProtectedRoute>
                <UserBookingDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-booking/:id"
            element={
              <ProtectedRoute>
                <EditBookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search-booking"
            element={
              <ProtectedRoute>
                <BookingSearch />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<p className="text-center mt-10 text-red-600">Page Not Found</p>} />
        </Routes>
      </div>
    </Router>
  );
}
