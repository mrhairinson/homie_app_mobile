const { Schema, model } = require("mongoose");

const citySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports.City = model("City", citySchema);
