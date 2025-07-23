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
    // --- NEW: Handle duplicate key error specifically ---
    if (err.code === 11000) { // MongoDB duplicate key error code
      return res.status(409).json({ error: 'Product with this name, price, and image already exists.' });
    }
    console.error('Failed to add product:', err);
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
    let cartItem = await Cart.findOne({ product: productId });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
      await cartItem.populate('product');
      return res.status(200).json(cartItem);
    } else {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const newCartItem = new Cart({ product: productId, quantity: 1 });
      await newCartItem.save();
      await newCartItem.populate('product');
      return res.status(201).json(newCartItem);
    }
  } catch (err) {
    console.error('Failed to add/update cart item:', err);
    res.status(500).json({ error: 'Failed to add/update cart item' });
  }
});

// DELETE /api/cart/:productId - Remove a product from the cart
router.delete('/cart/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    let cartItem = await Cart.findOne({ product: productId });

    if (!cartItem) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
      await cartItem.populate('product');
      res.json({ message: 'Product quantity decremented', cartItem });
    } else {
      await Cart.deleteOne({ _id: cartItem._id });
      res.json({ message: 'Product removed from cart' });
    }
  } catch (err) {
    console.error('Failed to remove/decrement from cart:', err);
    res.status(500).json({ error: 'Failed to remove/decrement from cart' });
  }
});

module.exports = router;

