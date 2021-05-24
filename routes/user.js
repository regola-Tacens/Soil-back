const express = require ('express')
const router = express.Router()

const controllerMethod = require ('../controllers/user.js')
const signup = controllerMethod.signup
const signin = controllerMethod.signin

router.post('/signup', signup);
router.post('/signin', signin)

module.exports = router