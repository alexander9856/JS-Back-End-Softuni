const { getErrorMessage } = require('../utils/errorUtils')
const authService = require('../services/auctionService');
const auctionService = require('../services/auctionService')
const getCatalogPage = async (req, res) => {
    let allAuctions = await auctionService.getAll()
    let auctions = []
    allAuctions.map(x => x.isClosed == false ? auctions.push(x) : '')
    res.render('catalog', { auctions })
}

const getCreatePage = async (req, res) => {
    res.render('create')
}
const postCreatePage = async (req, res) => {
    let auctionData = req.body
    const categories = [
        { key: 'estate', value: 'Real Estate' },
        { key: 'vehicles', value: 'Vehicles' },
        { key: 'furniture', value: 'Furniture' },
        { key: 'electronics', value: 'Electronics' },
        { key: 'other', value: 'Other' },
    ]
    categories.map((x) => auctionData.category == x['key'] ? auctionData.category = x['value'] : '')
    try {
        await authService.create(req.user._id, auctionData)
        res.redirect('/catalog')
    }
    catch (error) {
        res.status(400).render('create', { error: getErrorMessage(error) })
    }
}

const getDetailsPage = async (req, res) => {
    const auctionId = req.params.auctionId
    const auction = await auctionService.getById(auctionId);
    const isAuthor = auction.author == req.user?._id;

    const bidderId = auction?.bidder
    const bidder = bidderId ? await auctionService.getUserById(bidderId) : ''
    const isCurrentBidder = bidderId == req.user?._id
    const bidderName = `${bidder?.firstName} ${bidder?.lastName}`

    const author = await auctionService.getUserById(auction.author);
    const authorName = `${author.firstName} ${author.lastName}`
    if (isAuthor) {
        res.render('details-owner', { auction, authorName, bidder, bidderName })
    }
    else {
        res.render('details', { auction, authorName, isCurrentBidder })
    }
}
const postDetailsBid = async (req, res) => {
    const auctionId = req.params.auctionId;
    let auction = await auctionService.getById(auctionId);
    const isBidder = req.user._id == auction?.bidder;
    const author = await auctionService.getUserById(auction.author);
    const authorName = `${author.firstName} ${author.lastName}`
    let { bid } = req.body;
    try {
        if (Number(bid) <= Number(auction.price) || isBidder == true) {
            throw new Error('Your bid must be higher than the current price')
        }
        else {
            await auctionService.editBidder(auctionId, req.user._id);
            res.redirect(`/${auctionId}/details`)
        }

    }
    catch (error) {
        res.status(400).render(`details`, { error: getErrorMessage(error), auction, authorName })
    }
}

const getEditPage = async (req, res) => {
    const auctionId = req.params.auctionId
    const auction = await auctionService.getById(auctionId);
    const isBidder = auction?.bidder;
    let categories = [
        { value: 'Real Estate', selected: false },
        { value: 'Vehicles', selected: false },
        { value: 'Furniture', selected: false },
        { value: 'Electronics', selected: false },
        { value: 'Other', selected: false },
    ]
    categories = categories.map(x => auction.category == x['value'] ? { ...x, selected: true } : x)
    res.render('edit', { auction, isBidder, categories })
}

const postEditPage = async (req, res) => {
    const auction = req.body;
    const auctionId = req.params.auctionId
    try {
        await auctionService.edit(auctionId, auction)
        res.redirect(`/${auctionId}/details`)
    }
    catch (error) {
        res.status(400).render(`edit`, { error: getErrorMessage(error), auction })
    }

}

const deleteauction = async (req, res) => {
    const auctionId = req.params.auctionId
    await auctionService.delete(auctionId)
    res.redirect(`/catalog`)
}


const closeAuction = async (req, res) => {
    const auctionId = req.params.auctionId
    await auctionService.close(auctionId)
    res.redirect(`/closed`)
}


const getClosedAuctionsPage = async (req, res) => {
    const userId = req.user?._id;
    const auctions = await auctionService.getAll();
    const closedAuctions = [];
    auctions.map(x => x.isClosed == true && x.author == userId ? closedAuctions.push(x) : '');
    let finalAuctions = []
    for (let i of closedAuctions) {
        let bidderId = i.bidder;
        let bidder = await auctionService.getUserById(bidderId);
        let name = `${bidder.firstName} ${bidder.lastName}`
        i.bidder = name
        finalAuctions.push(i)
    }
    res.render('closed-auctions', { finalAuctions })
}




module.exports = {
    getCatalogPage,
    getCreatePage,
    postCreatePage,
    getDetailsPage,
    postDetailsBid,
    getEditPage,
    postEditPage,
    deleteauction,
    closeAuction,
    getClosedAuctionsPage
}