import React, { useState, useEffect } from 'react';

function BookingSearch() {
  const [allBookings, setAllBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedPreference, setSelectedPreference] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookings')) || [];
    setAllBookings(stored);
    setFilteredBookings(stored);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSelectedPreference(value);

    if (value === '') {
      setFilteredBookings(allBookings);
    } else {
      const filtered = allBookings.filter(b => b.preferences === value);
      setFilteredBookings(filtered);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-pink-700">Search Bookings by Preference</h2>

      <select
        value={selectedPreference}
        onChange={handleSearch}
        className="w-full p-3 rounded-lg border border-pink-400 mb-6 text-gray-500"
      >
        <option value="">-- Select Preference --</option>
        <option value="Theme Decoration">Theme Decoration</option>
        <option value="Catering Services">Catering Services</option>
        <option value="Photography & Videography">Photography & Videography</option>
        <option value="Music & Entertainment">Music & Entertainment</option>
        <option value="Venue Arrangement">Venue Arrangement</option>
      </select>

      {filteredBookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found for selected preference.</p>
      ) : (
        <ul className="space-y-4">
          {filteredBookings.map((b) => (
            <li key={b.id} className="bg-gray p-4 rounded-xl shadow border-l-4 border-pink-600">
              <p><strong>Name:</strong> {b.name}</p>
              <p><strong>Contact:</strong> {b.contact}</p>
              <p><strong>Date:</strong> {b.date}</p>
              <p><strong>Location:</strong> {b.location}</p>
              <p><strong>Preference:</strong> {b.preferences}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingSearch;
