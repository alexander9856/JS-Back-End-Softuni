const router = require('express').Router();
const { isAuth } = require('./middlewares/authMiddleware')



const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const auctionController = require('./controllers/auctionController');



router.get('/', homeController.getHomePage)

//auth 
router.get('/register', authController.getRegisterPage)
router.post('/register', authController.postRegisterPage)

router.get('/login', authController.getLoginPage)
router.post('/login', authController.postLoginPage)

router.get('/logout', isAuth, authController.logout)

// //auctions
router.get('/catalog', auctionController.getCatalogPage)

router.get('/create', isAuth, auctionController.getCreatePage)
router.post('/create', isAuth, auctionController.postCreatePage)

router.get('/:auctionId/details', auctionController.getDetailsPage)

router.post('/:auctionId/details', isAuth, auctionController.postDetailsBid)

router.get('/:auctionId/edit', isAuth, auctionController.getEditPage)
router.post('/:auctionId/edit', isAuth, auctionController.postEditPage)

router.get('/:auctionId/delete', isAuth, auctionController.deleteauction)
// //search 

router.get('/:auctionId/close', isAuth, auctionController.closeAuction)
router.get('/closed', isAuth, auctionController.getClosedAuctionsPage)

router.all('*', (req, res) => {
    res.render('404')
})
module.exports = router