const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middlewares/index");
const uploadMiddleware = require("../middlewares/multerMiddleware");
const {
  getUser,
  getUserPosts,
  updateUser,
  updatePassword,
} = require("../controllers/user.controllers");

router.get("/:id", getUser);
router.get("/posts", authenticateToken, getUserPosts);
router.put("/update/:id", authenticateToken, uploadMiddleware, updateUser);
router.put("/updatePassword", authenticateToken, updatePassword);

module.exports = router;
