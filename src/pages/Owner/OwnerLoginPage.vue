<template>
  <div class="login-page">
    <div class="background-image"></div>
    <div class="login-container">
      <div class="login-box">
        <h2>Owner Login</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" required />
          </div>
          <button type="submit">Login</button>
          <div v-if="message" :class="{ 'message-error': !isSuccess, 'message-success': isSuccess }">{{ message }}</div>
        </form>
        <router-link to="owner-register">Don't have an account? Register here as Owner</router-link>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
      isSuccess: false
    };
  },
  methods: {
    ...mapActions(['login']),
    async login() {
      try {
        const response = await axios.post('http://localhost:5163/Owner/login', {
          email: this.email,
          password: this.password
        });

        if (response.status === 200) {
          this.isSuccess = true;
          this.message = 'Login successful!';
          const role = response.data.role;
          this.$store.commit('setUserEmail', this.email);
          this.login({ email: this.email, role });
          setTimeout(() => {
            if (this.$route.path !== '/owner-dashboard') {
              this.$router.push('/owner-dashboard');
            }
          }, 2000);
          // Redirect the user to the owner dashboard or perform other actions
        } else {
          this.message = 'Wrong email/password';
        }
      } catch (error) {
        console.error('Login error:', error.message);
        this.message = 'Login failed';
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-image: url('@/assets/BG2.jpg');
  background-size: cover;
  background-position: center;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust the opacity as needed */
}

.login-container {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.login-box {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  margin-bottom: 250px;
}

.login-box h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.message-error {
  margin-top: 15px;
  color: red;
}

.message-success {
  margin-top: 15px;
  color: green;
}
</style>