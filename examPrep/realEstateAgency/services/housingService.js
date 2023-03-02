const Housing = require('../models/Housing')

exports.getById = (id) => Housing.findById(id).lean()
exports.getAll = () => Housing.find().lean()
exports.create = async (owner, housingData) => Housing.create({ ...housingData, owner })
exports.rent = async (userId, housingId) => {
    const housing = await Housing.findById(housingId)
    housing.buyers.push(userId);
    housing.availablePieces -= 1
    return housing.save();
}
exports.edit = async (housingId, housingData) => Housing.findByIdAndUpdate(housingId, { ...housingData }, {
    runValidators: true,
    setDefaultsOnInsert: true,
    upsert: true,
})
exports.delete = async (housingId) => Housing.findByIdAndDelete(housingId)
exports.search = async (type) => {
    let housing = await this.getAll();
    if (type) {
        housing = housing.filter(x => x.type.toLowerCase() == type.toLowerCase())
    }
    
    return housing
}


