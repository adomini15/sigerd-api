const authController = require('../../controllers/User/auth.controller')
const { Router } = require('express')
const router = Router()

// routes
router.post('/signup', authController.signup)

router.post('/login', authController.login)

router.get('/logout', authController.logout)

module.exports = router