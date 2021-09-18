// Model

const Father = require('../../models/Student/Father')

// utils
const handleErrors = require('../../Utils/Errors/handleErrors')

module.exports.index = async (req, res) => {
  try {
    const fathers = await Father.find()

    res.status(200).json(fathers)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}