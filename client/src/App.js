import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Login from './components/Auth/Login'; 
import Register from './components/Auth/Register'; 
import { AuthProvider, AuthContext } from './context/AuthContext'; 

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter">
        <p className="text-xl text-gray-700">Loading authentication...</p>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function AppContent() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 font-inter">
      {/* Header/Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-blue-700">QuickKart</Link>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Shop</Link>
              <Link to="/cart" className="text-gray-700 hover:text-blue-600 font-medium">Cart</Link> {/*to have a cart page*/}
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">Login</Link>
              <Link to="/register" className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors duration-200">Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="py-8 px-2 sm:px-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute><Outlet /></PrivateRoute>}>
            <Route path="/" element={
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 md:mr-8 bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center lg:text-left">Products</h2>
                  <ProductList />
                </div>
                {/* <div className="w-full md:w-1/3 bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center lg:text-left">Your Shopping Cart</h2>
                  <Cart />
                </div> */} {/*moved the cart section to different page*/}
              </div>
            } />
            <Route path="/cart" element={
              <div className="flex justify-center">
                <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Your Shopping Cart</h2>
                  <Cart />
                </div>
              </div>
            } />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
