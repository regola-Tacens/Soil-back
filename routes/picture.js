const express = require ('express')
const router = express.Router()

const controllerMethod = require ('../controllers/picture.js')
const createPicture = controllerMethod.createPicture
const updatePicture = controllerMethod.updatePicture
const fetchPictures = controllerMethod.fetchPictures
const erasePicture = controllerMethod.erasePicture
const erasePicturesLinked = controllerMethod.erasePicturesLinked
const fetchAllTags = controllerMethod.fetchAllTags
const eraseTagInPicture = controllerMethod.eraseTagInPicture

const controllerMethod2 = require('../middleware/auth.js')
const auth = controllerMethod2.auth

router.post('/createPicture', auth, createPicture);
router.post('/updatePicture/:id', auth, updatePicture )
router.get('/fetchPictures/:themeId', fetchPictures)
router.delete('/erasePicture/:id', auth, erasePicture)
router.delete('/erasePicturesLinked/:themeId', auth, erasePicturesLinked)
router.get('/:pictureId/fetchAllTags', auth, fetchAllTags )
router.post(`/eraseTagInPicture/:pictureId`,eraseTagInPicture )


module.exports = router



