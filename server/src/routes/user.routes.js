const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middlewares/index");
const uploadFile = require("../middlewares/multerMiddleware");
const {
  getUser,
  getUserPosts,
  updateUser,
} = require("../controllers/user.controllers");

router.get("/:id", getUser);
router.get("/posts", authenticateToken, getUserPosts);
router.post("/update/:id", authenticateToken, uploadFile, updateUser);

module.exports = router;
