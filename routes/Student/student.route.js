const studentController = require('../../controllers/Students/students.controller')
const { Router } = require('express')
const router = Router()

router.get('/', studentController.index)
router.get('/:id', studentController.show)
router.post('/', studentController.store)
router.put('/:id',studentController.update)
router.delete('/:id', studentController.delete)

router.get('/:id/tutor', studentController.show_tutor)
router.put('/:id/tutor', studentController.update_tutor)

router.get('/:id/father', studentController.show_father)
router.put('/:id/father', studentController.update_father)

router.get('/:id/mother', studentController.show_mother)
router.put('/:id/mother', studentController.update_mother)

module.exports = router;
