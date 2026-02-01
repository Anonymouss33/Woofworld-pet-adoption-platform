const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');

const {
    registerAdmin,
    loginAdmin,
    getAllOwners,
    getAllCustomers,
    deletePet,
} = require('../controllers/adminController');

const router = express.Router();

// Register a new admin
router.post('/register', registerAdmin);

// Login an admin
router.post('/login', loginAdmin);

// View all owners (admin-only)
router.get('/owners', protect, authorize('admin'), getAllOwners);

// View all customers (admin-only)
router.get('/customers', protect, authorize('admin'), getAllCustomers);

// Delete a pet listing (admin-only)
router.delete('/pets/:petId', protect, authorize('admin'), deletePet);

module.exports = router;
