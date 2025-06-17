import React, { useState } from 'react';

export default function LoginRegister() {
  const [role, setRole] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-white to-pink-200 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-pink-600">
          {isLogin ? 'Welcome Back!' : 'Create Your Account'}
        </h1>

        {/* Role Selection */}
        <div className="mb-4 bg-black-200">
          <label className="block mb-1 text-sm font-medium text-gray-700">Select Your Role</label>
          <select
            value={role}
            onChange={handleRoleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="">-- Choose Role --</option>
            <option value="user">User</option>
            <option value="planner">Wedding Planner</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {role && (
          <form className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-3 py-2 border rounded-lg"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-lg"
            />

            {/* Additional field only for signup */}
            {!isLogin && role === 'planner' && (
              <input
                type="text"
                placeholder="Specialization (e.g., Decorator)"
                className="w-full px-3 py-2 border rounded-lg"
              />
            )}

            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
        )}

        {/* Toggle Login / Signup */}
        <div className="mt-4 text-center text-sm">
          {isLogin ? (
            <>
              Don’t have an account?{' '}
              <button
                className="text-pink-600 underline"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                className="text-pink-600 underline"
                onClick={() => setIsLogin(true)}
              >
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
