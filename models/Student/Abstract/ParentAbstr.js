const mongoose = require('mongoose')
const {isInt} = require('validator')

module.exports = {
  firstname: {
    type: String,
    maxLength: [75, 'Should be maximum 75']
  },
  lastname: {
    type: String,
    maxLength: [125, 'Should be maximum 125']
  },
  dni: {
    type: String,
    validate: [isInt, "Should be only integers"],
    minLength: [11, 'Should be only 11 digits'],
    maxLength: [11, 'Should be only 11 digits']
  },
  age: {
    type: Number
  },
  gender: {
    type: String,
    enum: {values:['M','F'], message: `Expected 'M' or 'F'`},
  },
  address: {
    type: String,
    maxLength: [255, 'Should be maximum 255']
  },
  declared: {
    type: String,
    enum: {values:['Y','N'], message: `Expected 'Y' or 'N'`},
  },
  nationality: {
    type: String,
    maxLength: [75, 'Should be maximum 75']
  },
  tel: {
    type: Number,
  },
  grade: {
    type: String,
    maxLength: [45, 'Should be maximum 45']
  },
  job: {
    type: String,
    maxLength: [45, 'Should be maximum 45']
  },
  job_tel: {
    type: Number,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }
}