const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const crypto = require('crypto'); // For token generation

// Function for sending email (assuming a separate utility)
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate user input (e.g., check for empty fields, valid role)

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const user = new User({ name, email, password, role });
        await user.save();

        const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({

                message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '1h' });
        res.json({ message: 'User logged in successfully', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in user' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching user profile' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        // Validate user input (e.g., check for empty fields, valid role)

        const user = await User.findByIdAndUpdate(req.user.userId, { name, email, role }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating user profile' });
    }
};
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = user.generateToken();
        await user.save();

        // Send password reset email using sendEmail utility
        await sendEmail(
            'Password Reset',
            `Click here to reset your password: ${req.protocol}://${req.get('host')}/reset-password/${token}`,
            email
        );

        res.json({ message: 'Password reset email sent' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error sending password reset email' });
    }
};
