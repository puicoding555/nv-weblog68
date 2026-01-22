<template> 
  <div>
    <h1>Get All Users</h1>

    <h4>จำนวนผู้ใช้งาน: {{ users.length }}</h4>

    <div v-for="user in users" :key="user.id">
      <p>id: {{ user.id }}</p>
      <p>ชื่อ-นามสกุล: {{ user.name }} - {{ user.lastname }}</p>
      <p>email: {{ user.email }}</p>
      <p>password: {{ user.password }}</p>

      <button @click="goShow(user.id)">ดูข้อมูลผู้ใช้</button> 

      <hr>
    </div>

    <button @click="goCreate">Create User</button> 
    
  </div>
</template>

<script>
import UsersService from '../../services/UsersService'


export default {
  data () {
    return {
      users: []            // เก็บข้อมูลจาก Server
    }
  },

  async created () {
  try {
    const response = await UsersService.index()
    console.log(response)
    this.users = response.data
  } catch (error) {
    console.log(error)
  }
},

  methods: {
  goCreate () {
    this.$router.push({ name: 'user-create' })
  },
  goShow (userId) {
    this.$router.push({
      name: 'user-show',
      params: { userId }
    })
  },
  goEdit (userId) {
    this.$router.push({
      name: 'user-edit',
      params: { userId }
    })
  }
  }
}
</script>

<style scoped>
button {
  padding: 6px 12px;
}
</style>
