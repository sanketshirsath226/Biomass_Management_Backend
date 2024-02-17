const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");
const {getDepots} = require("../controllers/DepotController");
const express = require("express");
const router = express.Router();

router.get('/getAllDepots', getDepots);

module.exports = router;
