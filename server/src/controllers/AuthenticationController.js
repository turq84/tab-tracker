const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7 // TOKEN EXPIRES IN 7 DAYS
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  // Registering new users:
  async register (req, res) {
    try {
      // If user doesn't exist yet
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      // If user already exists
      res.status(400).send({
        error: 'This email is already in use.'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect.'
        })
      }

      const passwordCheck = password === user.password
      if (!passwordCheck) {
        return res.status(403).send({
          error: 'The login information was incorrect.'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to login.'
      })
    }
  }
}
