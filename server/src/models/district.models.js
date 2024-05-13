const { Schema, model } = require("mongoose");

const districtSchema = new Schema(
  {
    cityId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports.District = model("District", districtSchema);
