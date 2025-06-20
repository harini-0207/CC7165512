import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaCalendarAlt } from 'react-icons/fa';
import { GiPartyPopper } from 'react-icons/gi';
import logo from '../assets/logo.jpeg';

function UserBookingDetailsPage() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`);
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-booking/${id}`);
  };

  const handleDelete = async (id) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/${id}`, { method: 'DELETE' });
    fetchBookings();
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-purple-100 to-yellow-100 p-6">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-8">
        <img src={logo} alt="Event Logo" className="w-50 h-50 mb-4" />
        <h2 className="text-5xl font-extrabold text-pink-700 flex items-center gap-2 font-serif italic tracking-wide">
          <GiPartyPopper className="text-pink-500" />
         AK Booking Details
        </h2>
      </div>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <p className="text-center text-gray-700 font-medium text-lg">No bookings yet.</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking, index) => (
            <li
              key={index}
              className="bg-white rounded-3xl shadow-xl p-6 border border-pink-300 hover:shadow-3xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-pink-800">
                  <FaCalendarAlt className="inline-block mr-2 text-pink-500" />
                  {booking.name}
                </h3>
              </div>
              <p className="text-gray-800 text-xl"><strong>Contact:</strong> {booking.contact}</p>
              <p className="text-gray-800 text-xl"><strong>Date:</strong> {booking.date}</p>
              <p className="text-gray-800 text-xl"><strong>Location:</strong> {booking.location}</p>
              <p className="text-gray-800 text-xl"><strong>Preferences:</strong> {booking.preferences}</p>
              <div className="mt-4 flex gap-3 justify-end text-3xl">
                <button
                  onClick={() => handleEdit(booking._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-1"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserBookingDetailsPage;
