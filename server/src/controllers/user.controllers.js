const { User } = require("../models/user.models");
const { Post } = require("../models/post.models");
const { errorCode, errorMessage } = require("../resources/index");
const { getBinarySizeInMB } = require("../helpers/index");

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId });
    return res.status(200).json({
      message: "Get user successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error,
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
    });
  }
};

/**
 * Handle get user's posts
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getUserPosts = async (req, res) => {
  try {
    const phoneNumber = req.phoneNumber;
    const posts = await Post.find({ phoneNumber: phoneNumber });
    return res.status(201).send({
      message: "Get user's posts successfully",
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (req.body.image) {
      //Check the size of the image
      const image = req.body.image;
      const imageSizeInMB = getBinarySizeInMB(image);
      console.log("Image size: " + imageSizeInMB);
      if (imageSizeInMB > 1) {
        return res.status(400).json({
          errorCode: errorCode.LARGE_IMAGE_SIZE,
          message: errorMessage.LARGE_IMAGE_SIZE,
        });
      }
    }
    const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
    });
    return res.status(201).json({
      errorCode: errorCode.SUCCESS,
      message: "Update user successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

module.exports = {
  getUser,
  getUserPosts,
  updateUser,
};
