const cryptoService = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorUtils');
const { paymentMethodsMap } = require('../constants')
const getCatalogPage = async (req, res) => {
    const crypto = await cryptoService.getAll()
    res.render('catalog', { crypto })
}
const getCreatePage = async (req, res) => {
    res.render('create')
}

const postCreatePage = async (req, res) => {
    const cryptoData = req.body
    try {
        await cryptoService.create(req.user._id, cryptoData)

        res.redirect('/catalog')
    }
    catch (error) {
        res.status(400).render('create', { error: getErrorMessage(error) })
    }
}

const getDetailsPage = async (req, res) => {
    const cryptoId = req.params.cryptoId
    const crypto = await cryptoService.getById(cryptoId);
    const isOwner = crypto.owner == req.user?._id;
    const isBuyer = crypto.buyers.some(x => x == req.user?._id)
    res.render('details', { crypto, isOwner, isBuyer })
}

const buyCrypto = async (req, res) => {
    await cryptoService.buy(req.user._id, req.params.cryptoId);
    res.redirect(`/${req.params.cryptoId}/details`)
}


const getEditPage = async (req, res) => {
    const cryptoId = req.params.cryptoId
    const crypto = await cryptoService.getById(cryptoId);
    let paymentMethods = Object.keys(paymentMethodsMap).map(key => ({ key, label: paymentMethodsMap[key], selected: false }))
    paymentMethods = paymentMethods.map(x => crypto.paymentMethod == x.key ? { ...x, selected: true } : x)
    res.render('edit', { crypto, paymentMethods })
}

const postEditPage = async (req, res) => {
    const crypto = req.body;
    const cryptoId = req.params.cryptoId
    let paymentMethods = Object.keys(paymentMethodsMap).map(key => ({ key, label: paymentMethodsMap[key], selected: false }))
    paymentMethods = paymentMethods.map(x => crypto.paymentMethod == x.key ? { ...x, selected: true } : x)
    try {
        await cryptoService.edit(cryptoId, crypto)

        res.redirect(`/${cryptoId}/details`)
    }
    catch (error) {
        res.status(400).render(`edit`, { error: getErrorMessage(error), crypto, paymentMethods })
    }

}

const deleteCrypto = async (req, res) => {
    const cryptoId = req.params.cryptoId
    await cryptoService.delete(cryptoId)
    res.redirect(`/catalog`)
}


const getSearchPage = async (req, res) => {
    const { name, paymentMethod } = req.query
    const crypto = await cryptoService.search(name, paymentMethod)

    res.render('search', { crypto })
}



module.exports = {
    getCatalogPage,
    getCreatePage,
    postCreatePage,
    getDetailsPage,
    buyCrypto,
    getEditPage,
    postEditPage,
    deleteCrypto,
    getSearchPage
}