const User = require('../models/userModel');
exports.getDepots = async (req, res) => {
    try {
        const depots = await User.find({ role: 'depot' });
        res.json({depots : depots});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching depots' });
    }
};
