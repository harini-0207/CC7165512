import Reacrt from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BookingForm ({onSubmit,initialData}) {
    const navigate = useNavigate(); 
    const [form,setForm] = useState({
        name:"",
        contact:"",
        date:"",
        location:"",
        preferences:""
    }); 

    useEffect(()=>{
      if(initialData){
        setForm(initialData);
      }
    },[initialData]);

 const handleChange = (e) => {
  const { name, value } = e.target;
     setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) =>{
    e.preventDefault(); 

    //const bookingwithId = form.id ? form :{...form,id:Date.now()};
    if (onSubmit) {
      onSubmit(form); 
    }
    else{
      await fetch('http://localhost:5000/api/bookings',{
       method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
      });
    }
    
    setForm({name: '', contact: '', date: '', location: '', preferences: ''})
    navigate('/booking-details');
  }
  
  return (
    <form onSubmit={handleSubmit} className='max-w-xl mx-auto bg-black rounded-2xl shadow-xl p-8 space-y-5'>
       <input type="text" name="name" value={form.name} onChange={handleChange} placeholder='Full Name' className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:text-gray-500" required  />
       <input type="text" name="contact" value={form.contact} onChange={handleChange} placeholder='Phone/email' className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:text-gray-500" required  />
       <input type="date" name="date" value={form.date} onChange={handleChange}  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400  placeholder:text-gray-500" required  />
       <input type="location" name="location" value={form.location} onChange={handleChange} placeholder='Event Location'  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400  placeholder:text-gray-500" required  />
       <select
           name="preferences"
           value = {form.preferences}
           onChange={handleChange} 
           className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-black focus:outline-none focus:ring-2 focus:ring-pink-400  placeholder:text-gray-500"
           required
       >
        <option value="" disabled>Select your preferences</option>
        <option value="Theme Decoration">Theme Decoration</option>
        <option value="Catering Services">Catering Services</option>
        <option value="Photography & Videography">Photography & Videography</option>
        <option value="Music & Entertainment">Music & Entertainment</option>
        <option value="Venue Arrangement">Venue Arrangement</option>
       </select> 
       <button type="submit" className='w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded'>{initialData ? 'Update Booking':'Submit Booking'}</button>
    </form>
  )
}

export default BookingForm;