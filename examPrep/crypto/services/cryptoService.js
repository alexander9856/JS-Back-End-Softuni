const Crypto = require('../models/Crypto')

exports.getById = (id) => Crypto.findById(id).lean()
exports.getAll = () => Crypto.find().lean()
exports.create = async (owner, cryptoData) => Crypto.create({ ...cryptoData, owner })
exports.buy = async (userId, cryptoId) => {
    const crypto = await Crypto.findById(cryptoId)
    crypto.buyers.push(userId);
    return crypto.save();
}
exports.edit = async (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, { ...cryptoData }, {
    runValidators: true,
    setDefaultsOnInsert: true,
    upsert: true,
})
exports.delete = async (cryptoId) => Crypto.findByIdAndDelete(cryptoId)
exports.search = async (name, paymentMethod) => {
    let crypto = await this.getAll();
    if (name) {
        crypto = crypto.filter(x => x.name.toLowerCase() == name.toLowerCase())
    }
    if (paymentMethod) {
        crypto = crypto.filter(x => x.paymentMethod.toLowerCase() == paymentMethod.toLowerCase())
    }
    return crypto
}


