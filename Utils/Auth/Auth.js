require('dotenv').config();
const jwt = require('jsonwebtoken')

module.exports.createToken = (user_id) => {
  return jwt.sign({user: user_id}, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 24 * 3
  })
}