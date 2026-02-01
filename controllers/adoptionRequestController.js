const AdoptionRequest = require('../models/AdoptionRequest');
const Pet = require('../models/Pet');

const submitAdoptionRequest = async (req, res) => {
    const { petId } = req.params;
    const { message } = req.body;

    try {
        // Ensure the requester is a customer
        if (req.user.role !== 'customer') {
            return res.status(403).json({ message: 'Access denied: only customers can request adoptions.' });
        }

        // Check if the pet exists
        const pet = await Pet.findById(petId).populate('owner', 'name email'); // Include owner details
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found.' });
        }

        // Create the adoption request
        const adoptionRequest = new AdoptionRequest({
            pet: petId,
            customer: req.user._id,
            message,
        });

        const savedRequest = await adoptionRequest.save();

        // Populate additional fields in the saved request
        const populatedRequest = await AdoptionRequest.findById(savedRequest._id)
            .populate('pet', 'name') // Populate pet name
            .populate('customer', 'name email'); // Populate customer details

        res.status(201).json({
            message: 'Adoption request submitted successfully!',
            request: populatedRequest,
        });
    } catch (error) {
        console.error('Error submitting adoption request:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all adoption requests for a specific pet (Owner Only)
const getAdoptionRequestsForPet = async (req, res) => {
    const { petId } = req.params;

    try {
        // Ensure the requester is the owner of the pet
        const pet = await Pet.findById(petId);
        if (!pet || pet.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: you are not the owner of this pet.' });
        }

        const requests = await AdoptionRequest.find({ pet: petId }).populate('customer', 'name email');
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching adoption requests:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all adoption requests for all pets owned by the owner
const getAdoptionRequestsForOwner = async (req, res) => {
    try {
        // Ensure the requester is an owner
        if (req.user.role !== 'owner') {
            return res.status(403).json({ message: 'Access denied: only owners can view adoption requests.' });
        }

        const requests = await AdoptionRequest.find()
            .populate({
                path: 'pet',
                match: { owner: req.user._id }, // Only pets owned by the logged-in owner
            })
            .populate('customer', 'name email');

        // Filter out requests for pets not owned by the logged-in owner
        const filteredRequests = requests.filter((req) => req.pet !== null);

        res.status(200).json(filteredRequests);
    } catch (error) {
        console.error('Error fetching adoption requests:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update adoption request status (Owner/Admin Only)
const updateAdoptionRequestStatus = async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;

    try {
        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status.' });
        }

        const request = await AdoptionRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Adoption request not found.' });
        }

        // Ensure the requester is the owner of the pet or an admin
        const pet = await Pet.findById(request.pet);
        if (req.user.role === 'owner' && pet.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: you are not the owner of this pet.' });
        }

        request.status = status;
        const updatedRequest = await request.save();
        res.status(200).json({ message: 'Request status updated.', request: updatedRequest });
    } catch (error) {
        console.error('Error updating adoption request status:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getAdoptionRequestsForCustomer = async (req, res) => {
    try {
        // Ensure the requester is a customer
        if (req.user.role !== 'customer') {
            return res.status(403).json({ message: 'Access denied: only customers can view their adoption requests.' });
        }

        // Find all adoption requests made by the customer
        const requests = await AdoptionRequest.find({ customer: req.user._id })
            .populate('pet', 'name breed age location') // Populate relevant pet details
            .populate('customer', 'name email'); // Populate customer details (optional)

        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching customer adoption requests:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    submitAdoptionRequest,
    getAdoptionRequestsForPet,
    getAdoptionRequestsForOwner,
    updateAdoptionRequestStatus,
    getAdoptionRequestsForCustomer
};
