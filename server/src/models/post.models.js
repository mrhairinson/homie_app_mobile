const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    postName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    // longitude: {
    //   type: String,
    //   required: true,
    // },
    // latitude: {
    //   type: String,
    //   required: true,
    // },
    roomDescription: {
      type: String,
      required: true,
    },
    roomArea: {
      type: Number,
      required: true,
    },
    roomPrice: {
      type: Number,
      required: true,
    },
    roomPriceElectricity: {
      type: Number,
      required: true,
    },
    roomPriceWater: {
      type: Number,
      required: true,
    },
    roomPriceInternet: {
      type: Number,
      required: true,
    },
    roomPriceCleaning: {
      type: Number,
      required: true,
    },
    isClosed: {
      type: Boolean,
      required: true,
    },
    hasAirConditional: {
      type: Boolean,
      required: true,
    },
    hasHeater: {
      type: Boolean,
      required: true,
    },
    image: {
      type: [String],
    },
    ownerId: {
      type: String,
      required: true,
    },
    // ownerName: {
    //   type: String,
    //   required: true,
    // },
    expireAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 30 * 2, //Delete automatically after 2 month
    },
  },
  { timestamps: true }
);

module.exports.Post = model("Post", postSchema);
