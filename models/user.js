const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  email: {
    type: String,
    required: [true, "Email field is required"],
  },
  password: String,
  verify: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
