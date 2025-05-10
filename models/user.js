const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, default: "No user Name" },
  age: { type: Number, default: 0 },
  email: { type: String, default: "123@example.com", unique: true },
  city: { type: String, default: "No City Name" },
  active: { type: Boolean, default: false },
  minor: { type: Boolean, default: true }
});

module.exports = model("User", userSchema);