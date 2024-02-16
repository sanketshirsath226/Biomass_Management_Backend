const Dashboard = require('../models/dashboardModel');
const axios = require('axios');

exports.getPredictionValues = async (req, res) => {
    try {
        
        const response = await axios.get('http://127.0.0.1:5000/prediction://prediction-api.com/predictions');
        const predictionValues = response.data;
        res.status(200).json(predictionValues);

    } catch (error) {
      // Handle errors
      console.error('Error fetching prediction values:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };