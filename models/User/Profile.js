const mongoose = require('mongoose')
const {isDate, isInt} = require('validator')

const profileSchema = new mongoose.Schema({
  firstname: {
    type: String,
    maxLength: [35, 'Should be maximum 35']
  },
  lastname: {
    type: String,
    maxLength: [75, 'Should be maximum 75']
  },
  birth: {
    type: String,
    validate: [isDate, "Should be a correct date"]
  },
  dni: {
    type: Number,
    minLength: [11, 'Should be only 11 digits'],
    maxLength: [11, 'Should be only 11 digits'],
    validate: [isInt, "Should be only integers"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile