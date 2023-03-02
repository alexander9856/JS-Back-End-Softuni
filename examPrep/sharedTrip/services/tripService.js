const Trip = require('../models/Trip')
const User = require('../models/User')
exports.getById = (id) => Trip.findById(id).lean()
exports.getByIdUser = (id) => User.findById(id).lean()

exports.getAll = () => Trip.find().lean()
exports.create = async (creator, tripData) => Trip.create({ ...tripData, creator })
exports.join = async (email, tripId, userId) => {
    const trip = await Trip.findById(tripId)
    trip.buddies.push(email);
    trip.seats -= 1
    await this.addTripToHistory(userId, tripId)
    return trip.save();
}
exports.addTripToHistory = async (userId, tripId) => {
    const user = await User.findById(userId);
    user.tripsHistory.push(tripId)
    await user.save()
}
exports.getUser = async (userId) => {
    const user = await User.findById(userId)

    return user
}
exports.isABuddy = async (emailOfUser, tripId) => {
    const trip = await Trip.findById(tripId);
    const isApassenger = trip.buddies.some(x => x == emailOfUser);
    return isApassenger
}
exports.checkAvailableSeats = async (tripId) => {
    const trip = await Trip.findById(tripId);
    const seats = trip.seats
    return seats
}
exports.checkBuddies = async (tripId) => {
    const trip = await Trip.findById(tripId);
    const buddies = trip.buddies
    return buddies
}
exports.getDriver = async (tripId) => {
    const trip = await Trip.findById(tripId).populate('creator');
    return trip.creator.email
}

exports.edit = async (tripId, tripData) => Trip.findByIdAndUpdate(tripId, { ...tripData }, {
    runValidators: true,
    setDefaultsOnInsert: true,
    upsert: true,
})
exports.delete = async (tripId) => Trip.findByIdAndDelete(tripId)
