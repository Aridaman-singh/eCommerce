import React from 'react';
import ProductList from './components/ProductList'; 
import Cart from './components/Cart';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2 sm:px-8 flex flex-col md:flex-row gap-8 font-inter"> {/* Added font-inter */}
      <div className="flex-1 md:mr-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center lg:text-left">Products</h2> {/* Adjusted heading size/margin */}
        <ProductList />
      </div>
      <div className="w-full md:w-1/3 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center lg:text-left">Your Shopping Cart</h2> {/* Adjusted heading size/margin */}
        <Cart />
      </div>
    </div>
  );
}

export default App;
