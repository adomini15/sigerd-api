const mongoose = require('mongoose')
const {isInt} = require('validator')
const ParentAbstr = require('./Abstract/ParentAbstr')

const motherSchema = new mongoose.Schema( ParentAbstr,{ timestamps: true })

const Mother = mongoose.model('Mother', motherSchema);

module.exports = Mother;