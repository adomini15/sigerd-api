// Models
const Student = require('../Student/Student')
const mongoose = require('mongoose')
const { isAlpha } = require('validator')

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `it's required`],
    unique: true,
    validate: [isAlpha, 'Only characters without spaces']
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
}, { timestamps: true })



const Course = mongoose.model('Course', courseSchema)

module.exports = Course;