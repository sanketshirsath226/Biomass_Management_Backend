// middleware/depotMiddleware.js
const depotMiddleware = (req, res, next) => {
    if (req.user.role !== 'depot') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };