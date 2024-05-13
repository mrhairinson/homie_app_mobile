const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const postRoutes = require("./post.routes");
const chatRoutes = require("./chat.routes");
const messageRoutes = require("./message.routes");
const cityRoutes = require("./city.routes");
const districtRoutes = require("./district.routes");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/chat", chatRoutes);
router.use("/message", messageRoutes);
router.use("/cities", cityRoutes);
router.use("/districts", districtRoutes);

module.exports = router;
