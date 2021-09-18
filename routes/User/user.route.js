const userController = require('../../controllers/User/users.controller')
const { Router } = require('express')
const router = Router()

// routes

router.get('/', userController.index)

router.get('/:id', userController.show)

router.put('/:id', userController.update)

router.delete('/:id', userController.delete)

router.get('/:id/profile', userController.show_profile)

router.put('/:id/profile', userController.update_profile)

router.post('/:id/role/:name', userController.post_role)

router.get('/:id/role', userController.show_role)


module.exports = router