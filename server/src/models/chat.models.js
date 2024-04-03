const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
    members: {
        type: Array,
    },
}, {timestamps: true});

module.exports.Chat = model('Chat', chatSchema);
