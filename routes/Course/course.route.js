const courseController = require('../../controllers/Courses/courses.controller')
const { Router } = require('express')
const router = Router()

// routes
router.get('/', courseController.index)
router.get('/:name', courseController.show)
router.post('/', courseController.store)
router.put('/:name',courseController.update)
router.delete('/:name', courseController.delete)

router.get('/:name/students', courseController.index_students)
router.post('/:name/students/:studentId', courseController.post_students)
router.delete('/:name/students/:studentId', courseController.delete_student)



module.exports = router