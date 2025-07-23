import React, { useState } from 'react';
import axios from '../../utils/axiosConfig';
import { useNavigate, Link } from 'react-router-dom'; 

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // For success/error messages
  const [isSuccess, setIsSuccess] = useState(false); // To style success/error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Clear previous messages
    setIsSuccess(false); // Reset success state

    try {
      const res = await axios.post('api/auth/register', { username, password });
      setMessage(res.data.message || 'Registration successful! Please log in.');
      setIsSuccess(true);
      // Optionally, redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000); 
    } catch (err) {
      console.error('Registration error:', err);
      setMessage(err.response?.data?.error || err.response?.data?.message || 'Registration failed. Please try again.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register for QuickCart</h2>
        <form onSubmit={handleSubmit}>
          {message && (
            <div className={`px-4 py-3 rounded relative mb-4 ${isSuccess ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`} role="alert">
              <span className="block sm:inline">{message}</span>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
