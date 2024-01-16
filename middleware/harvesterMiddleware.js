// middleware/harvester.js
const harvesterMiddleware = (req, res, next) => {
    if (req.user.role !== 'harvestor') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };