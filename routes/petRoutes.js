const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
    addPet,
    getOwnerPets,
    updatePet,
    deletePet,
    listPets,
    getSinglePet,
    getAllPets, // Add the new controller method
} = require('../controllers/petController');

const router = express.Router();

// Route to add a pet (or create a pet profile)
router.post(
    '/',
    protect,
    authorize('owner'),
    upload.array('images', 3),
    addPet
);

// Other routes
router.get('/owner/:ownerId', protect, authorize('owner'), getOwnerPets);
router.put('/update/:petId', protect, authorize('owner'), upload.array('images', 3), updatePet);
router.post('/pets', protect, authorize('owner'), upload.array('images', 3), addPet);
router.delete('/delete/:petId', protect, authorize('owner'), deletePet);
router.get('/list', listPets);
router.get('/all', getAllPets); // New route to fetch all pets


// Get a single pet by ID
router.get('/:id', getSinglePet);

module.exports = router;
