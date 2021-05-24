const express = require ('express')
const router = express.Router()

const controllerMethod = require ('../controllers/picture.js')
const createPicture = controllerMethod.createPicture
const fetchPictures = controllerMethod.fetchPictures
const erasePicturesLinked = controllerMethod.erasePicturesLinked

const controllerMethod2 = require('../middleware/auth.js')
const auth = controllerMethod2.auth

router.post('/createPicture', auth, createPicture);
router.get('/fetchPictures/:themeId', fetchPictures)
router.delete('/erasePicturesLinked/:themeId', auth, erasePicturesLinked)


module.exports = router

