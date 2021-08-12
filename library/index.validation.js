const { validationResult } = require('express-validator')

class validator {

  static hasError(req, res, next) {
    const error = validationResult(req)
    if(!error.isEmpty()) {
      return res.status(400).json({message: error.array({onlyFirstError: true})})
    }
    next()
  }
}

module.exports = validator;