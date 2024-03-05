const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");
const {getRefinery, getNearesRefinery} = require("../controllers/RefineryController");
const express = require("express");
const router = express.Router();

router.get('/getRefinery', getRefinery);
router.get('/getNearestRefinery', authMiddleware , getNearesRefinery);

module.exports = router;
