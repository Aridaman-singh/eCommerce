import React, { useState } from 'react';
import axios from '../utils/axiosConfig';

function ProductItem({ product }) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(''); // Add state for local error messages

  const handleAddToCart = async () => {
    setAdding(true);
    setAdded(false); // Reset 'added' state on new attempt
    setError(''); // Clear previous errors
    try {
      await axios.post('/api/cart', { productId: product._id });
      setAdded(true);
      // Dispatch custom event to notify Cart component to refresh
      window.dispatchEvent(new CustomEvent('cart-updated'));
      
      // Reset "Added!" message after 1 second
      setTimeout(() => setAdded(false), 1000); 

    } catch (err) {
      console.error('Failed to add to cart:', err);
      // Display a user-friendly error message instead of alert()
      setError('Failed to add to cart. Please try again.'); 
      // In a real application, you'd use a custom modal or toast notification here.
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 p-4 flex flex-col items-center border border-gray-100 h-full"> {/* Added h-full */}
      <img
        src={product.imageUrl || `https://placehold.co/128x128/E0E0E0/333333?text=No+Image`}
        alt={product.name}
        className="w-full h-32 object-cover rounded mb-3 bg-gray-100"
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/128x128/E0E0E0/333333?text=No+Image`; }}
      />
      <div className="flex-grow flex flex-col justify-between items-center w-full"> {/* Added flex-grow and flex-col */}
        <h4 className="font-semibold text-lg text-gray-800 mb-1 text-center">{product.name}</h4>
        <p className="text-blue-700 font-bold mb-3">Rs.{product.price}</p>
        
        {error && ( // Display local error message if any
          <p className="text-red-600 text-sm mb-2">{error}</p>
        )}

        <button
          onClick={handleAddToCart}
          disabled={adding}
          className={`w-full py-2 rounded-md font-medium transition-colors duration-150 mt-auto 
            ${added ? 'bg-green-400 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'} 
            ${adding ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {added ? 'Added!' : adding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
