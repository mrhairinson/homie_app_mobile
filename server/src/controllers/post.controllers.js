const { Post } = require("../models/post.models");
const { errorCode, errorMessage } = require("../resources/index");

/**
 * Handle get all posts
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).send({
      message: "Get posts successfully",
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    return res.status(500).send({
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
      message: error,
    });
  }
};

const getFilterPosts = async (req, res) => {
  try {
    const filter = req.query;
    if (filter.roomPrice) {
      const priceRange = filter.roomPrice;
      const minValue = Number(priceRange.split("+")[0]);
      const maxValue = Number(priceRange.split("+")[1]);
      if (minValue > maxValue) {
        return res.status(400).json({
          errorCode: errorCode.MIN_MAX_ERROR,
          message: errorMessage.MIN_MAX_ERROR,
        });
      }
      filter.roomPrice = { $gte: minValue, $lte: maxValue };
    }
    if (filter.roomArea) {
      const priceRange = filter.roomArea;
      const minValue = Number(priceRange.split("+")[0]);
      const maxValue = Number(priceRange.split("+")[1]);
      if (minValue > maxValue) {
        return res.status(400).json({
          errorCode: errorCode.MIN_MAX_ERROR,
          message: errorMessage.MIN_MAX_ERROR,
        });
      }
      filter.roomArea = { $gte: minValue, $lte: maxValue };
    }
    const posts = await Post.find(filter);
    return res.status(200).send({
      errorCode: errorCode.SUCCESS,
      message: "Get filter posts successfully",
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    return res.status(500).send({
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
      message: error,
    });
  }
};

/**
 * Handle get post paginations (fix pagination)
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getPaginationPosts = async (req, res) => {
  try {
    // Pagination parameters
    const pageSize = parseInt(req.query.pageSize) || 5; // Number of documents per page
    const currentPage = parseInt(req.query.page) || 1; // Current page
    // Calculate the number of documents to skip
    const skip = (currentPage - 1) * pageSize;
    const posts = await Post.find().skip(skip).limit(pageSize);
    return res.status(201).send({
      message: "Get posts successfully",
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    return res.status(500).send({
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
      message: error,
    });
  }
};

/**
 * Handle create post request
 * @param {*} req
 * @param {*} res
 * @returns
 */
const createPost = async (req, res) => {
  try {
    //Get phoneNumber
    const phoneNumber = req.phoneNumber;
    const {
      postName,
      location,
      city,
      district,
      roomDescription,
      roomArea,
      isClosed,
      roomPrice,
      roomPriceElectricity,
      roomPriceWater,
      roomPriceInternet,
      roomPriceCleaning,
      hasAirConditional,
      hasHeater,
      image,
      ownerId,
      ownerName,
    } = req.body;
    const post = new Post({
      phoneNumber: phoneNumber,
      postName: postName,
      location: location,
      city: city,
      district: district,
      roomDescription: roomDescription,
      roomArea: roomArea,
      isClosed: isClosed,
      roomPrice: roomPrice,
      roomPriceElectricity: roomPriceElectricity,
      roomPriceWater: roomPriceWater,
      roomPriceInternet: roomPriceInternet,
      roomPriceCleaning: roomPriceCleaning,
      hasAirConditional: hasAirConditional,
      hasHeater: hasHeater,
      image: image,
      ownerId: ownerId,
      ownerName: ownerName,
    });
    const result = await post.save();
    return res.status(201).json({
      message: "Post created successfully!",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
      message: error,
    });
  }
};

/**
 * Handle update post request
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updatePost = async (req, res) => {
  try {
    res.send("Update");
  } catch (error) {
    return res.status(500).json({
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
      message: error,
    });
  }
};

/**
 * Handle delete post request
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deletePost = async (req, res) => {
  try {
    const id = req.body.id; // Extract the _id from the request parameters
    const phoneNumber = req.phoneNumber;
    const post = await Post.findOne({ _id: id });
    if (post.phoneNumber === phoneNumber) {
      const result = await Post.deleteOne({ _id: id });
      if (result.deletedCount === 1) {
        return res.status(200).json({
          message: "Document deleted successfully",
          data: id,
        });
      } else {
        return res.status(404).json({
          errorCode: errorCode.DOCUMENT_NOT_FOUND,
          message: errorMessage.DOCUMENT_NOT_FOUND,
        });
      }
    }
    return res.status(401).json({
      errorCode: errorCode.NOT_PERMISSION,
      message: errorMessage.NOT_PERMISSION,
    });
  } catch (error) {
    return res.status(500).json({
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

module.exports = {
  getAllPosts,
  getPaginationPosts,
  createPost,
  updatePost,
  deletePost,
  getFilterPosts,
};
