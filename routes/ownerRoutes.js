const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware'); // Middleware

const upload = require('../middleware/uploadMiddleware');
const router = express.Router();
const { addPet, updatePet, deletePet, registerOwner, loginOwner, getOwnerPets, getOwnerDetails } = require('../controllers/ownerController'); // Import controller functions

// Route to register a new owner
router.post('/register', registerOwner);

// Route to login an owner
router.post('/login', loginOwner);

// Route to add a pet (protected for owners, with images)
router.post('/pets', protect, authorize('owner'), upload.array('images', 3), addPet);

// Route to update a pet (protected for owners, with images)
router.put('/pets/:petId', protect, authorize('owner'), upload.array('images', 3), updatePet);

// Route to delete a pet (protected for owners)
router.delete('/pets/:petId', protect, authorize('owner'), deletePet);

// Route to fetch all pets for the logged-in owner
router.get('/pets', protect, authorize('owner'), getOwnerPets);
router.get('/me', protect, authorize('owner'), getOwnerDetails);

module.exports = router;
