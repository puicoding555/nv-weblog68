module.exports = function (req, res, next) {
  try {
    if (!req.user) {
      return res.status(403).send({
        error: 'No user information'
      })
    }

    if (req.user.role !== 'admin') {
      return res.status(403).send({
        error: 'You do not have permission'
      })
    }

    next()
  } catch (err) {
    return res.status(403).send({
      error: 'Authorization error'
    })
  }
}
