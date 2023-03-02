const { getErrorMessage } = require('../utils/errorUtils')
const authService = require('../services/authService');
const tripService = require('../services/tripService')
const getCatalogPage = async (req, res) => {
    const trips = await tripService.getAll()
    res.render('catalog', { trips })
}

const getCreatePage = async (req, res) => {
    res.render('create')
}
const postCreatePage = async (req, res) => {
    const tripData = req.body
    console.log(tripData)
    try {
        await tripService.create(req.user._id, tripData)
        res.redirect('/catalog')
    }
    catch (error) {
        res.status(400).render('create', { error: getErrorMessage(error) })
    }
}

const getDetailsPage = async (req, res) => {
    const tripId = req.params.tripId
    const trip = await tripService.getById(tripId).populate('creator');
    console.log(trip)
    const isCreator = trip.creator == req.user?._id;
    const emailOfUser = req.user.email;
    const isApassenger = await tripService.isABuddy(emailOfUser, tripId);
    const seats = await tripService.checkAvailableSeats(tripId)
    const availableSeats = seats >= 1
    let buddies = await tripService.checkBuddies(tripId);
    const driver = await tripService.getDriver(tripId);
    buddies = buddies.join(', ')
    res.render('details', { trip, isCreator, driver, isApassenger, seats, availableSeats, buddies })
}
const joinTrip = async (req, res) => {
    await tripService.join(req.user.email, req.params.tripId, req.user._id);
    res.redirect(`/${req.params.tripId}/details`)
}
const getEditPage = async (req, res) => {
    const tripId = req.params.tripId
    const trip = await tripService.getById(tripId);
    res.render('edit', { trip })
}

const postEditPage = async (req, res) => {
    const trip = req.body;
    const tripId = req.params.tripId
    try {
        await tripService.edit(tripId, trip)

        res.redirect(`/${tripId}/details`)
    }
    catch (error) {
        res.status(400).render(`edit`, { error: getErrorMessage(error), trip })
    }

}

const deletetrip = async (req, res) => {
    const tripId = req.params.tripId
    await tripService.delete(tripId)
    res.redirect(`/catalog`)
}


const getProfilePage = async (req, res) => {
    const userId = req.user._id;
    const user = await tripService.getUser(userId);
    let tripsIds = user.tripsHistory;
    let trips = []
    for (let i of tripsIds) {
        let trip = await tripService.getById(i);
        trips.push(trip)
    }
    const email = user.email;
    const gender = user.gender;
    const isMale = gender == 'male'

    res.render('profile', { trips, email, isMale})
}




module.exports = {
    getCatalogPage,
    getCreatePage,
    postCreatePage,
    getDetailsPage,
    joinTrip,
    getEditPage,
    postEditPage,
    deletetrip,
    getProfilePage
}