const { Post } = require("../models/post.models");
const { errorCode, errorMessage } = require("../resources/index");
const { uploadSingleImageToAWS } = require("../helpers/index");

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

//Get post by userId
const getUserPosts = async (req, res) => {
  try {
    const ownerId = req.params.userId;
    const posts = await Post.find({ ownerId: ownerId });
    return res.status(200).json({
      errorCode: errorCode.SUCCESS,
      message: "Get user's posts successfully",
      data: posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error,
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
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
    const newPost = req.body;
    newPost.phoneNumber = phoneNumber;
    const images = req.files;
    //Xư lí điền thiếu thông tin
    //Duyệt qua các key trong obj newPost
    for (const key in newPost) {
      if (newPost[key] === "" || newPost[key] === "undefined") {
        return res.status(400).json({
          errorCode: errorCode.MISSING_REQUIRED_FIELD,
          message: errorMessage.MISSING_REQUIRED_FIELD,
        });
      }
    }
    //Xu ly images
    if (images.length !== 0) {
      let imageLs = new Array();
      for (const file of images) {
        file.originalname = `${crypto.randomUUID()}${file.originalname}`;
        await uploadSingleImageToAWS(file);
        let fileName = `https://homiebucket2.s3.ap-southeast-2.amazonaws.com/uploads/${file.originalname}`;
        imageLs.push(fileName);
      }
      newPost.image = imageLs;
    } else {
      newPost.image = null;
    }
    const post = new Post(newPost);
    const result = await post.save();
    return res.status(201).json({
      errorCode: errorCode.SUCCESS,
      message: "Post created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
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
    const id = req.params.id; // Extract the _id from the request parameters
    const phoneNumber = req.phoneNumber;
    const post = await Post.findOne({ _id: id });
    if (post.phoneNumber === phoneNumber) {
      const result = await Post.deleteOne({ _id: id });
      if (result.deletedCount === 1) {
        return res.status(200).json({
          errorCode: errorCode.SUCCESS,
          message: "Document deleted successfully",
          data: result,
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
  getUserPosts,
};
