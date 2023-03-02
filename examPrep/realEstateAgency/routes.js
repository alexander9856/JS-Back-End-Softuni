const router = require('express').Router();
const { isAuth } = require('./middlewares/authMiddleware')



const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const housingController = require('./controllers/housingController')


router.get('/', homeController.getHomePage)

// authentication router
router.get('/register', authController.getRegisterPage)
router.post('/register', authController.postRegisterPage)

router.get('/login', authController.getLoginPage)
router.post('/login', authController.postLoginPage)

router.get('/logout', isAuth, authController.logout)

// housing router
router.get('/catalog', housingController.getCatalogPage);

router.get('/create', isAuth, housingController.getCreatePage);
router.post('/create', isAuth, housingController.postCreatePage)

router.get('/:housingId/details', housingController.getDetailsPage)
router.get('/:housingId/rent', isAuth, housingController.rentHouse)

router.get('/:housingId/edit', isAuth, housingController.getEditPage)
router.post('/:housingId/edit', isAuth, housingController.postEditPage)

router.get('/:housingId/delete', isAuth, housingController.deleteHousing)
// //search 

router.get('/search', isAuth, housingController.getSearchPage)

//404
router.all('*', (req, res) => {
    res.render('404')
})
module.exports = router