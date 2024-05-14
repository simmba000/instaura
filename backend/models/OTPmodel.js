// Define the schema for storing OTP temporarily
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OTPSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // OTP expires in 10 minutes (600 seconds)
  },
});

const OTPModel = mongoose.model("OTP", OTPSchema);

module.exports = OTPModel;
