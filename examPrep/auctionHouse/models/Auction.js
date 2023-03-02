const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [4, 'Title must be at least 4 characters'],
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        maxLength: [200, 'Maximum 200 characters allowed'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['Vehicles', 'Real Estate', 'Electronics', 'Furniture', 'Other'],
            message: 'Invalid category!'
        }
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        min: [0, 'Price cannot be a negative number'],
        required: [true, 'Stars are required']

    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    bidder: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    isClosed: {
        type: Boolean,
        default: false
    }
});

const Auction = mongoose.model('Auction', auctionSchema);
module.exports = Auction