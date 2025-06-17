import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';

function EditBookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookings')) || [];
    const found = stored.find(b => b.id === parseInt(id));
    if (!found) return navigate('/booking-details');
    setBooking(found);
  }, [id, navigate]);

  const handleUpdate = (updatedBooking) => {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const updatedList = bookings.map(b => b.id === parseInt(id) ? updatedBooking : b);
    localStorage.setItem('bookings', JSON.stringify(updatedList));
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
