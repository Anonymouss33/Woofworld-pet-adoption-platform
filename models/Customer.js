const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    income_bracket: { type: Number, required: true }, // Changed to Number
    housing_type: { type: String, enum: ['Apartment', 'House', 'Rented', 'Owned'], required: true },
    work_hours: { type: String, enum: ['Full-time', 'Part-time', 'Remote'], required: true },
    household_composition: { type: String, required: true },
    activity_level: { type: String, enum: ['Active', 'Moderate', 'Low'], required: true },
    role: { type: String, default: 'customer' },
    profileCompleted: { type: Boolean, default: false },
    profileImage: { type: String, default: null }, 
});




customerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

customerSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Customer', customerSchema);
