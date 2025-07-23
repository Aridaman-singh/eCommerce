// server.js - Main entry point for QuickCart backend

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const apiRoutes = require('./routes/api.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies

// API Routes
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  // Start server only after DB connection
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
}); 