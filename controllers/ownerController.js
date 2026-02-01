const Owner = require('../models/Owner');
const Pet = require('../models/Pet');
const jwt = require('jsonwebtoken');
const path = require('path');

require('dotenv').config();

// Helper function to generate JWT tokens
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

// Register a new owner
const registerOwner = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the email is already registered
        const existingOwner = await Owner.findOne({ email });
        if (existingOwner) {
            return res.status(400).json({ message: 'Owner with this email already exists' });
        }

        // Create a new owner
        const owner = new Owner({ name, email, password, role: 'owner' });
        await owner.save();

        // Generate JWT token
        const token = generateToken(owner._id, owner.role);

        // Set token in cookies
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(201).json({
            ownerId: owner._id,
            name: owner.name,
            email: owner.email,
            role: owner.role,
            message: 'Owner registered successfully',
        });
    } catch (error) {
        console.error('Error registering owner:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login an owner
const loginOwner = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the owner exists
        const owner = await Owner.findOne({ email });
        if (!owner) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isMatch = await owner.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = generateToken(owner._id, owner.role);

        // Set token in cookies
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        console.log(`✅ Cookie set: token=${token}`);
        res.status(200).json({
            ownerId: owner._id,
            name: owner.name,
            email: owner.email,
            role: owner.role,
            message: 'Logged in successfully',
        });
    } catch (error) {
        console.error('Error logging in owner:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Add a new pet
const addPet = async (req, res) => {
    const {
        name,
        breed,
        age,
        description,
        email,
        phone,
        location,
        size,
        energy_level,
        care_cost,
        compatibility,
    } = req.body;

    if (
        !name ||
        !breed ||
        !age ||
        !email ||
        !phone ||
        !location ||
        !size ||
        !energy_level ||
        !care_cost ||
        !compatibility
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        if (!req.user || req.user.role !== 'owner') {
            return res.status(403).json({ message: 'Access denied, only owners can add pets' });
        }

        // Generate full URL paths for uploaded images
        const images = req.files
    ? req.files.map((file) => path.join('uploads/pets', path.basename(file.path)).replace(/\\/g, '/'))
    : [];


        const pet = new Pet({
            name,
            breed,
            age,
            description,
            images,
            email,
            phone,
            location,
            size,
            energy_level,
            care_cost,
            compatibility: compatibility.split(','),
            owner: req.user._id, // Link the pet to the authenticated owner
        });

        const createdPet = await pet.save();
        res.status(201).json({ message: 'Pet added successfully', pet: createdPet });
    } catch (error) {
        console.error('Error adding pet:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getOwnerPets = async (req, res) => {
    try {
        console.log('Authenticated Owner ID:', req.user.id); // Debugging log
        const ownerId = req.user.id;
        const pets = await Pet.find({ owner: ownerId });
        console.log('Fetched Pets:', pets); // Debugging log
        res.status(200).json(pets);
    } catch (error) {
        console.error('Error fetching pets:', error.message);
        res.status(500).json({ message: 'Failed to fetch pets' });
    }
};

// Fetch logged-in owner's details
const getOwnerDetails = async (req, res) => {
    try {
        const owner = await Owner.findById(req.user.id).select('-password'); // Exclude password
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }
        res.status(200).json(owner);
    } catch (error) {
        console.error('Error fetching owner details:', error.message);
        res.status(500).json({ message: 'Failed to fetch owner details' });
    }
};


// Update a pet listing
const updatePet = async (req, res) => {
    const { petId } = req.params;
    const {
        name,
        breed,
        age,
        description,
        email,
        phone,
        location,
        size,
        energy_level,
        care_cost,
        compatibility,
    } = req.body;

    try {
        if (!req.user || req.user.role !== 'owner') {
            return res.status(403).json({ message: 'Access denied, only owners can update pets' });
        }

        const pet = await Pet.findById(petId);

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        if (pet.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied, you are not the owner of this pet' });
        }

        // Update fields
        pet.name = name || pet.name;
        pet.breed = breed || pet.breed;
        pet.age = age || pet.age;
        pet.description = description || pet.description;
        pet.email = email || pet.email;
        pet.phone = phone || pet.phone;
        pet.location = location || pet.location;
        pet.size = size || pet.size;
        pet.energy_level = energy_level || pet.energy_level;
        pet.care_cost = care_cost || pet.care_cost;
        pet.compatibility = compatibility ? compatibility.split(',') : pet.compatibility;

        // Update images if provided
        if (req.files && req.files.length > 0) {
            pet.images = req.files.map((file) => file.path);
        }

        const updatedPet = await pet.save();
        res.status(200).json({ message: 'Pet updated successfully', pet: updatedPet });
    } catch (error) {
        console.error('Error updating pet:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a pet listing
const deletePet = async (req, res) => {
    const { petId } = req.params;

    try {
        if (!req.user || req.user.role !== 'owner') {
            return res.status(403).json({ message: 'Access denied, only owners can delete pets' });
        }

        const pet = await Pet.findById(petId);

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        if (pet.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied, you are not the owner of this pet' });
        }

        await pet.remove();
        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (error) {
        console.error('Error deleting pet:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { registerOwner, loginOwner, addPet, updatePet, deletePet, getOwnerPets, getOwnerDetails }; 