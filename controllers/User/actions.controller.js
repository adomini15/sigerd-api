// model
const Action = require('../../models/User/Action')

// utils
const handleErrors = require('../../Utils/Errors/handleErrors')

module.exports.index = async (req, res) => {
  try {
    const actions = await Action.find()

    res.status(200).json(actions)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  } 
}

module.exports.show = async (req, res) => {
  const {name} = req.params;

  try {
    const action = await Action.findOne({name})

    res.status(200).json(action)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  } 
}

module.exports.store = async (req, res) => {
  try {
    const action = await Action.create(req.body)

    res.status(200).json({action})
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  } 
}