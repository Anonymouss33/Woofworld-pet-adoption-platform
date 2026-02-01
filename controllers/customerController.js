const Customer = require('../models/Customer');
const Pet = require('../models/Pet');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// Helper to generate JWT token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

// Middleware for validation
const validateCustomer = [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('income_bracket', 'Income bracket must be a number').isNumeric(),
    check('housing_type', 'Invalid housing type').isIn(['Apartment', 'House', 'Rented', 'Owned']),
    check('work_hours', 'Invalid work hours').isIn(['Full-time', 'Part-time', 'Remote']),
    check('activity_level', 'Invalid activity level').isIn(['Active', 'Moderate', 'Low']),
];

const validateLogin = [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
];


// Get all pets (public)
const getPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (error) {
        console.error('Error fetching pets:', error.message);
        res.status(500).json({ message: 'Unable to fetch pets. Please try again later.' });
    }
};

// Request adoption
const requestAdoption = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(403).json({ message: 'You need to be logged in to request adoption.' });
        }
        const { petId, message } = req.body;
        const pet = await Pet.findById(petId);

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found.' });
        }

        const adoptionRequest = new AdoptionRequest({
            pet: petId,
            customer: req.user._id,
            message,
        });

        await adoptionRequest.save();
        res.status(201).json({ message: 'Adoption request submitted successfully!' });
    } catch (error) {
        console.error('Error submitting adoption request:', error.message);
        res.status(500).json({ message: 'Failed to submit adoption request. Please try again later.' });
    }
};

// Register a new customer
const registerCustomer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, income_bracket, housing_type, work_hours, household_composition, activity_level } = req.body;

    try {
        // Log incoming request data
        console.log('Registering customer with data:', req.body);

        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Customer with this email already exists' });
        }

        const customer = new Customer({
            name,
            email,
            password,
            income_bracket,
            housing_type,
            work_hours,
            household_composition,
            activity_level,
        });

        await customer.save();

        // Generate JWT token
        const token = generateToken(customer._id, customer.role);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            message: 'Customer registered successfully!',
            customer: { id: customer._id, name: customer.name, email: customer.email },
        });
    } catch (error) {
        console.error('Error registering customer:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login a customer
const loginCustomer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const customer = await Customer.findOne({ email });
        if (!customer || !(await customer.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

     // Generate JWT Token
     const token = generateToken(customer._id, customer.role);

     // Set token in cookies
     res.cookie('token', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'Strict',
         maxAge: 24 * 60 * 60 * 1000, // 1 day
     });

     console.log(`✅ Cookie set: token=${token}`);
     res.status(200).json({
         customer_Id: customer._id,
         name: customer.name,
         email: customer.email,
         role: customer.role,
         message: 'Logged in successfully',
     });
 } catch (error) {
     console.error('Error logging in customer:', error.message);
     res.status(500).json({ message: 'Internal server error' });
 }
};


// Logout a customer
const logoutCustomer = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });
        res.status(200).json({ message: 'Customer logged out successfully!' });
    } catch (error) {
        console.error('Error logging out customer:', error.message);
        res.status(500).json({ message: 'Failed to log out. Please try again later.' });
    }
};
// Get Customer Profile
const getCustomerProfile = async (req, res) => {
    try {
        const customer = await Customer.findById(req.user.id).select('-password');
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error('Error fetching customer profile:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
//Get ADoption Request
const getAdoptionRequests = async (req, res) => {
    try {
        const adoptionRequests = await AdoptionRequest.find({ customer: req.user.id })
            .populate('pet', 'name breed age location')
            .populate('owner', 'name email');
        res.status(200).json(adoptionRequests);
    } catch (error) {
        console.error('Error fetching adoption requests:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const customer = await Customer.findById(req.user._id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Save the uploaded file path to the customer's profile
        customer.profileImage = `/uploads/pets/${req.file.filename}`;
        await customer.save();

        res.status(200).json({
            message: 'Profile image uploaded successfully',
            profileImage: customer.profileImage,
        });
    } catch (error) {
        console.error('Error uploading profile image:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    getPets,
    requestAdoption,
    registerCustomer,
    loginCustomer,
    logoutCustomer,
    getCustomerProfile,
    getAdoptionRequests,
    uploadProfileImage,
    validateCustomer,
    validateLogin,
};
