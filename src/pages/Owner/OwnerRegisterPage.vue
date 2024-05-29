<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Register as Owner</h2>
      <form @submit.prevent="register">
        <div>
          <label for="Name">Name*</label>
          <input type="text" v-model="name" required />
        </div>
        <div>
          <label for="password">Password*</label>
          <input type="password" v-model="password" required />
        </div>
        <div>
          <label for="email">Email*</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="phonenumber">Phone*</label>
          <input type="text" v-model="phonenumber" required />
        </div>
        <div>
          <label for="address">Address*</label>
          <input type="text" v-model="address" required />
        </div>
        <div>
          <label for="organization">Organization</label>
          <input type="text" v-model="organization" />
        </div>
        <button type="submit">Register</button>
        <div v-if="message" :class="{ 'message-error': !isSuccess, 'message-success': isSuccess }">{{ message }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      password: '',
      email: '',
      phonenumber: '',
      address: '',
      organization: '',
      message: '',
      isSuccess: false
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
          address: this.address,
          organization: this.organization
        };
        const response = await axios.post('http://localhost:5163/Owner/register', registrationData);
        if (response.status === 200) {
          this.registrationMessage = 'Registration successful!';
          setTimeout(() => {
            this.$router.push('/owner-login');
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
/* Add some styling to center the form and make it look better */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-box {
  background: white;
  padding: 20px;
  border: 2px solid green;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.register-box h2 {
  text-align: center;
  margin-bottom: 20px;
}

.register-box div {
  margin-bottom: 15px;
}

.register-box label {
  display: block;
  margin-bottom: 5px;
}

.register-box input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.register-box button {
  width: 100%;
  padding: 10px;
  background: green;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.message-success {
  margin-top: 15px;
  text-align: center;
  color: green;
}

.message-error {
  margin-top: 15px;
  text-align: center;
  color: red;
}
</style>