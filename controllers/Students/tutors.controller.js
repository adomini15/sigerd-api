// Model

const Tutor = require('../../models/Student/Tutor')

// utils
const handleErrors = require('../../Utils/Errors/handleErrors')

module.exports.index = async (req, res) => {
  try {
    const tutors = await Tutor.find()

    res.status(200).json(tutors)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}