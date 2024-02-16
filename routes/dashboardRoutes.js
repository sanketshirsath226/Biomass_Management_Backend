const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');


router.get('/predictions', dashboardController.getPredictionValues);

module.exports = router;
