const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: [/^[a-zA-z]+@[a-zA-z]+\.[a-zA-z]+$/, 'Please enter a valid email'],
        required: [true, 'Email is required']
    },
    description: {
        type: String,
        maxLength: [40, 'Description too long'],
        required: [true, 'Description is required']
    },
    password: {
        type: String,
        required: true,
    },
    myAds: [{
        type: mongoose.Types.ObjectId,
        ref: 'Ad'
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User