const express = require("express");
const router = express.Router();

const { getAllDistrictByCity } = require("../controllers/district.controllers");

router.get("/:cityId", getAllDistrictByCity);

module.exports = router;
