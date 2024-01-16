const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const crypto = require('crypto'); // For token generation

// Function for sending email (assuming a separate utility)
const sendEmail = require('../utils/sendEmail');

/*
    The register function is used to create/register user
    with below parameter in json format


    api : /api/v1/user/register
    method : post
    param : name,email,password,role = ['depot','harvester','refinery']

    e.g :
    POST /api/v1/users/register HTTP/1.1
    Host: localhost:4000
    Content-Type: application/json
    Content-Length: 131
    {
        "name" :  "sample",
        "email" : "sanketshirsath226@gmail.com",
        "password" : "Sanket@91724",
        "role" : "depot"
    }

    Status:
        400 : { message: 'Email already exists' }
        201 : { message: 'User registered successfully', token }
        500 : { message: 'Server Error' }
*/

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate user input (e.g., check for empty fields, valid role)

        const existingUser = await User.findOne({ email });
        console.log(existingUser)
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const user = new User({ name, email, password, role });
        console.log(user)
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

/*
    The register function is used to login user
    with below parameter in json format
    api : /api/v1/user/login
    method : post
    param : email,password,

    e.g:
    POST /api/v1/users/login HTTP/1.1
    Host: localhost:4000
    Content-Type: application/json
    Content-Length: 81
    {
        "email": "sanketshirsath226@gmail.com",
        "password": "Sanket@91724"
    }

    Status:
        401 : { message: 'Invalid email or password' }
        201 : { message: 'User logged in successfully', token }
        500 : { message: 'Server Error' }
*/
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

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User logged in successfully', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
/*
    The register function is used to update user
    with below parameter in json format


    api : /api/v1/user/profile
    method : get
    Header :
    x-auth-token : token

    e.g:
       GET /api/v1/users/profile HTTP/1.1
       Host: localhost:4000
       x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWE2YjMzMGYwMzA5ZGE3NWEwNGMzNWEiLCJpYXQiOjE3MDU0MjYzNjksImV4cCI6MTcwNTQyOTk2OX0.BZbR8KI4StIEWfqf6qPJ_QnAWd63DDQAFurMpE6Pq_w

    Status:
        404 : { message: 'User not found' }
        201 : { user }
        500 : { message: 'Server Error' }
        403 : {message : Unauthorized}
        401 : {message : Invalid Token}

*/
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
/*
    The register function is used to update user
    with below parameter in json format


    api : /api/v1/user/profile
    method : put
    param : name, email, role
    Header :
    x-auth-token : token

    e.g:
    PUT /api/v1/users/profile HTTP/1.1
    Host: localhost:4000
    x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWE2YjMzMGYwMzA5ZGE3NWEwNGMzNWEiLCJpYXQiOjE3MDU0MjYzNjksImV4cCI6MTcwNTQyOTk2OX0.BZbR8KI4StIEWfqf6qPJ_QnAWd63DDQAFurMpE6Pq_w
    Content-Type: application/json
    Content-Length: 108
    {
    "name" : "Sanket Shirsath",
    "email" : "sanketshirsath226@gmail.com",
    "role" : "refinery"
    }

    Status:
        404 : { message: 'User not found' }
        201 : { user }
        500 : { message: 'Server Error' }
        403 : {message : Unauthorized}
        401 : {message : Invalid Token}

*/
exports.updateProfile = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        // Validate user input (e.g., check for empty fields, valid role)

        const user = await User.findByIdAndUpdate(req.user.userId, { name, email, role }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
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
exports.resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        const user = await User.findOne({ resetToken: token, resetTokenExpires: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetToken = undefined;
        user.resetTokenExpires = undefined;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error resetting password' });
    }
};