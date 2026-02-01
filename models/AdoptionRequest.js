const mongoose = require('mongoose');

const adoptionRequestSchema = new mongoose.Schema(
    {
        pet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pet',
            required: true,
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        message: {
            type: String,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('AdoptionRequest', adoptionRequestSchema);
