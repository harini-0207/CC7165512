import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';

function EditBookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/${id}`)
    .then(res => res.json())
    .then(data => setBooking(data))
    .catch(() => navigate('/booking-details'));

  }, [id, navigate]);

  const handleUpdate = async(updatedBooking) => {
   await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBooking)
    });
    navigate('/booking-details');
  };

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <h2 className='text-3xl font-bold text-center text-pink-700 mb-8'>Edit Your Booking</h2>
      {booking && <BookingForm onSubmit={handleUpdate} initialData={booking} />}
    </div>
  );
}

export default EditBookingPage;
