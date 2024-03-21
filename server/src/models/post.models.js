const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    postName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    roomDescription: {
        type: String,
        required: true
    },
    roomArea: {
        type: Number,
        required: true
    },
    roomType: { //0 for closed, 1 for not closed
        type: Number,
        required: true
    },
    roomPrice: {
        type: Number,
        required: true
    },
    roomPriceElectricity: {
        type: Number,
        required: true
    },
    roomPriceWater: {
        type: Number,
        required: true
    },
    roomPriceInternet: {
        type: Number,
        required: true
    },
    roomPriceCleaning: {
        type: Number,
        required: true
    },
    hasAirConditional: {
        type: Boolean,
        required: true
    },
    hasHeater: {
        type: Boolean,
        required: true
    },
    image: {
        type: [String],
    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 * 30 * 2 //Delete automatically after 2 month
    }
}, {timestamps: true});

module.exports.Post = model('Post', postSchema);
