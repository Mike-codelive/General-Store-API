const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  photo: {
    type: String,
    default: 'default.jpg',
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number
  },
  colors: {
    type: String
  },
  stock: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  stars: {
    type: String
  },
  reviews: {
    type: String
  }

});

module.exports = mongoose.model('product', UserSchema);