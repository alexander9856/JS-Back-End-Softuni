const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: [4, 'Username must be at least 4 characters.'],
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        minLength: [10, 'Email must be at least 10 characters.'],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User