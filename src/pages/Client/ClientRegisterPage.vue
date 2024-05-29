<template>
  <div class="registration-container">
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
.registration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
}

form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
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