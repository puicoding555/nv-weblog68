import { createRouter, createWebHistory } from 'vue-router'

// Auth View
import Login from '../components/views/Login.vue'

// User Components
import UserIndex from '../components/Users/Index.vue'
import UserCreate from '../components/Users/CreateUser.vue'
import UserEdit from '../components/Users/EditUser.vue'
import UserShow from '../components/Users/ShowUser.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/users',
    name: 'users',
    component: UserIndex,
    meta: { requiresAuth: true }
  },
  {
    path: '/user/create',
    name: 'user-create',
    component: UserCreate,
    meta: { requiresAuth: true }
  },
  {
    path: '/user/edit/:userId',
    name: 'user-edit',
    component: UserEdit,
    meta: { requiresAuth: true }
  },
  {
    path: '/user/:userId',
    name: 'user-show',
    component: UserShow,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {
    const token = localStorage.getItem('token')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
