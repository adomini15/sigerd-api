// Model

const Mother = require('../../models/Student/Mother')

// utils
const handleErrors = require('../../Utils/Errors/handleErrors')

module.exports.index = async (req, res) => {
  try {
    const mothers = await Mother.find()

    res.status(200).json(mothers)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}