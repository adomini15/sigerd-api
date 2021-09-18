const mongoose = require('mongoose')
const LoginError = require('./custom-errors/LoginError')

module.exports = (err) => {
  let errors = {};

  if(err.code == 11000) {
    errors.name = 'Duplicate not allowed';
    return errors
  }

  if(err instanceof LoginError) {
    errors = err.errors;
    return errors;
  }
  
  if(err instanceof mongoose.Error.ValidationError) {
    Object.values(err.errors).forEach(({properties: props}) => {
      errors[props.path] = props.message;
    })  
    return errors
  }

  return err.message;
 
}