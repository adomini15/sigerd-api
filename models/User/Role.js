const mongoose = require('mongoose')
const {isAlpha} = require('validator')

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "it's required"],
    unique: true,
    validate: [isAlpha, 'Should contain only characters (without whitespace)']
  },
  description: {
    type: String
  },
  actions: [{
    type: String,
    ref: 'Action'
  }]
})

const Role = mongoose.model('Role', roleSchema)

module.exports = Role;

