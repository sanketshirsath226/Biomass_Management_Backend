// middleware/refinery.js
const refineryMiddleware = (req, res, next) => {
    if (req.user.role !== 'refinery') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };