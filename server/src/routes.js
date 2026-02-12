const UserController = require('./controllers/UserController')
const UserAuthenController = require('./controllers/UserAuthenController')
const BlogController = require('./controllers/BlogController')

const isAuthenticated = require('./policies/isAuthenticated')
const isAdmin = require('./policies/isAdmin')

module.exports = (app) => {
  // Auth
  app.post('/register', UserAuthenController.register)
  app.post('/login', UserAuthenController.login)

  // Users
  app.get('/users', isAuthenticated, isAdmin, UserController.index)
  app.get('/user/:userId', isAuthenticated, UserController.show)
  app.post('/user',isAuthenticated, isAdmin, UserController.create)
  app.put('/user/:userId', isAuthenticated, isAdmin, UserController.put)  
  app.delete('/user/:userId', isAuthenticated, isAdmin, UserController.remove)

  // Blogs
  app.get('/blogs', BlogController.index)
  app.get('/blog/:blogId', BlogController.show)
  app.post('/blog', isAuthenticated, isAdmin, BlogController.create)
  app.put('/blog/:blogId', isAuthenticated, isAdmin, BlogController.put)
  app.delete('/blog/:blogId', isAuthenticated, isAdmin, BlogController.remove)

}
