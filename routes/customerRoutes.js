const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { getPets, requestAdoption, registerCustomer, loginCustomer,getCustomerProfile,uploadProfileImage } = require('../controllers/customerController');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

// Route to register a new customer
router.post('/register', registerCustomer);

// Route to login a customer
router.post('/login', loginCustomer);

// Public route to browse pets
router.get('/pets', getPets);

// Protected route to request adoption (Customer only)
router.post('/adopt/:petId', protect, authorize('customer'), requestAdoption);

// Admin-only route
router.post('/admin-only', protect, authorize('admin'), (req, res) => {
    res.json({ message: 'Admin-only route accessed' });

});
// Protected route to update customer profile
router.get('/me', protect, authorize('customer'), getCustomerProfile);





// Upload profile image
router.post('/upload-profile-image', protect, authorize('customer'), upload.single('profileImage'), uploadProfileImage);


module.exports = router;
