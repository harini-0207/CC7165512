import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserBookingDetailsPage () {
    const[bookings,setBookings] = useState([]);
    const navigate = useNavigate(); 

    useEffect(()=>{
        const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
    },[]);
    
    const handleEdit = (id) =>{
        navigate(`/edit-booking/${id}`); 
     }

    const handleDelete = (id) =>{
        const updated = bookings.filter(b=> b.id !== id);
        setBookings(updated);
        localStorage.setItem('bookings',JSON.stringify(updated)); 
    }

    return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-pink-700">Booking Details</h2>
      {bookings.length === 0 ? (
        <p className="text-center">No bookings yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking, index) => (
            <li key={index} className="bg-pink-300 rounded-2xl shadow-lg p-6 border border-pink-800 text-purple-900 ">
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Contact:</strong> {booking.contact}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Location:</strong> {booking.location}</p>
              <p><strong>Preferences:</strong> {booking.preferences}</p>
              <div className="mt-4 flex gap-3">
                  <button onClick={()=>handleEdit(booking.id)} className="bg-green-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() =>handleDelete(booking.id)} className="bg-red-400 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </li>
             
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserBookingDetailsPage;