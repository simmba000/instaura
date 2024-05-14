const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: String,
  path: String,
});       

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
