const { Schema, model } = require("mongoose");

const otpSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    otpNumber: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      expires: 300, //Delete automatically after 5 minutes
    },
  },
  { timestamps: true }
);

module.exports.Otp = model("OTP", otpSchema);
