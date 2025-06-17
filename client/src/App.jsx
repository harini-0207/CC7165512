import React from 'react';
import { BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import Navbar from './components/Navbar';
import Aboutsection from './components/Aboutsection';
import UserBookingPage from './pages/UserBookingPage';
import UserBookingDetailsPage from './pages/UserBookingDetailsPage';
import EditBookingPage from './pages/EditBookingPage';
import BookingSearch from './components/BookingSearch';

export default function App() {
  return (
    <Router>
      <div className="font-sans">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
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
            }
          />
          <Route path="/book" element={<UserBookingPage />} />
          <Route path="/booking-details" element={<UserBookingDetailsPage />} />
          <Route path="/edit-booking/:id" element={<EditBookingPage />} />
          <Route path="/search-booking" element={<BookingSearch />} />
         <Route path="*" element={<p className="text-center mt-10 text-red-600">Page Not Found</p>} />

        </Routes>
      </div>
    </Router>
  );
}
