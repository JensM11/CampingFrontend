<template>
    <div class="owner-spots">
      <h1>My Camping Spots</h1>
      <button @click="navigateToAddSpot">Add New Camping Spot</button>
      <div v-if="spots.length">
        <ul>
          <li v-for="spot in spots" :key="spot.id">{{ spot.name }}</li>
        </ul>
      </div>
      <div v-else>
        <p>No camping spots available.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        spots: []
      };
    },
    created() {
      this.fetchSpots();
    },
    methods: {
      async fetchSpots() {
        try {
          const response = await axios.get('http://localhost:5163/api/CampingSpots');
          this.spots = response.data;
        } catch (error) {
          console.error('Error fetching spots:', error);
        }
      },
      navigateToAddSpot() {
        this.$router.push('/owner/add-spot');
      }
    }
  };
  </script>
  
  <style scoped>
  .owner-spots {
    text-align: center;
    padding: 20px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>