const actionController = require('../../controllers/User/actions.controller')
const { Router } = require('express')
const router = Router()

// routes
router.get('/', actionController.index)

router.get('/:name', actionController.show)

router.post('/', actionController.store)

module.exports = router