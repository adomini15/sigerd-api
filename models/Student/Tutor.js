const mongoose = require('mongoose')
const {isInt} = require('validator')
const ParentAbstr = require('./Abstract/ParentAbstr')

const tutorSchema = new mongoose.Schema( ParentAbstr,{ timestamps: true })

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;