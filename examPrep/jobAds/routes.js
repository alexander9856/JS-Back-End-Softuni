const router = require('express').Router();
const { isAuth } = require('./middlewares/authMiddleware')



const authController = require('./controllers/authController');
const adController = require('./controllers/adController')


router.get('/', adController.getHomePage)

// authentication router
router.get('/register', authController.getRegisterPage)
router.post('/register', authController.postRegisterPage)

router.get('/login', authController.getLoginPage)
router.post('/login', authController.postLoginPage)

router.get('/logout', isAuth, authController.logout)

// ad router
router.get('/catalog', adController.getCatalogPage);

router.get('/create', isAuth, adController.getCreatePage);
router.post('/create', isAuth, adController.postCreatePage)

router.get('/:adId/details', adController.getDetailsPage)
router.get('/:adId/apply', isAuth, adController.apply)

router.get('/:adId/edit', isAuth, adController.getEditPage)
router.post('/:adId/edit', isAuth, adController.postEditPage)

router.get('/:adId/delete', isAuth, adController.deleteAd)
//search 

router.get('/search', isAuth, adController.getSearchPage)

//404
router.all('*', (req, res) => {
    res.render('404')
})
module.exports = router