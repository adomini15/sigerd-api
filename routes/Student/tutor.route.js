const tutorController = require('../../controllers/Students/tutors.controller')
const { Router } = require('express')
const router = Router()

// routes
router.get('/', tutorController.index)

module.exports = router