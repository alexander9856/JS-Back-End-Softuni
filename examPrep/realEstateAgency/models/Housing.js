const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [6, 'Name too short'],
        required: [true, 'Name is required']
    },
    type: {
        type: String,
        minLength: [2, 'type too short'],
        required: [true, 'type is required'],
        enum: {
            values: ['Apartment', 'Villa', 'House'],
            message: 'Invalid Type!'
        }
    },
    year: {
        type: Number,
        min: [1850, 'year must be between 1850 and 2021!'],
        max: [2021, 'year must be between 1850 and 2021!'],
        required: [true, 'year is required']
    },
    city: {
        type: String,
        minLength: [4, 'city too short'],
        required: [true, 'city is required']
    },
    homeImage: {
        type: String,
        required: [true, 'homeImage is required'],
        validate: [/^https?:\/\//, 'Image must start with https://']
    },
    propertyDescription: {
        type: String,
        maxLength: [60,'Description must be maximum of 60 chars!'],
        required: [true, 'Description is required']
    },
    availablePieces: {
        type: Number,
        min: [0, 'choose Available pieces between 0 to 10'],
        max: [10, 'choose Available pieces between 0 to 10'],
        required: [true, 'available Pieces is required']
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

const Housing = mongoose.model('Housing', housingSchema);
module.exports = Housing