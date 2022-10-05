const express = require('express')
const { register, login, myProfile } = require('../controllers/userController')
const { auth } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/signup', register)
router.post('/signin', login)
router.get('/me', auth, myProfile)

module.exports = router