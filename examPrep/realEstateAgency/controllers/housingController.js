const housingService = require('../services/housingService');
const { getErrorMessage } = require('../utils/errorUtils');
const { paymentMethodsMap } = require('../constants')
const getCatalogPage = async (req, res) => {
    const housings = await housingService.getAll()
    res.render('catalog', { housings })
}
const getCreatePage = async (req, res) => {
    res.render('create')
}

const postCreatePage = async (req, res) => {
    const housingData = req.body
    try {
        await housingService.create(req.user._id, housingData)

        res.redirect('/catalog')
    }
    catch (error) {
        res.status(400).render('create', { error: getErrorMessage(error) })
    }
}

const getDetailsPage = async (req, res) => {
    const housingId = req.params.housingId;
    const housing = await housingService.getById(housingId).populate('owner').populate('buyers');
    const isOwner = housing.owner?._id == req.user?._id;
    const isBuyer = housing.buyers.some(x => x._id == req.user?._id);
    const allBuyers = housing.buyers.map(x => x.name).join(', ');
    const availablePieces = housing.availablePieces >= 1;
    const pieces = housing.availablePieces
    res.render('details', { housing, isOwner, isBuyer, allBuyers, availablePieces, pieces })
}

const rentHouse = async (req, res) => {
    await housingService.rent(req.user._id, req.params.housingId);
    res.redirect(`/${req.params.housingId}/details`)

}


const getEditPage = async (req, res) => {
    const housingId = req.params.housingId
    const housing = await housingService.getById(housingId);
    res.render('edit', { housing })
}

const postEditPage = async (req, res) => {
    const housingData = req.body;
    const housingId = req.params.housingId
    try {
        await housingService.edit(housingId, housingData)

        res.redirect(`/${housingId}/details`)
    }
    catch (error) {
        res.status(400).render(`edit`, { error: getErrorMessage(error), housing, paymentMethods })
    }

}

const deleteHousing = async (req, res) => {
    const housingId = req.params.housingId
    await housingService.delete(housingId)
    res.redirect(`/catalog`)
}


const getSearchPage = async (req, res) => {
    const { type } = req.query
    const housings = await housingService.search(type)
    res.render('search', {housings})
}



module.exports = {
    getCatalogPage,
    getCreatePage,
    postCreatePage,
    getDetailsPage,
    rentHouse,
    getEditPage,
    postEditPage,
    deleteHousing,
    getSearchPage
}