const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new Schema({
    username: {
        type: String,
        minLength: 3,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password is too short!']
    }
})

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hashed => {
            this.password = hashed;

            next()
        })
})

userSchema.method('validatePassword', async function (password) {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid
})

const User = model('User', userSchema);

module.exports = User