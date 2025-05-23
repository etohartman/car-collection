const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const CarSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  imgUrl: String
});

module.exports = mongoose.model('Car', CarSchema);