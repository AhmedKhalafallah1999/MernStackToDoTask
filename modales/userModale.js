const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  tasks: [
    {
      // type: mongoose.Schema.Types.ObjectId,
      type: Object,
      ref: "Task",
      required: true,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
