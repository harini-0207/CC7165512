import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaPhoneAlt, FaCheckCircle } from 'react-icons/fa';

function BookingSearch() {
  const [allBookings, setAllBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedPreference, setSelectedPreference] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/bookings')
      .then((res) => res.json())
      .then((data) => {
        setAllBookings(data);
        setFilteredBookings(data);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSelectedPreference(value);

    if (value === '') {
      setFilteredBookings(allBookings);
    } else {
      const filtered = allBookings.filter((b) => b.preferences === value);
      setFilteredBookings(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-fuchsia-100 to-amber-100 py-16 px-4">
      {/* Title & Dropdown */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h2 className="text-5xl font-bold text-pink-700 mb-4 flex items-center justify-center gap-3 font-serif italic tracking-wide animate-fade-in-down">
          <FaSearch className="text-pink-500" />
          Explore Bookings
        </h2>
        <p className="text-lg text-gray-700">Filter bookings by wedding service preference</p>

        <div className="mt-8 animate-fade-in-up">
          <select
            value={selectedPreference}
            onChange={handleSearch}
            className="w-full max-w-md mx-auto p-4 text-lg rounded-xl border border-pink-400 shadow-xl bg-white/80 backdrop-blur-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          >
            <option value="">Select Preference</option>
            <option value="Theme Decoration">Theme Decoration</option>
            <option value="Catering Services">Catering Services</option>
            <option value="Photography & Videography">Photography & Videography</option>
            <option value="Music & Entertainment">Music & Entertainment</option>
            <option value="Venue Arrangement">Venue Arrangement</option>
          </select>
        </div>
      </div>

      {/* Booking Cards */}
      {filteredBookings.length === 0 ? (
        <p className="text-center text-gray-700 text-2xl mt-16 animate-fade-in-up">🚫 No bookings found for the selected preference.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {filteredBookings.map((b, index) => (
            <li
              key={b._id}
              className="bg-white/70 backdrop-blur-lg border border-pink-200 rounded-3xl p-6 shadow-2xl hover:shadow-pink-300 hover:scale-[1.03] transform transition duration-300 animate-slide-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-2xl font-semibold text-pink-700 flex items-center gap-2 mb-4">
                <FaUser /> {b.name}
              </h3>
              <p className="text-gray-700 mb-2 flex items-center gap-2"><FaPhoneAlt className="text-pink-400" /> {b.contact}</p>
              <p className="text-gray-700 mb-2 flex items-center gap-2"><FaCalendarAlt className="text-pink-400" /> {new Date(b.date).toLocaleDateString()}</p>
              <p className="text-gray-700 mb-2 flex items-center gap-2"><FaMapMarkerAlt className="text-pink-400" /> {b.location}</p>
              <p className="text-gray-700 mt-3 flex items-center gap-2">
                <FaCheckCircle className="text-blue-500" />
                <span className="font-medium">{b.preferences}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingSearch;
