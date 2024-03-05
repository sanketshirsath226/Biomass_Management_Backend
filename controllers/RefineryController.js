const User = require('../models/userModel');
const axios = require('axios');
exports.getRefinery = async (req, res) => {
    try {
        const refinery = await User.find({ role: 'refinery' });
        res.json({refinery : refinery});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching refinery' });
    }
};
exports.getNearesRefinery = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const depots = await User.aggregate([
            {
               $match: { role: 'refinery' }
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
        const nearestRefinery = response.data.nearest_depots;
        res.json({nearestRefinery});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Refinery' });
    }
};
