const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); // For logging requests
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Enable .env file support

// Import route files
const customerRoutes = require('./routes/customerRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const petRoutes = require('./routes/petRoutes');
const adoptionRequestRoutes = require('./routes/adoptionRequestRoutes');
const utilityRoutes = require('./routes/utilityRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');


// Initialize express app
const app = express();

// Get MongoDB URI and PORT from environment variables
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pet-adoption';
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('✅ MongoDB connected'))
    .catch((error) => {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1); // Exit the application if the database connection fails
    });

    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middleware
const corsOptions = {
    origin: 'http://localhost:5000', // Allow frontend requests from localhost:5000
    credentials: true, // Allow cookies and credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Restrict allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Define allowed headers
};
app.use(cors(corsOptions)); // Use updated CORS configuration
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Handle URL-encoded form data
app.use(cookieParser()); // Parse cookies
app.use(morgan('dev')); // Log incoming requests for debugging
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Debug middleware for logging requests (optional)
app.use((req, res, next) => {
    console.log(`🟢 ${req.method} request to ${req.path} with body:`, req.body);
    if (req.files) console.log('🖼️ Uploaded Files:', req.files);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API is healthy and running' });
});

// Define routes
app.use('/api/customers', customerRoutes); // Routes for customers
app.use('/api/owners', ownerRoutes); // Routes for owners
app.use('/api/owners/pets', petRoutes); 
app.use('/api/pets', petRoutes); // Nested under owners/pets
app.use('/api/admins', adminRoutes); // Routes for admins
app.use('/api/adoption', adoptionRequestRoutes); // Routes for adoption requests
app.use('/api/utility', utilityRoutes); // For testing purposes
app.use('/api/recommendations', recommendationRoutes); // Pet recommendations route

// Catch all unmatched routes (404 handler)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error stack:', err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong!',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
