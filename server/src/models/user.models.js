const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports.User = model("User", userSchema);
