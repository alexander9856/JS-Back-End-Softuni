const router = require('express').Router()

const cubeController = require('./controllers/cubeController')
const homeController = require('./controllers/homeController')
const accessoryController = require('./controllers/accessoryController')
const authController = require('./controllers/authController')
const { isAuthenticated } = require('./middlewares.js/authMiddleware')

router.get('/404', homeController.getErrorPage)

router.get('/login', authController.getLoginPage)
router.post('/login', authController.postLogin)


router.get('/register', authController.getRegisterPage)
router.post('/register', authController.postRegister)


router.get('/', homeController.getHomePage);
router.get('/about', homeController.getAboutPage);

router.get('/create', isAuthenticated, cubeController.getCreateCube);
router.post('/create', isAuthenticated, cubeController.postCreateCube)

router.get('/create/accessory', isAuthenticated, accessoryController.getCreateAccessory)
router.post('/create/accessory', isAuthenticated, accessoryController.postCreateAccessory)

router.get('/attach/accessory/:cubeId', accessoryController.getAttachAccessory)
router.post('/attach/accessory/:cubeId', accessoryController.postAttachAccessory)


router.get('/details/:cubeId', cubeController.getCubeDetails)

router.get('/edit/:cubeId', cubeController.getEditCube)
router.post('/edit/:cubeId', cubeController.postEditCubeDetails)

router.get('/delete/:cubeId', cubeController.getDeleteCube)
router.post('/delete/:cubeId', cubeController.postDeleteCube)

router.get('/logout',authController.logout)


module.exports = router