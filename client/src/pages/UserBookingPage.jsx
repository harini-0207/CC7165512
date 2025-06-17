import React from 'react';
import BookingForm from '../components/BookingForm';


function UserBookingPage (){
    return(
      <div className="min-h-screen bg-pink-50 py-10 px-4">
        <h2 className='text-3xl font-bold text-center text-pink-700 mb-8'>Book Your Dream Wedding</h2>
        <BookingForm />
    </div>
 );
    
}

export default UserBookingPage;