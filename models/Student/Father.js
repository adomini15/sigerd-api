const mongoose = require('mongoose')
const {isInt} = require('validator')
const ParentAbstr = require('./Abstract/ParentAbstr')

const fatherSchema = new mongoose.Schema( ParentAbstr,{ timestamps: true })

const Father = mongoose.model('Father', fatherSchema);

module.exports = Father;