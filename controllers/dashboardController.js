// const Dashboard = require('../models/dashboardModel');
const axios = require('axios');

exports.getPredictionValues = async (req, res) => {
    try {
        const data = {
            "Longitude": req.query.longitude,
            "Latitude": req.query.latitude,
            "year": req.query.year
        }
        console.log('Entered')
        console.log(data)
        const response = await axios.post('http://127.0.0.1:5000/forecast',{
            "Longitude": req.query.longitude,
            "Latitude": req.query.latitude,
            "year": req.query.year
        });
        const predictionValues = response.data.forecast;
        console.log(predictionValues)
        res.status(200).json({predictionValues});

    } catch (error) {
      // Handle errors
      console.error('Error fetching prediction values:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
