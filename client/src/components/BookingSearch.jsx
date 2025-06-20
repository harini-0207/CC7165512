import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaPhoneAlt,
  FaCheckCircle,
  FaClock,
  FaCalendarCheck,
  FaCalendarTimes,
  FaUndoAlt,
} from 'react-icons/fa';

function BookingSearch() {
  const [allBookings, setAllBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedPreference, setSelectedPreference] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [counts, setCounts] = useState({ total: 0, upcoming: 0, past: 0 });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`)
      .then((res) => res.json())
      .then((data) => {
        setAllBookings(data);
        setFilteredBookings(data);
        calculateEventStats(data);
      });
  }, []);

  const calculateEventStats = (bookings) => {
    const today = new Date();
    const total = bookings.length;
    const upcoming = bookings.filter((b) => new Date(b.date) > today).length;
    const past = bookings.filter((b) => new Date(b.date) < today).length;
    setCounts({ total, upcoming, past });
  };

  const handleFilter = () => {
    let filtered = [...allBookings];

    if (selectedPreference) {
      filtered = filtered.filter((b) => b.preferences === selectedPreference);
    }

    if (startDate) {
      filtered = filtered.filter((b) => new Date(b.date) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter((b) => new Date(b.date) <= new Date(endDate));
    }

    setFilteredBookings(filtered);
  };

  const handleReset = () => {
    setSelectedPreference('');
    setStartDate('');
    setEndDate('');
    setFilteredBookings(allBookings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-fuchsia-100 to-amber-100 py-16 px-4">
      {/* Title & Summary */}
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-5xl font-extrabold text-pink-700 mb-6 flex items-center justify-center gap-3 font-serif italic tracking-wide">
          <FaSearch className="text-pink-500" />
          Explore Bookings
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Filter bookings by wedding service preference or date range
        </p>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          <SummaryCard icon={<FaCalendarCheck />} label="Total Bookings" value={counts.total} color="green" />
          <SummaryCard icon={<FaClock />} label="Upcoming" value={counts.upcoming} color="yellow" />
          <SummaryCard icon={<FaCalendarTimes />} label="Past" value={counts.past} color="red" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto">
          <select
            value={selectedPreference}
            onChange={(e) => setSelectedPreference(e.target.value)}
            className="p-3 rounded-xl border border-pink-400 shadow bg-white text-gray-700"
          >
            <option value="">Select Preference</option>
            <option value="Theme Decoration">Theme Decoration</option>
            <option value="Catering Services">Catering Services</option>
            <option value="Photography & Videography">Photography & Videography</option>
            <option value="Music & Entertainment">Music & Entertainment</option>
            <option value="Venue Arrangement">Venue Arrangement</option>
          </select>

          <button
            onClick={handleFilter}
            className="px-5 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition"
          >
            Apply Filter
          </button>

          <button
            onClick={handleReset}
            className="px-5 py-3 bg-gray-200 text-pink-700 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-300 transition"
          >
            <FaUndoAlt /> Reset
          </button>
        </div>
      </div>

      {/* Booking Cards */}
      {filteredBookings.length === 0 ? (
        <p className="text-center text-gray-700 text-2xl mt-16 animate-fade-in-up">
          🚫 No bookings match the selected filters.
        </p>
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
              <p className="text-gray-700 mb-2 flex items-center gap-2">
                <FaPhoneAlt className="text-pink-400" /> {b.contact}
              </p>
              <p className="text-gray-700 mb-2 flex items-center gap-2">
                <FaCalendarAlt className="text-pink-400" /> {new Date(b.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-pink-400" /> {b.location}
              </p>
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

const SummaryCard = ({ icon, label, value, color }) => {
  let iconColor = '';
  switch (color) {
    case 'green':
      iconColor = 'text-green-600 border-green-300';
      break;
    case 'yellow':
      iconColor = 'text-yellow-500 border-yellow-300';
      break;
    case 'red':
      iconColor = 'text-red-600 border-red-300';
      break;
    default:
      iconColor = 'text-gray-500 border-gray-300';
  }

  return (
    <div className={`bg-white/90 border ${iconColor.split(' ')[1]} rounded-xl px-8 py-10 shadow-xl flex flex-col items-center hover:scale-105 transform transition duration-300`}>
      <div className={`text-5xl mb-2 ${iconColor.split(' ')[0]}`}>{icon}</div>
      <h4 className="text-2xl font-semibold text-gray-800">{label}</h4>
      <p className="text-4xl font-bold text-pink-700">{value}</p>
    </div>
  );
};

export default BookingSearch;
