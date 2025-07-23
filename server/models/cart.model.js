const mongoose = require('mongoose');

// Cart Schema: references a Product
const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
});

module.exports = mongoose.model('Cart', cartSchema); 