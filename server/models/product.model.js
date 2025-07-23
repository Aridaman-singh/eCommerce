const mongoose = require('mongoose');

// Product Schema: name, price, imageUrl
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

// This ensures that no two products can have the same combination of name, price, and imageUrl.
productSchema.index({ name: 1, price: 1, imageUrl: 1 }, { unique: true });

module.exports = mongoose.model('Product', productSchema);
