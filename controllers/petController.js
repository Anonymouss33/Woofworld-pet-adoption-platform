const Pet = require('../models/Pet');

// Helper to validate ownership
const isOwner = (user, pet) => pet.owner.toString() === user._id.toString();

// =======================
// ADD / CREATE PET
// =======================
const addPet = async (req, res) => {
    let {
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

    // ✅ OWNER MUST COME FROM AUTH (NOT FROM FORM)
    const ownerId = req.user?._id;

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
        !compatibility ||
        !ownerId
    ) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // ✅ FIX 1: compatibility → array
        if (typeof compatibility === 'string') {
            compatibility = compatibility.split(',').map(c => c.trim());
        }

        // ✅ FIX 2: energy_level ENUM normalization
        const energyMap = {
            low: 'Low',
            moderate: 'Moderate',
            high: 'High',
            hyperactive: 'High'
        };

        energy_level =
            energyMap[energy_level.toLowerCase()] || 'Moderate';

        // Images (safe)
        const images = req.files ? req.files.map(file => file.path) : [];

        const newPet = new Pet({
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
            compatibility,
            owner: ownerId,
        });

        const addedPet = await newPet.save();

        res.status(201).json({
            message: 'Pet added successfully!',
            pet: addedPet,
        });
    } catch (error) {
        console.error('Error adding pet:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// =======================
// GET PETS BY OWNER
// =======================
const getOwnerPets = async (req, res) => {
    const { ownerId } = req.params;

    try {
        const pets = await Pet.find({ owner: ownerId });

        if (!pets.length) {
            return res.status(404).json({ message: 'No pets found for this owner.' });
        }

        res.status(200).json(pets);
    } catch (error) {
        console.error('Error fetching pets:', error.message);
        res.status(500).json({ message: 'Internal server error while fetching pets.' });
    }
};

// =======================
// UPDATE PET
// =======================
const updatePet = async (req, res) => {
    const { petId } = req.params;
    let {
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
        const pet = await Pet.findById(petId);

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found.' });
        }

        if (!isOwner(req.user, pet)) {
            return res.status(403).json({ message: 'Access denied, you are not the owner of this pet.' });
        }

        // Normalize compatibility
        if (compatibility && typeof compatibility === 'string') {
            compatibility = compatibility.split(',').map(c => c.trim());
        }

        // Normalize energy level
        const energyMap = {
            low: 'Low',
            moderate: 'Moderate',
            high: 'High',
            hyperactive: 'High'
        };

        if (energy_level) {
            energy_level =
                energyMap[energy_level.toLowerCase()] || pet.energy_level;
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
        pet.compatibility = compatibility || pet.compatibility;

        // Update images if provided
        if (req.files && req.files.length > 0) {
            pet.images = req.files.map(file => file.path);
        }

        const updatedPet = await pet.save();

        res.status(200).json({
            message: 'Pet updated successfully.',
            pet: updatedPet,
        });
    } catch (error) {
        console.error('Error updating pet:', error.message);
        res.status(500).json({ message: 'Internal server error while updating pet.' });
    }
};

// =======================
// DELETE PET
// =======================
const deletePet = async (req, res) => {
    const { petId } = req.params;

    try {
        const pet = await Pet.findById(petId);

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found.' });
        }

        if (!isOwner(req.user, pet)) {
            return res.status(403).json({ message: 'Access denied, you are not the owner of this pet.' });
        }

        await pet.remove();
        res.status(200).json({ message: 'Pet deleted successfully.' });
    } catch (error) {
        console.error('Error deleting pet:', error.message);
        res.status(500).json({ message: 'Internal server error while deleting pet.' });
    }
};

// =======================
// LIST / FILTER PETS
// =======================
const listPets = async (req, res) => {
    const { location, size, energy_level, compatibility } = req.query;

    try {
        const filter = {};

        if (location) filter.location = location;
        if (size) filter.size = size;
        if (energy_level) filter.energy_level = energy_level;
        if (compatibility) filter.compatibility = { $in: compatibility.split(',') };

        const pets = await Pet.find(filter);
        res.status(200).json(pets);
    } catch (error) {
        console.error('Error fetching pets:', error.message);
        res.status(500).json({ message: 'Internal server error while fetching pets.' });
    }
};

// =======================
// GET ALL PETS (PUBLIC)
// =======================
const getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        if (!pets.length) {
            return res.status(404).json({ message: 'No pets available for adoption.' });
        }
        res.status(200).json(pets);
    } catch (error) {
        console.error('Error fetching all pets:', error.message);
        res.status(500).json({ message: 'Internal server error while fetching pets.' });
    }
};

// =======================
// GET SINGLE PET
// =======================
const getSinglePet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found.' });
        }
        res.status(200).json(pet);
    } catch (error) {
        console.error('Error fetching pet:', error.message);
        res.status(500).json({ message: 'Internal server error while fetching pet details.' });
    }
};

module.exports = {
    addPet,
    getOwnerPets,
    updatePet,
    deletePet,
    listPets,
    getAllPets,
    getSinglePet,
};
