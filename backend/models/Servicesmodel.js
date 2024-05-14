const mongoose= require('mongoose')

const ServicesSchema = new mongoose.Schema ({
    category: String,
    subCategory: String,
    price: Number,
    service: String,
    estimatedTime: Number
});
const ServicesModel = mongoose.model("services", ServicesSchema)
module.exports = ServicesModel 