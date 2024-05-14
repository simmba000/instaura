const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  age: String,
  phone: String,
  password: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ["admin", "customer"],
    default: "customer",
  },
});
const RegisterModel = mongoose.model("users", RegisterSchema);
module.exports = RegisterModel;
