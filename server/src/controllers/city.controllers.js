const { City } = require("../models/city.models");
const { errorCode } = require("../resources");

//Get all cities

const getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    return res.status(200).json({
      errorCode: errorCode.SUCCESS,
      message: "Get all cities successfully",
      data: cities,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
      message: error,
    });
  }
};

module.exports = {
  getAllCities,
};
