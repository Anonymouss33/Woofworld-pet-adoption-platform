const mongoose = require('mongoose');
const path = require('path');
const Pet = require('./models/Pet'); // Adjust the path to your Pet model
require('dotenv').config();

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pet-adoption';
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('✅ MongoDB connected'))
    .catch((error) => {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    });

// Function to update image paths
const updateImagePaths = async () => {
    try {
        const pets = await Pet.find({});
        console.log(`Found ${pets.length} pets to update.`);
        
        for (const pet of pets) {
            pet.images = pet.images.map((image) =>
                image.replace(/C:\\Users\\praha\\pet-adoption-backend/, '').replace(/\\/g, '/')
            );
            await pet.save();
        }
        console.log('✅ Image paths updated successfully.');
        process.exit(0); // Exit the script after completion
    } catch (error) {
        console.error('❌ Error updating image paths:', error.message);
        process.exit(1); // Exit with error
    }
};

// Run the function
updateImagePaths();
