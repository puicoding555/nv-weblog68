const UserController = require('./controllers/UserController')
const UserAuthenController = require('./controllers/UserAuthenController')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  // Auth
  app.post('/register', UserAuthenController.register)
  app.post('/login', UserAuthenController.login)

  // User CRUD
  app.get('/users', isAuthenticated, UserController.index)
  app.get('/user/:userId', UserController.show)
  app.post('/user', UserController.create)
  app.put('/user/:userId', UserController.put)
  app.delete('/user/:userId', UserController.remove)
}
