const express = require ('express')
const router = express.Router()

const controllerMethod = require ('../controllers/theme.js')
const createTheme = controllerMethod.createTheme
const fetchTheme = controllerMethod.fetchTheme
const updateTheme = controllerMethod.updateTheme
const eraseTheme = controllerMethod.eraseTheme

const controllerMethod2 = require('../middleware/auth.js')
const auth = controllerMethod2.auth


router.post('/createTheme', auth, createTheme);
router.get('/fetchTheme', fetchTheme);
router.post('/updateTheme/:themeId',auth, updateTheme)
router.delete('/eraseTheme/:themeId', auth, eraseTheme)


module.exports = router

