const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  return jwt.sign(
    user,
    config.authentication.jwtSecret,
    { expiresIn: '7d' }
  )
}

module.exports = {
// POST /register
async register (req, res) {
  try {
    const { email, password, name, lastname } = req.body

    const user = await User.create({
      email,
      password,
      name,
      lastname,
      role: 'user',      // บังคับเป็น user
      status: 'Active'
    })

    res.send(user)
  } catch (err) {
    console.error(err)
    res.status(400).send({
      error: 'Register failed'
    })
  }
},

  // POST /login
  async login (req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({
        where: { email }
      })

      // เช็ก user ไม่เจอ
      if (!user) {
        return res.status(403).send({
          error: 'User not found'
        })
      }

      // compare password
      const isValid = await user.comparePassword(password)

      if (!isValid) {
        return res.status(403).send({
          error: 'Password incorrect'
        })
      }

      const userJSON = user.toJSON()

      res.send({
        user: userJSON,
        token: jwtSignUser(userJSON)
      })
    } catch (err) {
      console.error(err)
      res.status(500).send({
        error: 'Login error'
      })
    }
  }
}
