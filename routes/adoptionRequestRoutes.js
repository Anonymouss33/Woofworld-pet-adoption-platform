const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    submitAdoptionRequest,
    getAdoptionRequestsForPet,
    getAdoptionRequestsForOwner,
    updateAdoptionRequestStatus,
    getAdoptionRequestsForCustomer
} = require('../controllers/adoptionRequestController');

const router = express.Router();

router.post('/:petId', protect, authorize('customer'), submitAdoptionRequest);
router.get('/pets/:petId', protect, authorize('owner'), getAdoptionRequestsForPet);
router.get('/owner', protect, authorize('owner'), getAdoptionRequestsForOwner);
router.put('/:requestId', protect, authorize('owner', 'admin'), updateAdoptionRequestStatus);
router.get('/customers/adoption-requests', protect, authorize('customer'), getAdoptionRequestsForCustomer); 

module.exports = router;
