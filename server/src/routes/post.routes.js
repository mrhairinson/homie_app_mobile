const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middlewares/index");
const uploadFile = require("../middlewares/multerMiddleware");

const {
  getAllPosts,
  getPaginationPosts,
  createPost,
  updatePost,
  deletePost,
  getFilterPosts,
  getUserPosts,
} = require("../controllers/post.controllers");

router.get("/", getAllPosts);
router.get("/user/:userId", getUserPosts);
router.get("/pagination", getPaginationPosts);
router.get("/filter", getFilterPosts);
router.post("/create", authenticateToken, uploadFile, createPost);
router.put("/update", authenticateToken, updatePost);
router.delete("/delete/:id", authenticateToken, deletePost);

module.exports = router;
