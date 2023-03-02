const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [/^[a-zA-z]+@[[a-zA-z]+\.[a-zA-z]+$/,'Please enter a valid Email']
    },
    firstName: {
        type: String,
        minLength: [1, 'First Name must be at least 1 characters long'],
        required: [true, 'firstName is required']
    },
    lastName: {
        type: String,
        minLength: [1, 'lastName must be at least 1 characters long'],
        required: [true, 'lastName is required']
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User