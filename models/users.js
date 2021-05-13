const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  photo: {
    type: String,
    default: 'default.jpg'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
    // select: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
});

module.exports = mongoose.model('user', UserSchema);