import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  age: Number,
  email: String,
  city: String,
  active: Boolean,
  minor: Boolean,
});

export default mongoose.model("User", userSchema);