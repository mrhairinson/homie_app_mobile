const express = require("express");
const router = express.Router();

const { getAllCities } = require("../controllers/city.controllers");

router.get("/", getAllCities);

module.exports = router;
