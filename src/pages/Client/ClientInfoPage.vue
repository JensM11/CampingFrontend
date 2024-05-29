<template>
    <div>
      <h1>Client Profile</h1>
      <div v-if="user">
        <p><strong>ID:</strong> {{ user.Id }}</p>
        <p><strong>Name:</strong> {{ user.Name }}</p>
        <p><strong>Email:</strong> {{ user.Email }}</p>
        <p><strong>Address:</strong> {{ user.Address }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: null
      };
    },
    created() {
      this.fetchUserData();
    },
    methods: {
      async fetchUserData() {
        try {
          const email = this.$store.state.userEmail;
          const response = await axios.get(`http://localhost:5163/users/email/${email}`);
          this.user = response.data;
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    }
  };
  </script>