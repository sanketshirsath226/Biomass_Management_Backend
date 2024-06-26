const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', userController.register); // No middleware needed
router.post('/login', userController.login); // No middleware needed
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.post('/forgot-password', userController.forgotPassword); // No middleware needed
router.post('/reset-password/:token', userController.resetPassword); // No middleware needed
router.put('/verify-user/:token', userController.verifyUser); // No middleware needed
router.post('/verifyUserByOTP',userController.verifyUserByOTP) //no middleware needed

module.exports = router
