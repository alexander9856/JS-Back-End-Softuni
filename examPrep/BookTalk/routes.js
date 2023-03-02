const router = require('express').Router();
const { isAuth } = require('./middlewares/authMiddleware')



const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const bookController = require('./controllers/bookController');



router.get('/', homeController.getHomePage)

//auth 
router.get('/register', authController.getRegisterPage)
router.post('/register', authController.postRegisterPage)

router.get('/login', authController.getLoginPage)
router.post('/login', authController.postLoginPage)

router.get('/logout', isAuth, authController.logout)

//books
router.get('/catalog', bookController.getCatalogPage)

router.get('/create', isAuth, bookController.getCreatePage)
router.post('/create', isAuth, bookController.postCreatePage)

router.get('/:bookId/details', bookController.getDetailsPage)
router.get('/:bookId/wish', isAuth, bookController.wishBook)

router.get('/:bookId/edit', isAuth, bookController.getEditPage)
router.post('/:bookId/edit', isAuth, bookController.postEditPage)

router.get('/:bookId/delete', isAuth, bookController.deleteBook)
//search 

router.get('/profile', isAuth, bookController.getProfilePage)

router.all('*', (req, res) => {
    res.render('404')
})
module.exports = router