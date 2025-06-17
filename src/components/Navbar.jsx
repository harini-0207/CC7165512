import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import {
  FaLinkedin, FaYoutube, FaInstagram, FaFacebook,
  FaPhoneAlt, FaMapMarkerAlt, FaEnvelope
} from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className='w-full'>
      {/* Top contact and social row */}
      <div className="bg-white text-sm flex justify-between items-center px-6 py-2 border-b border-gray-300">
        <div className="flex items-center gap-3 text-gray-700">
          <FaMapMarkerAlt />
          <span>Chennai, TamilNadu - 600103</span>
          <FaEnvelope />
          <span>info@AKeventsindia.com</span>
          <FaPhoneAlt />
          <span>+91 8531900207 / 9787526100</span>
        </div>
        <div className="flex gap-3 text-pink-700 text-lg">
          <FaLinkedin className="cursor-pointer" />
          <FaYoutube className="cursor-pointer" />
          <FaInstagram className="cursor-pointer" />
          <FaFacebook className="cursor-pointer" />
        </div>
      </div>

      {/* Logo & Navigation */}
      <nav className="flex justify-between items-center bg-white px-8 py-4 shadow-md relative z-10">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-pink-500">
          <img src="/logo1.jpg" alt="AK Events Logo" className="w-full h-full object-cover" />
        </div>

        <ul className="flex gap-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-pink-500 cursor-pointer">Home</Link></li>
          <li className="hover:text-pink-500 cursor-pointer">About Us</li>
          <li className="hover:text-pink-500 cursor-pointer">Services</li>
          <li className="hover:text-pink-500 cursor-pointer">Success Stories</li>
          <li className="hover:text-pink-500 cursor-pointer">Our Assets</li>
          <li className="hover:text-pink-500 cursor-pointer">Contact</li>
          <li><Link to="/search-booking" className="hover:text-pink-500 text-pink-600 font-semibold">Search Bookings</Link></li>
        </ul>

        {/*Navigate to Booking Page on click */}
        <button
          onClick={() => navigate('/book')}
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full font-semibold shadow-md"
        >
          BOOK SERVICE NOW
        </button>
      </nav>
    </div>
  );
}

export default Navbar; 