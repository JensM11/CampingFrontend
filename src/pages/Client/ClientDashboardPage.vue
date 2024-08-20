<template>
  <div class="client-dashboard">
    <h1>Client Dashboard</h1>
    <p>
      Welcome to the Client Dashboard, your go-to place for discovering a variety of camping sites available for your next adventure.
      This dashboard provides a comprehensive list of all available campsites, each presented in a detailed card format.
      You can easily view essential information such as the site's name, description, type, location, capacity, and price.
      Additionally, you can see all your booked campsites listed above the available ones.
    </p>
    
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="bookedCampsites.length > 0">
        <h2>Your Booked Campsites</h2>
        <div class="campsite-container">
          <div v-for="campsite in bookedCampsites" :key="campsite.id" class="campsite-card">
            <div class="campsite-info">
              <h3>{{ campsite.name }}</h3>
              <p><strong>Description:</strong> {{ campsite.description }}</p>
              <p><strong>Type:</strong> {{ campsite.type }}</p>
              <p><strong>Location:</strong> {{ campsite.location }}</p>
              <p><strong>Capacity:</strong> {{ campsite.capacity }}</p>
              <p><strong>Price:</strong> € {{ campsite.price }}</p>
              <p><strong>Available:</strong> {{ campsite.isAvailable }}</p>
              <p><strong>Booked by:</strong> {{ campsite.clientEmail }}</p>
            </div>
            <div class="owner-info">
              <h3>Owner Information</h3>
              <p><strong>Email:</strong> {{ campsite.ownerEmail }}</p>
              <p><strong>Name:</strong> {{ campsite.ownerName }}</p>
              <p><strong>Phone number:</strong> {{ campsite.ownerPhoneNumber }}</p>
              <p><strong>Organization:</strong> {{ campsite.ownerOrganization }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="availableCampsites.length > 0">
        <h2>All Campsites</h2>
        <div class="campsite-container">
          <div v-for="campsite in availableCampsites" :key="campsite.id" class="campsite-card">
            <div class="campsite-info">
              <h3>{{ campsite.name }}</h3>
              <p><strong>Description:</strong> {{ campsite.description }}</p>
              <p><strong>Type:</strong> {{ campsite.type }}</p>
              <p><strong>Location:</strong> {{ campsite.location }}</p>
              <p><strong>Capacity:</strong> {{ campsite.capacity }}</p>
              <p><strong>Price:</strong> € {{ campsite.price }}</p>
              <p><strong>Available:</strong> {{ campsite.isAvailable }}</p>
            </div>
            <div class="owner-info">
              <h3>Owner Information</h3>
              <p><strong>Email:</strong> {{ campsite.ownerEmail }}</p>
              <p><strong>Name:</strong> {{ campsite.ownerName }}</p>
              <p><strong>Phone number:</strong> {{ campsite.ownerPhoneNumber }}</p>
              <p><strong>Organization:</strong> {{ campsite.ownerOrganization }}</p>
            </div>
            <button v-if="campsite.isAvailable" @click="bookCampsite(campsite.id)">Book this camping spot</button>
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
      availableCampsites: [],
      bookedCampsites: []
    };
  },
  mounted() {
    this.getAvailableCampsites();
    this.getBookedCampsites();
  },
  methods: {
    async getAvailableCampsites() {
      try {
        this.loading = true;
        const response = await axios.get('http://localhost:5163/CampingSite/Available');
        this.availableCampsites = await Promise.all(
          response.data.map(async campsite => {
            try {
              const ownerResponse = await axios.get(`http://localhost:5163/owner/email/${campsite.ownerEmail}`);
              const ownerData = ownerResponse.data.result;

              campsite.ownerName = ownerData.name;
              campsite.ownerPhoneNumber = ownerData.phoneNumber;
              campsite.ownerOrganization = ownerData.organization;
            } catch (error) {
              console.error(`Error fetching owner information for ${campsite.name}:`, error.message);
            }
            return campsite;
          })
        );
      } catch (error) {
        console.error('Error fetching campsites:', error.message);
      } finally {
        this.loading = false;
      }
    },
    async getBookedCampsites() {
      try {
        this.loading = true;
        const response = await axios.get(`http://localhost:5163/CampingSite/booked/${this.$store.state.userEmail}`);
        this.bookedCampsites = await Promise.all(
          response.data.map(async campsite => {
            try {
              const ownerResponse = await axios.get(`http://localhost:5163/owner/email/${campsite.ownerEmail}`);
              const ownerData = ownerResponse.data.result;

              campsite.ownerName = ownerData.name;
              campsite.ownerPhoneNumber = ownerData.phoneNumber;
              campsite.ownerOrganization = ownerData.organization;
            } catch (error) {
              console.error(`Error fetching owner information for ${campsite.name}:`, error.message);
            }
            return campsite;
          })
        );
      } catch (error) {
        console.error('Error fetching booked campsites:', error.message);
      } finally {
        this.loading = false;
      }
    },
    async bookCampsite(campsiteId) {
      try {
        const clientEmail = this.$store.state.userEmail;
        const response = await axios.post(
          `http://localhost:5163/CampingSite/book/${campsiteId}`,
          { clientEmail }, 
          { headers: { 'Content-Type': 'application/json' } }
        );
        if (response.status === 200) {
          await this.getAvailableCampsites();
          await this.getBookedCampsites();
        } else {
          alert('Failed to book campsite.');
        }
      } catch (error) {
        console.error('Error booking campsite:', error.message);
        alert('Error booking campsite.');
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
    width: 600px; /* Increased the width to make cards wider */
    padding: 20px;
    margin: 10px;
    border: 1px solid green;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column; /* Ensure vertical stacking */
    text-align: left;
}

.campsite-info, .owner-info {
    margin-bottom: 10px;
}

.campsite-info {
    border-bottom: 2px solid green; /* Thin green line separating sections */
    padding-bottom: 10px;
    margin-bottom: 10px;
}

.owner-info h3 {
    margin-top: 0;
    font-size: 30px;
}

.campsite-info p, .owner-info p {
    margin: 5px 0;
    font-size: 18px;
}

button {
    padding: 10px;
    font-size: 18px;
    color: white;
    background-color: green;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>