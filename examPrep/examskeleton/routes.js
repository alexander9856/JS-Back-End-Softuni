const router = require('express').Router();
const { isAuth } = require('./middlewares/authMiddleware')



const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');


router.get('/', homeController.getHomePage)


router.get('/register', authController.getRegisterPage)
router.post('/register', authController.postRegisterPage)

router.get('/login', authController.getLoginPage)
router.post('/login', authController.postLoginPage)

router.get('/logout', isAuth, authController.logout)

module.exports = router