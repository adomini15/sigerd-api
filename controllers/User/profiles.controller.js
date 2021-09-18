// Model

const Profile = require('../../models/User/Profile')

// utils
const handleErrors = require('../../Utils/Errors/handleErrors')

module.exports.index = async (req, res) => {
  try {
    const profiles = await Profile.find()

    res.status(200).json(profiles)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}
