const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    headline: {
        type: String,
        minLength: [4, 'headline too short'],
        required: [true, 'headline is required']
    },
    location: {
        type: String,
        minLength: [8, 'location too short'],
        required: [true, 'location is required'],
    },
    companyName: {
        type: String,
        minLength: [3, 'too short'],
        required: [true, 'company Name required']
    },
    companyDescription: {
        type: String,
        maxLength: [40,'Description too long'],
        required: [true, 'Description is required']
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    applications: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Ad = mongoose.model('Ad', adSchema);
module.exports = Ad