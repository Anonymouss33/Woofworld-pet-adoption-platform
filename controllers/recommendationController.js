const Pet = require('../models/Pet'); // Assuming Pet schema is in models/petModel
const Customer = require('../models/Customer'); // Assuming Customer schema is in models/customerModel

exports.getRecommendations = async (req, res) => {
    try {
        // Fetch the logged-in customer's profile using their ID from the token (via `protect` middleware)
        const customerId = req.user.id;
        const customer = await Customer.findById(customerId);

        if (!customer) {
            return res.status(404).json({ message: 'Customer profile not found' });
        }

        // Extract customer preferences
        const { income_bracket, housing_type, work_hours, household_composition } = customer;

        // Define priority levels with income as the highest priority
        const priorities = [];

        // Adjust recommendations based on income (HIGHEST PRIORITY)
        if (income_bracket > 100000) {
            priorities.push({ size: 'Large', weight: 15 }); // Large breeds prioritized
            priorities.push({ size: 'Small', weight: 7 }); // Small breeds secondary
        } else if (income_bracket <= 30000) {
            priorities.push({ size: 'Small', weight: 15 }); // Small breeds prioritized
            priorities.push({ size: 'Medium', weight: 7 }); // Medium breeds secondary
        } else {
            priorities.push({ size: 'Medium', weight: 15 });
            priorities.push({ size: 'Small', weight: 10 });
        }

        // Adjust based on housing type
        if (housing_type === 'Apartment' || housing_type === 'Rented') {
            priorities.push({ size: 'Small', weight: 10 });
            priorities.push({ size: 'Medium', weight: 5 });
        } else if (housing_type === 'Owned' || housing_type === 'House') {
            priorities.push({ size: 'Large', weight: 10 });
            priorities.push({ size: 'Small', weight: 7 });
        }

        // Adjust based on work hours
        if (work_hours === 'Full-time') {
            priorities.push({ size: 'Small', weight: 5 }); // Small breeds for full-time workers
        } else if (work_hours === 'Part-time') {
            priorities.push({ size: 'Medium', weight: 10 });
            priorities.push({ size: 'Small', weight: 5 });
        } else if (work_hours === 'Remote') {
            priorities.push({ size: 'Large', weight: 10 });
            priorities.push({ size: 'Small', weight: 5 });
        }

        // Fetch all pets from the database
        const pets = await Pet.find();

        // Map pets with calculated scores
        const scoredPets = pets.map(pet => {
            let score = 0;

            // Calculate score based on priorities (INCOME as highest factor)
            priorities.forEach(priority => {
                if (priority.size && pet.size === priority.size) {
                    score += priority.weight;
                }
            });

            // Add score based on energy level
            const energyWeight = { High: 5, Moderate: 3, Low: 1 };
            score += energyWeight[pet.energy_level] || 0;

            // Compatibility check for household composition
            if (pet.compatibility.includes(household_composition)) {
                score += 5; // Extra weight for compatibility
            }

            return { ...pet.toObject(), score }; // Convert Mongoose document to plain object and add score
        });

        // Sort pets by score in descending order
        const sortedPets = scoredPets.sort((a, b) => b.score - a.score);

        // Limit results to top 3 pets
        const recommendations = sortedPets.slice(0, 3);

        // If no pets matched, fallback to showing top available pets
        if (recommendations.length === 0) {
            return res.status(200).json({
                message: 'No exact matches found. Showing top available pets.',
                criteria: 'Sorted by income (highest priority), housing type, work hours, and energy level.',
                recommendations: sortedPets.slice(0, 3), // Fallback to top 3 pets
            });
        }

        // Return the sorted and filtered recommendations
        res.status(200).json({
            message: 'Recommendations based on your profile.',
            criteria: 'Sorted by income (highest priority), housing type, work hours, and energy level.',
            recommendations,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to generate recommendations', error: error.message });
    }
};
