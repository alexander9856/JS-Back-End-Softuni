const router = require('express').Router();
const { isAuth } = require('./middlewares/authMiddleware')



const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const photoController = require('./controllers/photoController');



router.get('/', homeController.getHomePage)

//auth 
router.get('/register', authController.getRegisterPage)
router.post('/register', authController.postRegisterPage)

router.get('/login', authController.getLoginPage)
router.post('/login', authController.postLoginPage)

router.get('/logout', isAuth, authController.logout)

//photos
router.get('/catalog', photoController.getCatalogPage)

router.get('/create', isAuth, photoController.getCreatePage)
router.post('/create', isAuth, photoController.postCreatePage)

router.get('/:photoId/details', photoController.getDetailsPage)
router.post('/:photoId/details', isAuth, photoController.postDetailsComment)

router.get('/:photoId/edit', isAuth, photoController.getEditPage)
router.post('/:photoId/edit', isAuth, photoController.postEditPage)

router.get('/:photoId/delete', isAuth, photoController.deletePhoto)


//profile

router.get('/profile', isAuth, photoController.getProfilePageOfUser)
router.get('/:userId/profile', isAuth, photoController.getProfilePageOfCreator)

router.all('*', (req, res) => {
    res.render('404')
})
module.exports = router