// Model

const Course = require('../../models/Course/Course')
const Student = require('../../models/Student/Student')

// utils
const handleErrors = require('../../Utils/Errors/handleErrors')

module.exports.index = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json(courses)

  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.show = async (req, res) => {
  const { name } = req.params;

  try {
    const course = await Course.findOne({name});

    res.status(200).json(course)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.store = async (req, res) => {
  try {
    const course = await Course.create(req.body)

    res.status(200).json({course: course.name})
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  } 
}

module.exports.update = async (req, res) => {
  const { name } = req.params;

  try {
    const course = await Course.updateOne({ name }, req.body) 

    res.status(200).json(course)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.delete = async (req, res) => {
  const { name } = req.params;

  try {

    const course = await Course.findOne({name}) 
    await course.remove()

    Student.updateMany({ course: name }, {
      $unset: { course: 1}
    }, function (err) {
      if(err) {
        throw err;
      }
    })

    res.status(200).json({course: course.name})
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.index_students = async (req, res) => {
  const {name} = req.params;

  try {
    const students = await Course.findOne({name}).populate('students')

    res.status(200).json(students)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  } 
}

module.exports.post_students = async (req, res) => {
  const {name, studentId} = req.params;

  try {
    const course = await Course.findOne({name})


    if (course.students.includes(studentId, 0)) {
      throw new Error('Existing student in course')
    } 

    const student = await Student.updateOne({ _id: studentId}, { course: course.name})

    if(!student.ok) {
      throw new Error('Non-existent student')
    }

    course.students.push(studentId);

    await course.save()

    res.status(200).json(course)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  } 
}

module.exports.delete_student = async (req, res) => {
  const {name, studentId} = req.params;
  let errorCode = 400;

  try {
    const course = await Course.findOne({name})

    if (!course.students.includes(studentId, 0)) {
      errorCode = 404;
      throw new Error(`Non-existent student in course`)
    } 

    const student = await Student.updateOne({ _id: studentId}, { $unset: { course: 1}})

    if(!student.ok) {
      throw new Error('Non-existent student')
    }

    course.students.splice(course.students.indexOf(studentId), 1);

    await course.save()

    

    res.status(200).json(course)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(errorCode).json({errors})
  } 
}