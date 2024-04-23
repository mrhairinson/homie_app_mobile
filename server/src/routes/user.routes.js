const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middlewares/index");

const {
  getUser,
  getUserPosts,
  updateUser,
} = require("../controllers/user.controllers");

router.get("/:id", getUser);
router.get("/posts", authenticateToken, getUserPosts);
router.patch("/update/:id", authenticateToken, updateUser);

module.exports = router;
