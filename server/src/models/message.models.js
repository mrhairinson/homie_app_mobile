const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    chatId: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    text: {
        type: String,
    }
}, {timestamps: true});

module.exports.Message = model('Message', messageSchema);
