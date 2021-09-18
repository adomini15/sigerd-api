const mongoose = require('mongoose')
const {isAlpha} = require('validator')

const actionSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "it's required"],
    validate: [isAlpha, 'Should contain only characters (without whitespace)']
  },
  description: {
    type: String
  }
})

const Action = mongoose.model('Action', actionSchema)


module.exports = Action