<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h2>User Login</h2>

      <form @submit.prevent="login">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" required />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="password" required />
        </div>

        <button type="submit">Login</button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import AuthService from '../../services/AuthService'

export default {
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

<style scoped>
.login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
}

.login-card {
  width: 320px;
  padding: 25px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.login-card h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background: #42b983;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background: #369870;
}

.error {
  margin-top: 10px;
  color: red;
  text-align: center;
}
</style>