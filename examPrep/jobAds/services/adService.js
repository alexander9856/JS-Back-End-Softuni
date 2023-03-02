const Ad = require('../models/Ad')

exports.getById = (id) => Ad.findById(id).lean()
exports.getByIdForPplApplied = (id) => Ad.findById(id).populate('applications').lean()

exports.getAll = () => Ad.find().lean()
exports.create = async (author, adData) => Ad.create({ ...adData, author })
exports.apply = async (userId, adId) => {
    const ad = await Ad.findById(adId)
    ad.applications.push(userId);
    return ad.save();
}
exports.edit = async (adId, adData) => Ad.findByIdAndUpdate(adId, { ...adData }, {
    runValidators: true,
    setDefaultsOnInsert: true,
    upsert: true,
})
exports.delete = async (adId) => Ad.findByIdAndDelete(adId)
exports.search = async (email) => {
    let ads = await this.getAll();
    if (email) {
        ads = ads.filter(x => x.email.toLowerCase() == email.toLowerCase())
    }
    return ads
}


