const Auction = require('../models/Auction')
const User = require('../models/User')
exports.getById = (id) => Auction.findById(id).lean()
exports.getUserById = (id) => User.findById(id).lean()
exports.getAll = () => Auction.find().lean();
exports.editBidder = async (id, bidder) => {
    const auction = await Auction.findById(id);
    auction.bidder = bidder;
    return auction.save()
}
exports.close = async (id) => {
    const auction = await Auction.findById(id);
    auction.isClosed = true;
    return auction.save()
}

exports.create = async (author, auctionData) => Auction.create({ ...auctionData, author })
exports.wish = async (userId, auctionId) => {
    const auction = await Auction.findById(auctionId)
    auction.wishlist.push(userId);
    return auction.save();
}
exports.edit = async (auctionId, auctionData) => Auction.findByIdAndUpdate(auctionId, { ...auctionData }, {
    runValidators: true,
    setDefaultsOnInsert: true,
    upsert: true,
})
exports.delete = async (auctionId) => Auction.findByIdAndDelete(auctionId)
exports.search = async (name, paymentMethod) => {
    let auction = await this.getAll();
    if (name) {
        auction = auction.filter(x => x.name.toLowerCase() == name.toLowerCase())
    }
    if (paymentMethod) {
        auction = auction.filter(x => x.paymentMethod.toLowerCase() == paymentMethod.toLowerCase())
    }
    return auction
}

