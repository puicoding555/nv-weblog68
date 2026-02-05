const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).send({
        error: 'No authorization header'
      })
    }

    // Bearer <token>
    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(
      token,
      config.authentication.jwtSecret
    )

    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).send({
      error: 'Invalid token'
    })
  }
}
