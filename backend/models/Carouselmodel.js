const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema({
  title: String,
  path: String,
});       

const Carousel = mongoose.model('Carousel', carouselSchema);

module.exports = Carousel;
