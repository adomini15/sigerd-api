const roleController = require('../../controllers/User/roles.controller')
const { Router } = require('express')
const router = Router()

// routes

router.get('/', roleController.index)

router.get('/:name', roleController.show)

router.post('/', roleController.store)

router.get('/:name/actions', roleController.index_actions)

router.post('/:name/actions/:name_action', roleController.post_action)

router.delete('/:name/actions/:name_action', roleController.delete_action)


module.exports = router