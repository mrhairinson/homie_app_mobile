const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middlewares/index");

const {
  getAllPosts,
  getPaginationPosts,
  createPost,
  updatePost,
  deletePost,
  getFilterPosts,
} = require("../controllers/post.controllers");

router.get("/", getAllPosts);
router.get("/pagination", getPaginationPosts);
router.get("/filter/:type", getFilterPosts);
router.post("/create", authenticateToken, createPost);
router.put("/update", authenticateToken, updatePost);
router.delete("/delete", authenticateToken, deletePost);

module.exports = router;
