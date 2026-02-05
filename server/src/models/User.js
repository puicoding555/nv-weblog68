const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    status: DataTypes.STRING
  })

  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  })

  User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
  }

  return User
}
