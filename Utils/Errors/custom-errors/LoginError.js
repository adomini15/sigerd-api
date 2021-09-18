class LoginError extends Error {
  constructor(errobj) {
    super()
    this.name = 'Login Error'
    this.errors = errobj;
  }
}

module.exports = LoginError;