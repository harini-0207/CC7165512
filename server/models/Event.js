const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    nam:{type:String,requred:true},
    contact: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    preferences: { type: String }
},
  {timestamps:true});

module.exports = mongoose.model('Booking',eventSchema);