const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');


router.get('/biomass', dashboardController.getPredictionValues);

module.exports = router;
