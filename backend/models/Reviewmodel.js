const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  booking_id: String,
  cust_id: String,
  reviewText: {
    type: String,
    required: true
  },
  reviewDate:String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
