const Photo = require('../models/Photo')
const User = require('../models/User');

exports.getById = (id) => Photo.findById(id).lean()
exports.getAll = () => Photo.find().lean()
exports.create = async (owner, photoData) => Photo.create({ ...photoData, owner })
exports.comment = async (userID, photoId, comment) => {
    const photo = await Photo.findById(photoId)
    photo.commentList.push({ userID, comment });
    return photo.save();
}
exports.addPhotoToUserPhotos = async (userId, photoId) => {
    const user = await User.findById(userId)
    user.myPosts.push(photoId);
    return user.save();
}
exports.userData = async (userId) => {
    const user = await User.findById(userId)
    return user;
}
exports.edit = async (photoId, photoData) => Photo.findByIdAndUpdate(photoId, { ...photoData }, {
    runValidators: true,
    setDefaultsOnInsert: true,
    upsert: true,
})
exports.delete = async (photoId) => Photo.findByIdAndDelete(photoId)

