const router = require('express').Router();
const { isAuth } = require('./middlewares/authMiddleware')



const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const tripController = require('./controllers/tripController');



router.get('/', homeController.getHomePage)

//auth 
router.get('/register', authController.getRegisterPage)
router.post('/register', authController.postRegisterPage)

router.get('/login', authController.getLoginPage)
router.post('/login', authController.postLoginPage)

router.get('/logout', isAuth, authController.logout)

//trips
router.get('/catalog', tripController.getCatalogPage)

router.get('/create', isAuth, tripController.getCreatePage)
router.post('/create', isAuth, tripController.postCreatePage)

router.get('/:tripId/details', tripController.getDetailsPage)
router.get('/:tripId/join', isAuth, tripController.joinTrip)

router.get('/:tripId/edit', isAuth, tripController.getEditPage)
router.post('/:tripId/edit', isAuth, tripController.postEditPage)

router.get('/:tripId/delete', isAuth, tripController.deletetrip)
// //search 

router.get('/profile', isAuth, tripController.getProfilePage)

router.all('*', (req, res) => {
    res.render('404')
})
module.exports = router