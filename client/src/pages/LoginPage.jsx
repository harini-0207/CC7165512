import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
      alert("Login Successful");
      onLogin();
      navigate('/');
    } else {
      const existingUser = users.find((u) => u.email === email);
      if (!existingUser) {
        alert("User not found. Please register.");
        navigate('/register');
      } else {
        alert("Incorrect password.");
      }
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat transition-colors duration-500 ${
        darkMode ? 'bg-gray-900' : 'bg-pink-100'
      }`}
      style={{ backgroundImage: "url('/weddingbackground.jpg')" }}
    >
      <button
        onClick={toggleDarkMode}
        className="absolute bottom-10 right-10 bg-white/30 backdrop-blur-md p-2 rounded-full shadow hover:scale-110 transition"
        title="Toggle Theme"
      >
        {darkMode ? '🌞' : '🌙'}
      </button>

      <h3 className="text-5xl md:text-6xl font-extrabold text-white text-center drop-shadow-2xl bg-black/60 px-8 py-4 rounded-2xl mb-8 font-serif italic tracking-wider">
        AK WEDDING EVENT MANAGEMENT SYSTEM
      </h3>

      <form
        onSubmit={handleLogin}
        className={`${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } bg-opacity-80 p-10 rounded-3xl shadow-2xl w-[90%] max-w-xl space-y-6 backdrop-blur-md transition-all duration-300`}
      >
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 placeholder-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-md text-white font-semibold bg-pink-600 hover:bg-pink-700 transition-all"
        >
          Login
        </button>

        <p className="text-sm text-center">
          Don't have an account?{' '}
          <span
            className="text-pink-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
