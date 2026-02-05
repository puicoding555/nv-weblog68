<template>
  <div class="login-container">
    <h2>User Login</h2>

    <form @submit.prevent="login">
      <div>
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>

      <div>
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit">Login</button>

      <p v-if="error" style="color:red">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import AuthService from '../services/AuthService'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const res = await AuthService.login({
          email: this.email,
          password: this.password
        })

        localStorage.setItem('token', res.data.token)
        this.$router.push('/users')
      } catch (err) {
        this.error = err.response?.data?.error || 'Login failed'
      }
    }
  }
}
</script>
