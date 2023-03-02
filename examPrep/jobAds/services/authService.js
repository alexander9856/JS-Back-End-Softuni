const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonWebToken');

const { SECRET } = require('../constants')

exports.findbyIdAndPushAd = async (_id, ad) => {
    const user = await User.findById({ _id })
    user.myAds.push(ad);
    await user.save()
}
exports.findBySearch = async (email) => {
    const users = await User.find().populate('myAds').lean()
    let user = users.filter(x => x.email == email)[0];
    if (user) {
        return user.myAds
    }
    return []
    // await user.save()
}
exports.findbyId = async (_id, ad) => {
    const user = await User.findById({ _id })
    return user
}
exports.findByEmail = (email) => User.findOne({ email })

exports.register = async (email, description, password, repeatPassword) => {
    if (password.length < 5) {
        throw new Error('Password must be at least 5 characters long!')

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
        ]
    })
    if (existingUser) {
        throw new Error('User exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, description, password: hashedPassword });

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
        description: user.description
    }

    const token = await jwt.sign(payload, SECRET);

    return token
}