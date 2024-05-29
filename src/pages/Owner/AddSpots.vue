<template>
    <div class="add-spot">
      <h1>Add New Camping Spot</h1>
      <form @submit.prevent="addSpot">
        <div class="form-group">
          <label for="name">Spot Name</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="location">Location</label>
          <input type="text" id="location" v-model="location" required />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="description" required></textarea>
        </div>
        <button type="submit">Add Spot</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: '',
        location: '',
        description: ''
      };
    },
    methods: {
      async addSpot() {
        try {
          await axios.post('http://localhost:5049/api/CampingSpots', {
            name: this.name,
            location: this.location,
            description: this.description
          });
          this.$router.push('/owner/spots');
        } catch (error) {
          console.error('Error adding spot:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .add-spot {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #333;
  }
  
  .form-group input,
  .form-group textarea {
    width: calc(100% - 24px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>