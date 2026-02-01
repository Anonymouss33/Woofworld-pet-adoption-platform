const Admin = require('../models/Admin');
const Owner = require('../models/Owner');
const Customer = require('../models/Customer');
const Pet = require('../models/Pet');
const jwt = require('jsonwebtoken');

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'Honito#123';

// Admin Registration
const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if the email is already registered
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }

        // Create a new admin
        const admin = new Admin({ name, email, password });
        await admin.save();

        // Generate a JWT token
        const token = jwt.sign({ id: admin._id, role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({
            id: admin._id,
            name: admin.name,
            email: admin.email,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin Login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if the admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: admin._id, role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            id: admin._id,
            name: admin.name,
            email: admin.email,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all owners
const getAllOwners = async (req, res) => {
    try {
        const owners = await Owner.find().select('-password'); // Exclude passwords
        res.status(200).json(owners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().select('-password'); // Exclude passwords
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a pet listing
const deletePet = async (req, res) => {
    const { petId } = req.params;

    try {
        const pet = await Pet.findById(petId);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        await pet.remove();
        res.status(200).json({ message: 'Pet listing deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerAdmin, loginAdmin, getAllOwners, getAllCustomers, deletePet };
