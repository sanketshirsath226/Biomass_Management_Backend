const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');
const errorHandler = require('./middleware/errorHandler');

const userRoutes = require('./routes/userRoutes');
const connectDatabase = require("./config/database"); // Assuming your routes are in a separate file

const app = express();

// Connect to MongoDB
connectDatabase();

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler);

// Routes
app.use('/api/v1/users', userRoutes); // Example route

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));