<template>
  <div class="register-page">
    <div class="background-image"></div>
    <div class="register-container">
      <div class="register-box">
        <form @submit.prevent="register">
        <h2>Client Registration</h2>
        <div class="form-group">
          <label for="name">Name*:</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email*:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password*:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group">
          <label for="phonenumber">Phone Number*:</label>
          <input type="text" id="phonenumber" v-model="phonenumber" required />
        </div>
        <div class="form-group">
          <label for="address">Address*:</label>
          <input type="text" id="address" v-model="address" required />
        </div>
        <button type="submit">Register</button>
        <div v-if="registrationMessage" class="registration-message">{{ registrationMessage }}</div>
      </form>
      <router-link to="client-login">Already have a Client account? Log in here</router-link>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      phonenumber: '',
      address: '',
      registrationMessage: ''
    };
  },
  methods: {
    async register() {
      try {
        const registrationData = {
          name: this.name,
          email: this.email,
          password: this.password,
          phonenumber: this.phonenumber,
          address: this.address
        };
        const response = await axios.post('http://localhost:5163/User/register', registrationData);
        if (response.status === 200) {
          this.registrationMessage = 'Registration successful!';
          setTimeout(() => {
            this.$router.push('client-login');
          }, 2000);
        }
      } catch (error) {
        this.registrationMessage = 'Registration failed. Please try again.';
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.register-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-image: url('@/assets/BG.jpg');
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

.register-container {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.register-box {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 400px;
}

.register-box h2 {
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
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.registration-message {
  margin-top: 10px;
  color: green;
}
</style>