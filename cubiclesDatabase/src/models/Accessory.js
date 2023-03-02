const { Schema, model } = require('mongoose');

const accessorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 50,
        // match: /^https?:\/\//

    },
    imageUrl: {
        type: String,
        required: true
    }
})
const Accessory = model("Accessory", accessorySchema)
module.exports = Accessory
