const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonWebToken');

const { SECRET } = require('../constants')


exports.findByUsername = (username) => User.findOne({ username })

exports.register = async ( name, username, password, repeatPassword) => {
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
            // { email },
            { username }
        ]
    })
    if (existingUser) {
        throw new Error('User exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({  name, username, password:hashedPassword});

    return this.login(username, password)
}

exports.login = async (username, password) => {
    const user = await this.findByUsername(username);
    
    if (!user) {
        throw new Error('Invalid username or password.')
    }

    const isValid = await bcrypt.compare(password, user.password)
    console.log(user, isValid)
    if (!isValid) {
        throw new Error('Invalid username or password.')
    }

    const payload = {
        _id: user._id,
        name:user.name,
        username: user.username
    }

    const token = await jwt.sign(payload, SECRET);

    return token
}