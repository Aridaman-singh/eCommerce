import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import ProductItem from './ProductItem'; 

// Define the initial number of products to show
const INITIAL_PRODUCTS_LIMIT = 6;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // State to manage how many products are currently visible
  const [visibleCount, setVisibleCount] = useState(INITIAL_PRODUCTS_LIMIT);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
        // Reset visibleCount to initial limit if new products are fetched
        setVisibleCount(INITIAL_PRODUCTS_LIMIT); 
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Runs once on mount

  // Function to show all products
  const handleShowMore = () => {
    setVisibleCount(products.length); // Set visibleCount to total number of products
  };

  // Function to show only the initial limit of products
  const handleShowLess = () => {
    setVisibleCount(INITIAL_PRODUCTS_LIMIT); // Set visibleCount back to the initial limit
  };

  // Determine if the "Show More" button should be visible
  const showMoreButtonVisible = products.length > visibleCount;
  // Determine if the "Show Less" button should be visible
  const showLessButtonVisible = visibleCount > INITIAL_PRODUCTS_LIMIT;

  if (loading) {
    return <p className="text-center text-gray-600 text-lg py-8">Loading products...</p>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-600 text-lg py-8">No products available.</p>;
  }

  return (
    <div className="p-4"> {/* Added padding to the container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Render only a slice of the products array */}
        {products.slice(0, visibleCount).map(product => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>

      {/* Show More/Show Less buttons, conditionally rendered */}
      {(showMoreButtonVisible || showLessButtonVisible) && (
        <div className="flex justify-center mt-8 space-x-4"> {/* Added space-x-4 for spacing between buttons */}
          {showMoreButtonVisible && (
            <button
              onClick={handleShowMore}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Show More ({products.length - visibleCount} more)
            </button>
          )}
          {showLessButtonVisible && (
            <button
              onClick={handleShowLess}
              className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Show Less
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductList;
