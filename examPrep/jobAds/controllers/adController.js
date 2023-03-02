const adService = require('../services/adService');
const { getErrorMessage } = require('../utils/errorUtils');
const authService = require('../services/authService')
const getHomePage = async (req, res) => {
    const ads = await adService.getAll();
    let firstThreeAds = [];
    let counter = 0;
    for (let i of ads) {
        firstThreeAds.push(i);
        counter += 1
        if (counter == 3) {
            break
        }
    }
    res.render('home', { firstThreeAds })
}

const getCatalogPage = async (req, res) => {
    const ads = await adService.getAll()
    res.render('catalog', { ads })
}
const getCreatePage = async (req, res) => {
    res.render('create')
}

const postCreatePage = async (req, res) => {
    const adData = req.body;
    let userId = req.user._id
    try {
        const ad = await adService.create(req.user._id, adData);
        await authService.findbyIdAndPushAd(userId, ad._id);
        res.redirect('/catalog')
    }
    catch (error) {
        res.status(400).render('create', { error: getErrorMessage(error) })
    }
}

const getDetailsPage = async (req, res) => {
    const adId = req.params.adId
    const ad = await adService.getById(adId);
    const appsCount = ad.applications.length
    const authorId = ad.author;
    const isApplied = ad.applications?.some(x => x == req.user?._id)

    const author = await authService.findbyId(authorId)
    const email = author.email;
    const isAuthor = author._id == req.user?._id;

    const adForApps = await adService.getByIdForPplApplied(adId)
    const apps = adForApps.applications
    console.log(apps)
    res.render('details', { ad, isAuthor, email, appsCount, isApplied, apps })
}

const apply = async (req, res) => {
    const adId = req.params.adId
    await adService.apply(req.user._id, adId);
    res.redirect(`/${req.params.adId}/details`)
}


const getEditPage = async (req, res) => {
    const adId = req.params.adId
    const ad = await adService.getById(adId);
    console.log(ad)
    res.render('edit', { ad })
}

const postEditPage = async (req, res) => {
    const adData = req.body;
    const adId = req.params.adId
    try {
        await adService.edit(adId, adData)
        res.redirect(`/${adId}/details`)
    }
    catch (error) {
        res.status(400).render(`edit`, { error: getErrorMessage(error), crypto, paymentMethods })
    }
}
// }

const deleteAd = async (req, res) => {
    const adId = req.params.adId
    await adService.delete(adId)
    res.redirect(`/catalog`)
}


const getSearchPage = async (req, res) => {
    const { email } = req.query
    const ads = await authService.findBySearch(email)
    res.render('search', { ads })
}



module.exports = {
    getHomePage,
    getCatalogPage,
    getCreatePage,
    postCreatePage,
    getDetailsPage,
    apply,
    getEditPage,
    postEditPage,
    deleteAd,
    getSearchPage
}