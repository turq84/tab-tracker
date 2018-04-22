const Joi = require('joi')

module.exports = {
  // This checks that the registered email is in the correct format.
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    const {error} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address.'
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided failed the following rules:
              <br>
              1. It must contain ONLY the follow characters: Uppercase, lowercase, and numerics.<br>
              2. It must be at least 8 characters long. <br>
            `
          })

          break
        default:
          res.status(400).send({
            error: 'Invalid registration information.'
          })
      }
    } else {
      // If everything passes, continue to next line.
      next()
    }
  }
}
