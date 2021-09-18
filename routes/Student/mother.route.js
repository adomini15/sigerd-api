const motherController = require('../../controllers/Students/mothers.controller')
const { Router } = require('express')
const router = Router()

// routes
router.get('/', motherController.index)

module.exports = router