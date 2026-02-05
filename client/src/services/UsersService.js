import Api from './Api'

export default {
  index () {
    return Api().get('/users')
  },
  show (id) {
    return Api().get('/user/' + id)
  },
  post (user) {
    return Api().post('/user', user)
  },
  put (user) {
    return Api().put('/user/' + user.id, user)
  },
  delete (user) {
    return Api().delete('/user/' + user.id)
  }
}
