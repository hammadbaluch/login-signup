const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  contact: { type: String, required: true, unique: true }, // email or phone
  fullName: { type: String, required: true },
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
