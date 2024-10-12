const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  handle: String,
  images: [String],  // Array to store file names
});

const User = mongoose.model('User', userSchema);

module.exports = User;
