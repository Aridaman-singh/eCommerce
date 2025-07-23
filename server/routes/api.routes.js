const express = require('express');
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

// --- Product Routes (no auth needed) ---

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

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
    // --- NEW: Handle duplicate key error specifically ---
    if (err.code === 11000) { // MongoDB duplicate key error code
      return res.status(409).json({ error: 'Product with this name, price, and image already exists.' });
    }
    console.error('Failed to add product:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// --- Cart Routes (auth required) ---

router.use('/cart', auth);

// GET /api/cart - Get user's cart
router.get('/cart', async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.userId }).populate('product');
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

// POST /api/cart - Add/increment product in user's cart
router.post('/cart', async (req, res) => {
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ error: 'Product ID is required' });
  try {
    let cartItem = await Cart.findOne({ product: productId, userId: req.userId });
    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = new Cart({ product: productId, quantity: 1, userId: req.userId });
      await cartItem.save();
    }
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// DELETE /api/cart/:productId - Decrement or remove product from user's cart
router.delete('/cart/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    let cartItem = await Cart.findOne({ product: productId, userId: req.userId });
    if (!cartItem) return res.status(404).json({ error: 'Product not found in cart' });

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
      res.json({ message: 'Product quantity decremented', cartItem });
    } else {
      await cartItem.deleteOne();
      res.json({ message: 'Product removed from cart' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

module.exports = router;

