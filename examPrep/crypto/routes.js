const router = require('express').Router();
const { isAuth } = require('./middlewares/authMiddleware')



const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const cryptoController = require('./controllers/cryptoController')


router.get('/', homeController.getHomePage)

// authentication router
router.get('/register', authController.getRegisterPage)
router.post('/register', authController.postRegisterPage)

router.get('/login', authController.getLoginPage)
router.post('/login', authController.postLoginPage)

router.get('/logout', isAuth, authController.logout)

// crypto router
router.get('/catalog', cryptoController.getCatalogPage);

router.get('/create', isAuth, cryptoController.getCreatePage);
router.post('/create', isAuth, cryptoController.postCreatePage)

router.get('/:cryptoId/details', cryptoController.getDetailsPage)
router.get('/:cryptoId/buy', isAuth, cryptoController.buyCrypto)

router.get('/:cryptoId/edit', isAuth, cryptoController.getEditPage)
router.post('/:cryptoId/edit', isAuth, cryptoController.postEditPage)

router.get('/:cryptoId/delete', isAuth, cryptoController.deleteCrypto)
//search 

router.get('/search', isAuth, cryptoController.getSearchPage)

//404
router.all('*', (req, res) => {
    res.render('404')
})
module.exports = router