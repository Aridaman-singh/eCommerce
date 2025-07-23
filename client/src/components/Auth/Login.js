import React, { useState, useContext } from 'react';
import axios from '../../utils/axiosConfig';
import { useNavigate, Link } from 'react-router-dom'; 
import { AuthContext } from '../../context/AuthContext'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  setError('');
  setLoading(true);
  try {
    // 1. Make an API call to backend's login endpoint
    const response = await axios.post('/api/auth/login', { username, password });

    // 2. On success, get the token and user from the response
    const { token, user } = response.data;

    // 3. Call the AuthContext login function with the REAL token and user
    login(token, user);

    navigate('/'); // Redirect to home/products page
  } catch (err) {
    console.error('Login failed:', err);
    setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
  } finally {
    setLoading(false);
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to QuickKart</h2>
        <form onSubmit={handleSubmit}>
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
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        {}
        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:text-blue-700 font-semibold">
            Sign Up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
