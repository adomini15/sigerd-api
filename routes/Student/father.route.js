const fatherController = require('../../controllers/Students/fathers.controller')
const { Router } = require('express')
const router = Router()

// routes
router.get('/', fatherController.index)

module.exports = router