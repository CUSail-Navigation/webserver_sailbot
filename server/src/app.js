const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const exampleRoutes = require('./routes/exampleRoutes');

// Use routes
app.use('/api/examples', exampleRoutes);

// Basic route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is connected!' });
});

module.exports = app;