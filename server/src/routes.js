const UserController = require('./controllers/UserController')
const AuthenticationController = require('./controllers/AuthenticationController')

module.exports = (app) => {
  // เส้นทางเดิมจากบทที่ 4 (ถ้าอยากเก็บไว้)
  // app.get('/status', (req, res) => res.send('server is running'))

  // เส้นทางใหม่สำหรับ User Management แบบ MVC
  app.get('/users', UserController.index)
  app.post('/user', UserController.create)
  app.put('/user/:userId', UserController.put)
  app.delete('/user/:userId', UserController.remove)
  app.get('/user/:userId', UserController.show)
  app.post('/register', AuthenticationController.register)
}