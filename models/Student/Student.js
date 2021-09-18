//model
const Father = require('./Father')
const Mother = require('./Mother')
const Tutor = require('./Tutor')
const Course = require('../Course/Course')

const mongoose = require('mongoose')
const {isInt} = require('validator')

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "it's required"],
    maxLength: [75, 'Should be maximum 75']
  },
  lastname: {
    type: String,
    required: [true, "it's required"],
    maxLength: [125, 'Should be maximum 125']
  },
  age: {
    type: Number,
    required: [true, "it's required"]
  },
  address: {
    type: String,
    maxLength: [255, 'Should be maximum 255'],
    default: ''
  },
  gender: {
    type: String,
    required: [true, "it's required"],
    enum: {values:['M','F'], message: `Expected 'M' or 'F'`},
    trim: true
  },
  declared: {
    type: String,
    required: [true, "it's required"],
    enum: {values:['Y','N'], message: `Expected 'Y' or 'N'`},
    trim: true
  },
  nationality: {
    type: String,
    required: [true, "it's required"],
    maxLength: [75, 'Should be maximum 75']
  },
  mother: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mother'
  },
  father: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Father'
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor'
  },
  course: {
    type: String,
    ref: 'Course'
  }
},{ timestamps: true })

//utils

const createFather = async (student) => {
  try {
    const father = new Father();
    father.student = student._id;
    await father.save();

    return father._id;
  } catch (err) {
    console.log(err)
  }
}

const createMother = async (student) => {
  try {
    const mother = new Mother();
    mother.student = student._id;
    await mother.save();

    return mother._id;
  } catch (err) {
    console.log(err)
  }
}

const createTutor = async (student) => {
  try {
    const tutor = new Tutor();
    tutor.student = student._id;
    await tutor.save();

    return tutor._id;
  } catch (err) {
    console.log(err)
  }
}

// hooks

studentSchema.pre('save', async function (next) {
  try {
    
    this.father = await createFather(this)
    this.mother = await createMother(this)
    this.tutor = await createTutor(this)

    next()
  } catch (err) {
    console.log(err)
  }
})

studentSchema.post('remove', async function (student, next) {
  try {
    const father = await Father.findOneAndRemove({ student: student._id})
    const mother = await Mother.findOneAndRemove({ student: student._id})
    const tutor = await Tutor.findOneAndRemove({ student: student._id})
    const course = await Course.findOne({name: student.course})
    
    if (course) {
      course.students.splice(course.students.indexOf(student._id), 1);
      await course.save()
    } 

    next()
  } catch (err) {
    console.log(err)
  }
})

// Siempre importante colocar esta linea de abajo despues de toda la configuracion relacionado a Schema

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;