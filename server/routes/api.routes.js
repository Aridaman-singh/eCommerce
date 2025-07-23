const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

// ------------------- Product Routes -------------------

// GET /api/products - Fetch all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST /api/products - Add a new product
router.post('/products', async (req, res) => {
  const { name, price, imageUrl } = req.body;
  if (!name || !price || !imageUrl) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const newProduct = new Product({ name, price, imageUrl });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// ------------------- Cart Routes -------------------

// GET /api/cart - Fetch all products in the cart (populated)
router.get('/cart', async (req, res) => {
  try {
    const cartItems = await Cart.find().populate('product');
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

// POST /api/cart - Add a product to the cart
router.post('/cart', async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }
  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    // Add to cart
    const cartItem = new Cart({ product: productId });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// DELETE /api/cart/:productId - Remove a product from the cart
router.delete('/cart/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    // Remove one cart item with the given productId
    const deleted = await Cart.findOneAndDelete({ product: productId });
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }
    res.json({ message: 'Product removed from cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

module.exports = router; 