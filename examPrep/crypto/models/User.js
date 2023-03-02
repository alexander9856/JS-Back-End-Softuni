const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: [5, 'Username too short'],
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        minLength: [10, 'Email too short'],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User