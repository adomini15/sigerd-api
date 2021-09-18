const profileController = require('../../controllers/User/profiles.controller')
const { Router } = require('express')
const router = Router()

// routes
router.get('/', profileController.index)

module.exports = router