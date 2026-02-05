const Sequelize = require('sequelize')
const config = require('../config/config')

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('./User')(sequelize, Sequelize.DataTypes)

module.exports = db
