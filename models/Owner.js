const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ownerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: 'owner' }, // Add role with default 'owner'
        listed_pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }], // Pets listed by owner
    },
    { timestamps: true }
);

// Hash the password before saving
ownerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare passwords
ownerSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Owner', ownerSchema);
