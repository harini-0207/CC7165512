import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const alreadyExists = users.find((u) => u.email === form.email);

    if (alreadyExists) {
      alert("User already exists!");
      return;
    }

    users.push(form);
    localStorage.setItem('users', JSON.stringify(users));
    alert("Registered Successfully! Please Login");
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-pink-200 to-pink-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 w-full max-w-md space-y-6 backdrop-blur-md"
      >
        <h2 className="text-4xl font-extrabold text-center text-pink-700 tracking-wide">
          Create Account
        </h2>

        <div>
          <label className="block text-lg font-medium mb-1 text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Your full name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm text-gray-800 placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-1 text-gray-700">Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm text-gray-800 placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-1 text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Choose a strong password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm text-gray-800 placeholder-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-pink-700 transition-all shadow-lg"
        >
          Register
        </button>

        <p className="text-center text-gray-700 text-sm">
          Already have an account?{' '}
          <span
            className="text-pink-600 font-semibold hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
