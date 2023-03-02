const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [2, 'Title must be at least 2 characters'],
        required: [true, 'Title is required']
    },
    author: {
        type: String,
        minLength: [5, 'Author must be at least 5 characters'],
        required: [true, 'Author is required'],
    },
    image: {
        type: String,
        required: true,
        validate: [/^https?:\/\//, 'Image must start with https:// or http://']

    },
    bookReview: {
        type: String,
        minLength: [10, 'Review must be at least 10 characters!'],
        required: [true, 'Book Review is required']
    },
    genre: {
        type: String,
        minLength: [3, 'Genre must be at least 3 characters'],
        required: [true, 'Genre is required']
    },
    stars: {
        type: Number,
        min: [1, 'Stars must be between 1 and 5'],
        max: [5, 'Stars must be between 1 and 5'],
        required: [true, 'Stars are required']

    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    wishlist: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book