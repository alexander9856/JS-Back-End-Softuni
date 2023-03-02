const { getErrorMessage } = require('../utils/errorUtils')
const authService = require('../services/authService');
const photoService = require('../services/photoService')
const getCatalogPage = async (req, res) => {
    const photos = await photoService.getAll().populate('owner')
    res.render('catalog', { photos })
}

const getCreatePage = async (req, res) => {
    res.render('create')
}
const postCreatePage = async (req, res) => {
    const photoData = req.body;
    try {
        const photo = await photoService.create(req.user._id, photoData);
        const photoId = photo._id
        await photoService.addPhotoToUserPhotos(req.user._id, photoId)
        res.redirect('/catalog')
    }
    catch (error) {
        res.status(400).render('create', { error: getErrorMessage(error) })
    }
}

const getDetailsPage = async (req, res) => {
    const photoId = req.params.photoId
    const photo = await photoService.getById(photoId).populate('owner');
    let creatorsIdAndComments = photo.commentList;

    let creatorsNameAndComments = [];

    for (let i of creatorsIdAndComments) {
        let creator = await authService.findById(i.userID);
        creatorsNameAndComments.push({ creator: creator.username, comment: i.comment })
    }

    const isOwner = photo.owner._id == req.user?._id;
    const isNotOwner = photo.owner._id != req.user?._id;
    res.render('details', { photo, isOwner, creatorsNameAndComments, isNotOwner })
}
const postDetailsComment = async (req, res) => {
    const comment = req.body.comment
    await photoService.comment(req.user._id, req.params.photoId, comment);
    res.redirect(`/${req.params.photoId}/details`)
}

const getEditPage = async (req, res) => {
    const photoId = req.params.photoId
    const photo = await photoService.getById(photoId);
    res.render('edit', { photo })
}

const postEditPage = async (req, res) => {
    const photo = req.body;
    const photoId = req.params.photoId
    try {
        await photoService.edit(photoId, photo)

        res.redirect(`/${photoId}/details`)
    }
    catch (error) {
        res.status(400).render(`edit`, { error: getErrorMessage(error), photo })
    }

}

const deletePhoto = async (req, res) => {
    const photoId = req.params.photoId
    await photoService.delete(photoId)
    res.redirect(`/catalog`)
}


const getProfilePageOfUser = async (req, res) => {
    const userId = req.user._id;
    const userData = await photoService.userData(userId)
    const username = userData.username
    const email = userData.email
    const photosCount = userData.myPosts.length

    let posts = [];

    for (let i of userData.myPosts) {
        const post = await photoService.getById(i);
        posts.push(post)
    }
    res.render('profile', { username, email, photosCount, posts })
}
const getProfilePageOfCreator = async (req, res) => {
    const userId = req.params.userId;
    const userData = await photoService.userData(userId)

    const username = userData.username
    const email = userData.email
    const photosCount = userData.myPosts.length


    let posts = [];

    for (let i of userData.myPosts) {
        const post = await photoService.getById(i);
        posts.push(post)
    }
    res.render('profile', { username, email, photosCount, posts })
}






module.exports = {
    getCatalogPage,
    getCreatePage,
    postCreatePage,
    getDetailsPage,
    postDetailsComment,
    getEditPage,
    postEditPage,
    deletePhoto,
    getProfilePageOfUser,
    getProfilePageOfCreator
}