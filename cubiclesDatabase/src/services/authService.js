const User = require('../models/User')
const config = require('../config')

const jwt = require('../lib/jsonWebToken')
const getUserByUsername = async (username) => User.findOne({ username });


const register = async (username, password) => {
    return await User.create({ username, password })
}

const login = async (username, password) => {
    let user = await getUserByUsername(username);
    const isValid = await user.validatePassword(password)
    try {
        if (!user || !isValid) {
            throw 'Username or password don`t match!!'
        }
        const payload = { _id: user._id, username: user.username }
        const token = await jwt.sign(payload, config.SECRET, { expiresIn: '2h' })
        return token
    }
    catch (err) {
        console.log(err)
    }

}
module.exports = {
    getUserByUsername,
    register,
    login
}