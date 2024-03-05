const User = require('../models/userModel');
const axios = require('axios');

exports.getDepots = async (req, res) => {
    try {
        const depots = await User.find({ role: 'depot' });
        res.json({depots : depots});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching depots' });
    }
};
exports.getNearestDepots = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const depots = await User.aggregate([
            {
               $match: { role: 'depot' }
            },
            {
                $project: {
                  _id: 0, // Exclude the _id field
                  name: 1, // Include the name field
                  _id: "$_id", // Include the object ID
                  location: {
                    longitude: "$location.longitude",
                    latitude: "$location.latitude",
                    _id: "$location._id"
                  }
                }
             }
           ]);
        const response = await axios.post('http://127.0.0.1:5000/shortestDistance',{locations : depots , source_node : user["location"]});
        const nearestDepots = response.data.nearest_depots;
        res.json({nearestDepots});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching depots' });
    }
};
