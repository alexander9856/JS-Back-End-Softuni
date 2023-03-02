const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name must be at least 2 characters'],
        required: [true, 'Name is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: [/^https?:\/\//, 'Image must start with  http:// or https://']

    },
    age: {
        type: Number,
        min: [1, 'Age must be between 1 and 100'],
        max: [100, 'Age must be between 1 and 100'],
        required: [true, 'Age is required']
    },
    description: {
        type: String,
        minLength: [5, 'Description must be between 5 and 50 characters'],
        maxLength: [50, 'Description must be between 5 and 50 characters'],
        required: [true, 'Description is required']
    },
    location: {
        type: String,
        minLength: [5, 'Location must be between 5 and 50 characters'],
        maxLength: [50, 'Location must be between 5 and 50 characters'],
        required: [true, 'Location is required']
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    commentList: [{
        type: Object,
        ref: 'User'
    }]
});

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo