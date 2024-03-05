const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");
const {getDepots, getNearestDepots} = require("../controllers/DepotController");
const express = require("express");
const router = express.Router();

router.get('/getAllDepots', getDepots);
router.get('/getNearestDepots', authMiddleware , getNearestDepots);

module.exports = router;
