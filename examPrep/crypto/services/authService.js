const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonWebToken');

const { SECRET } = require('../constants')


exports.findByUsername = (username) => User.findOne({ username })
exports.findByEmail = (email) => User.findOne({ email })

exports.register = async (username, email, password, repeatPassword) => {
    if (password.length < 4) {
        throw new Error('Password must be at least 4 characters long!')

    }
    if (!password) {
        throw new Error('Password is required!')
    }
    if (password !== repeatPassword) {
        throw new Error('Password missmatch!')
    }
    const existingUser = await User.findOne({
        $or: [
            { email },
            { username }
        ]
    })
    if (existingUser) {
        throw new Error('User exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPassword });

    return this.login(email, password)
}

exports.login = async (email, password) => {
    const user = await this.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password.')
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
        throw new Error('Invalid email or password.')
    }

    const payload = {
        _id: user._id,
        email,
        username: user.username
    }

    const token = await jwt.sign(payload, SECRET);

    return token
}