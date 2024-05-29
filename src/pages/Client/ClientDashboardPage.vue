<template>
    <div class="client-dashboard">
      <h1>Client Dashboard</h1>
      <p>
        Welcome to the Client Dashboard, your go-to place for discovering a variety of camping sites available for your next adventure.
        This dashboard provides a comprehensive list of all available campsites, each presented in a detailed card format.
        You can easily view essential information such as the site's name, description, type, location, capacity, and price.
        This feature allows you to explore and find the perfect campsite that meets your needs and preferences.
        Enjoy browsing through the options and planning your next great outdoor experience with ease and convenience.
      </p>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-if="campsites.length > 0">
          <h2>All Campsites</h2>
          <div class="campsite-container">
            <div v-for="campsite in campsites" :key="campsite.id" class="campsite-card">
              <h3>{{ campsite.name }}</h3>
              <p><strong>Description:</strong> {{ campsite.description }}</p>
              <p><strong>Type:</strong> {{ campsite.type }}</p>
              <p><strong>Location:</strong> {{ campsite.location }}</p>
              <p><strong>Capacity:</strong> {{ campsite.capacity }}</p>
              <p><strong>Price:</strong> {{ campsite.price }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No campsites found.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        loading: false,
        campsites: []
      };
    },
    mounted() {
      this.getCampsites();
    },
    methods: {
      async getCampsites() {
        try {
          this.loading = true;
          const response = await axios.get('http://localhost:5163/CampingSite');
          this.campsites = response.data.result;
        } catch (error) {
          console.error('Error fetching campsites:', error.message);
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .client-dashboard {
    padding: 20px;
    text-align: center;
  }
  
  h1 {
    font-size: 36px;
  }
  
  p {
    font-size: 22px;
    margin: 20px 0;
  }
  
  .campsite-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .campsite-card {
    width: 300px;
    padding: 20px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: left;
  }
  
  .campsite-card h3 {
    margin-top: 0;
    font-size: 30px;
  }
  
  .campsite-card p {
    margin: 5px 0;
    font-size: 20px;
  }
  </style>