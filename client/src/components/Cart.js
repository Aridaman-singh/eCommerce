import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';

function Cart() { 
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // For user messages like errors

  // Fetch cart items from the backend
  const fetchCart = async () => {
    setLoading(true);
    setMessage(''); // Clear previous messages
    try {
      const res = await axios.get('http://localhost:5001/api/cart');
      setCart(res.data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
      setCart([]); // Set cart to empty on error
      setMessage('Failed to load cart items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Effect Hook for initial fetch and event listener setup
  useEffect(() => {
    fetchCart();

    // Listen for custom event to refresh cart (e.g., when products are added from elsewhere)
    const handleCartUpdate = () => {
      fetchCart();
    };
    window.addEventListener('cart-updated', handleCartUpdate);

    // Cleanup function: remove event listener when component unmounts
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handles decrementing quantity or removing item if quantity is 1
  const handleDecrementQuantityOrRemove = async (productId) => {
    setMessage(''); // Clear previous messages
    try {
      // The DELETE request on the backend now handles decrementing quantity
      // or removing the item if quantity becomes 0
      await axios.delete(`/api/cart/${productId}`);
      fetchCart(); // Re-fetch cart to update UI with new quantities
    } catch (error) {
      console.error('Error decrementing or removing item:', error);
      setMessage('Failed to update cart item. Please try again.');
    }
  };

  // Handles incrementing quantity
  const handleIncrementQuantity = async (productId) => {
    setMessage(''); // Clear previous messages
    try {
      // The POST request on the backend now handles incrementing quantity
      await axios.post('/api/cart', { productId });
      fetchCart(); // Re-fetch cart to update UI with new quantities
    } catch (error) {
      console.error('Error incrementing item quantity:', error);
      setMessage('Failed to add more of this item. Please try again.');
    }
  };

  // Calculate total price, factoring in item quantities
  const total = cart.reduce((sum, item) => {
    const itemPrice = item.product?.price || 0;
    const itemQuantity = item.quantity || 1; // Default to 1 if quantity is missing
    return sum + (itemPrice * itemQuantity);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-inter flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Shopping Cart</h2>

        {message && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-600 text-lg py-8">Loading cart...</p>
        ) : cart.length === 0 ? (
          <p className="text-center text-gray-600 text-lg py-8">Your cart is empty.</p>
        ) : (
          <div>
            <ul className="divide-y divide-gray-200">
              {cart.map(item => (
                <li key={item._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4"> {}
                  <div className="flex items-start w-full sm:w-auto mb-4 sm:mb-0"> {}
                    <img
                      src={item.product?.imageUrl || `https://placehold.co/64x64/E0E0E0/333333?text=No+Image`}
                      alt={item.product?.name || 'Product Image'}
                      className="w-16 h-16 object-cover mr-4 rounded-md shadow-sm"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/E0E0E0/333333?text=No+Image`; }}
                    />
                    <div className="flex-1 flex flex-col"> {}
                      <div className="font-semibold text-lg text-gray-800">{item.product?.name}</div>
                      <div className="text-gray-600 mb-2">Rs.{item.product?.price?.toFixed(2)}</div> {}

                      {}
                      <div className="flex items-center space-x-2"> 
                        <button
                          onClick={() => handleDecrementQuantityOrRemove(item.product._id)}
                          className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-xl font-bold"
                          aria-label={`Decrement quantity of ${item.product?.name}`}
                        >
                          -
                        </button>
                        <span className="font-medium text-gray-700 text-lg w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrementQuantity(item.product._id)}
                          className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-xl font-bold"
                          aria-label={`Increment quantity of ${item.product?.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <hr className="my-6 border-t border-gray-200" />

            <div className="flex justify-between items-center text-xl sm:text-2xl font-bold text-gray-900">
              <span>Total:</span>
              <span>Rs. {total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
