const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: [/^[a-zA-z1-9]+@[a-zA-z]+\.[a-zA-z]+$/, 'Please enter a valid email'],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: 'Invalid gender!'
        },
        required: true
    },
    tripsHistory: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User