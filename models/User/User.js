const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

// custom errors
const LoginError = require('../../Utils/Errors/custom-errors/LoginError')

const Profile = require('./Profile')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'it\'s required'],
    unique: true,
    lowercase: [true, 'Characters should be lowercase'],
    validate: [ isEmail , 'format incorrect'],
  },
  password: {
    type: String,
    required: [true, 'it\'s required'],
    minLength: [7, 'Should be minimum 7']
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  role: {
    type: String,
    ref: 'Role'
  }  
}, { timestamps: true})

//utils

const onChangePassword = async (data) => {
  try {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt)
  } catch(err) {
    console.log(err)
  }
}

const createProfile = async (user) => {
  try {
    const profile = new Profile();
    profile.user = user._id;
    await profile.save();

    return profile._id;
  } catch (err) {
    console.log(err)
  }
}

// hooks

userSchema.pre('save', async function(next) {
  try {
    await onChangePassword(this)
    this.profile = await createProfile(this)    
    next()
  } catch (err) {
    console.log(err)
  }

})

userSchema.pre('updateOne', async function(next) {
  try {
    const user = this.getUpdate();

    if(user?.password) {
      await onChangePassword(user)
    }
    
    next()
  } catch (err) {
    console.log(err)
  }
})

userSchema.post('remove', async function (user, next) {
  try {
    const profile = await Profile.findOneAndRemove({ user: user._id})
    next()
  } catch (err) {
    console.log(err)
  }
})

// statics

userSchema.statics.login = async (email, password) => {
  const user = await User.findOne({ email })

  if(user) {
    const auth = await bcrypt.compare(password, user.password)
    console.log(auth)
    if(auth) {
      return user;
    }
    
    throw new LoginError({ password: 'incorrect password'})
  }

  throw new LoginError({ email: 'email not found'})
}


const User = mongoose.model('User', userSchema)

module.exports = User;