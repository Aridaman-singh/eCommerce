const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1, min: 1 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Ensure a user can't have duplicate products in their cart
cartSchema.index({ product: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Cart', cartSchema);
