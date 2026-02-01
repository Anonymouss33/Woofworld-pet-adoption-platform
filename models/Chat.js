const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    admin_id: { type: String, default: 'admin' },
    messages: [
        {
            sender: { type: String, required: true },
            text: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model('Chat', chatSchema);
