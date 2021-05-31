const express = require ('express')
const router = express.Router()

const controllerMethod = require ('../controllers/tag.js')
const createTag= controllerMethod.createTag


const controllerMethod2 = require('../middleware/auth.js')
const auth = controllerMethod2.auth

router.post('/createTag', auth, createTag);


module.exports = router