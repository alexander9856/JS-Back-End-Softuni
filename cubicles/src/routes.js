const router = require('express').Router()

const cubeController = require('./controllers/cubeController')
const homeController = require('./controllers/homeController')

router.get('/404',homeController.getErrorPage)

router.get('/', homeController.getHomePage);
router.get('/about', homeController.getAboutPage);

router.get('/create', cubeController.getCreateCube);
router.post('/create', cubeController.postCreateCube)

router.get('/details/:cubeId', cubeController.getCubeDetails)

module.exports = router