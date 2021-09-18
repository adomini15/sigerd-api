// model
const User = require('../../models/User/User')
const Profile = require('../../models/User/Profile')
const Role = require('../../models/User/Role')

// utils
const handleErrors = require('../../Utils/Errors/handleErrors')

module.exports.index = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users)

  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.show = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    res.status(200).json(user)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.update = async (req, res) => {
  const { id:_id } = req.params;

  try {
    const user = await User.updateOne({ _id }, req.body) 

    res.status(200).json(user)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id) 
    await user.remove()

    res.status(200).json({user: user._id, profile: user.profile})
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.show_profile = async (req, res) => {
  const { id: user } = req.params;

  try {
    const profile = await Profile.findOne({user}); 

    res.status(200).json(profile)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.update_profile = async (req, res) => {
  const { id:user } = req.params;

  try {
    const profile = await Profile.findOneAndUpdate({user}, req.body) 

    res.status(200).json(profile)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.post_role = async (req, res) => {
  const { id, name:role } = req.params;

  try {
    const user = await User.findById(id);

    if(!(await Role.exists({ name: role }))) {
      throw new Error('Non-existent Role')
    }

    if(user.role) {
      throw new Error('Existing Role in')
    }

    user.role = role;

    await user.save();

    res.status(200).json({role: user.role})
  } catch (err){
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.show_role = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id)

    const role = await Role.findOne({ name: user.role }); 

    if(!user.role) {
      throw new Error('Non-existent Role in')
    }

    res.status(200).json(role)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}