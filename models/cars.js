const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Car', CarSchema);