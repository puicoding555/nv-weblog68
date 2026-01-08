import { createRouter, createWebHistory } from 'vue-router'

// User Components
import UserIndex from '../components/Users/Index.vue'
import UserCreate from '../components/Users/CreateUser.vue'
import UserEdit from '../components/Users/EditUser.vue'
import UserShow from '../components/Users/ShowUser.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/users',
      component: UserIndex
    },
    {
      path: '/user/create',
      component: UserCreate
    },
    {
      path: '/user/edit/:userId',   // เพิ่ม :userId
      component: UserEdit
    },
    {
      path: '/user/:userId',        // เพิ่ม :userId
      component: UserShow
    }
  ]
})

export default router
