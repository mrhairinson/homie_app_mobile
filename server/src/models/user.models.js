const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new Schema(
    {
    phoneNumber: { 
        type: String, required: true, unique: true
    },
    name: {
        type: String
    },
    dob: {
        type: String
    },
    },
    {
        timestamps: true
    }
);

module.exports.User = model('User', userSchema);
