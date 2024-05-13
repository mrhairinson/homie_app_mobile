const { District } = require("../models/district.models");
const { errorCode } = require("../resources");

//Get all district by city param

const getAllDistrictByCity = async (req, res) => {
  try {
    const cityId = req.params.cityId;
    const districts = await District.find({ cityId });
    return res.status(200).json({
      errorCode: errorCode.SUCCESS,
      message: "Get districts successfully",
      data: districts,
    });
  } catch (error) {
    console.log(error);
    return res.status(errorCode.SERVER_ERROR).json({
      errorCode: errorCode.SERVER_ERROR,
      message: error,
    });
  }
};

module.exports = {
  getAllDistrictByCity,
};
