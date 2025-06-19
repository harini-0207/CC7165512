const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  contact: String,
  date: String,
  location: String,
  preferences: String
});

module.exports = mongoose.model('Booking', bookingSchema);
