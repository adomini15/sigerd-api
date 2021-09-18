// model
const Role = require('../../models/User/Role')
const Action = require('../../models/User/Action')

// utils
const handleErrors = require('../../Utils/Errors/handleErrors')

module.exports.index = async (req, res) => {
  try {
    const roles = await Role.find()

    res.status(200).json(roles)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  } 
}

module.exports.show = async (req, res) => {
  const {name} = req.params;

  try {
    const role = await Role.findOne({name})

    res.status(200).json(role)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  } 
}

module.exports.store = async (req, res) => {
  try {
    const role = await Role.create(req.body)

    res.status(200).json({role: role.name})
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  } 
}

module.exports.index_actions = async (req, res) => {
  const {name} = req.params;

  try {
    const role = await Role.findOne({name})

    res.status(200).json(role.actions)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  } 
}

module.exports.post_action = async (req, res) => {
  const {name, name_action} = req.params;

  try {
    const role = await Role.findOne({name})

    if(!(await Action.exists({ name: name_action }))) {
      throw new Error('Non-existent Action')
    }

    if (role.actions.includes(name_action, 0)) {
      throw new Error('Existing Action in')
    } 

    role.actions.push(name_action);

    await role.save()

    res.status(200).json(role)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  } 
}

module.exports.delete_action = async (req, res) => {
  const {name, name_action} = req.params;
  let errorCode = 400;

  try {
    const role = await Role.findOne({name})

    if (!role.actions.includes(name_action, 0)) {
      errorCode = 404;
      throw new Error(`Non-existent Action`)
    } 

    role.actions.splice(role.actions.indexOf(name_action), 1);

    await role.save()

    res.status(200).json(role)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(errorCode).json({errors})
  } 
}