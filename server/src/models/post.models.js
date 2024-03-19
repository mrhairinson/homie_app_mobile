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
        type: int,
        required: true
    },
    roomType: { //0 for closed, 1 for not closed
        type: int,
        required: true
    },
    roomPrice: {
        type: int,
        required: true
    },
    roomPriceElectricity: {
        type: int,
        required: true
    },
    roomPriceWater: {
        type: int,
        required: true
    },
    roomPriceInternet: {
        type: int,
        required: true
    },
    roomPriceCleaning: {
        type: int,
        required: true
    },
    hasAirConditional: {
        type: bool,
        required: true
    },
    hasHeater: {
        type: bool,
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
