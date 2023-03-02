const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    startPoint: {
        type: String,
        minLength: [4, 'Start Point must be at least 4 characters'],
        required: [true, 'startPoint is required']
    },
    endPoint: {
        type: String,
        minLength: [4, 'End Point must be at least 4 characters'],
        required: [true, 'endPoint is required']
    },
    date: {
        type: String,
        required: [true, 'date is required']
    },
    time: {
        type: String,
        required: [true, 'time is required']
    },
    carImage: {
        type: String,
        validate: [/^https?:\/\//, 'Image must start with https:// or http://'],
        required: [true, 'carImage is required']
    },
    carBrand: {
        type: String,
        minLength: [4, 'Car brand must be at least 4 characters'],
        required: [true, 'carBrand is required']
    },
    seats: {
        type: Number,
        min: [0, 'Choose between 0 and 4'],
        max: [4, 'Choose between 0 and 4'],
        required: [true, 'seats is required']
    },
    price: {
        type: Number,
        min: [1, 'Choose between 1 and 50'],
        max: [50, 'Choose between 1 and 50'],
        required: [true, 'price is required']
    },
    description: {
        minLength: [10, 'Description must be at least 10 characters'],
        type: String,
        required: [true, 'description is required']
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    buddies: [{
        type: String,
        ref: 'User'
    }]
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip