// middleware/roleCheck.js
const authMiddleware = (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const allowedRoles = req.app.get('allowedRoles') || []; // Get allowed roles from app config
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
  
    next();
  };