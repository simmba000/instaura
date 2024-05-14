const mongoose = require('mongoose');

const bookingsSchema = new mongoose.Schema({
  cust_id: String,
  gender: String,
  appointmentdate: String,
  services: [String], // Change to array of strings
  categories: [String], // Change to array of strings
  time: String,
  message: String,
  amount: Number,
  paymentType: String,
  paymentStatus: String,
  serviceStatus:  {
    type: String,
    enum: ['Service Pending', 'Service Completed', 'Service Cancelled'],
    default: 'Service Pending'
  },
});

const Bookings = mongoose.model('Bookings', bookingsSchema);

module.exports = Bookings;
