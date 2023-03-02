const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: [/[A-Z][a-z]* [A-Z][a-z]*( [A-Z])?/, 'Please enter a valid Name'],
        required: [true, 'Name is required']
    },
    username: {
        type: String,
        minLength: [5, 'Username too short'],
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User