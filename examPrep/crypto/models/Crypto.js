const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name too short'],
        required: [true, 'Name is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: [/^https?:\/\//, 'Image must start with https://']
    },
    price: {
        type: Number,
        min: [0, 'Price must be a positive number!'],
        required: [true, 'Price is required']
    },
    description: {
        type: String,
        minLength: [10,'Description must be at least 10 characters!'],
        required: [true, 'Description is required']
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: {
            values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: 'Invalid payment Method!'
        }
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    buyers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Crypto = mongoose.model('Crypto', cryptoSchema);
module.exports = Crypto