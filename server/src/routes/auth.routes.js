const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middlewares/index");

const {
  signup,
  signin,
  signout,
  verify,
  forgetPassword,
} = require("../controllers/auth.controllers");

router.post("/signup", signup);
router.post("/signup/verify", verify);
router.post("/signin", signin);
router.post("/", signin);
router.put("/forgetPassword", forgetPassword);
router.post("/signout", authenticateToken, signout);

module.exports = router;
