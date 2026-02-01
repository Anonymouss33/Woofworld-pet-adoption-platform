const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    description: { type: String },
    images: [{ type: String }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    size: { type: String, enum: ['Small', 'Medium', 'Large'], required: true },
    energy_level: { type: String, enum: ['Low', 'Moderate', 'High'], required: true },
    care_cost: { type: Number, required: true },
    compatibility: { type: [String], required: true },
    popularity_score: { type: Number, default: 0 },
});

module.exports = mongoose.model('Pet', petSchema);
