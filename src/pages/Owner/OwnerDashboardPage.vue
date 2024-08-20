<template>
  <div class="owner-dashboard">
    <h1>Owner Dashboard</h1>
    <p>
      Welcome to the Owner Dashboard, your central hub for managing all your camping sites efficiently.
      This dashboard provides easy access to essential tools and information, allowing you to keep your camping business running smoothly.
      Here, you can view a comprehensive list of all your camping sites, each presented in a detailed card format displaying crucial information
      such as the site's name, description, type, location, capacity, and price.
      This feature enables you to monitor and manage your existing camping sites at a glance.
      Additionally, adding new camping sites is seamless; simply click the "Add New Campsite" button to bring up a form overlay
      where you can enter all the necessary details for your new site, which will then be added to your list and displayed on the dashboard immediately.
      The dashboard also provides quick access to your personal information page through the "Owner Info" button, where you can view and update your profile details.
      For your convenience and security, the "Logout" button allows you to easily sign out of your account, ensuring that your account remains secure.
      The Owner Dashboard is designed to streamline your workflow and enhance your management capabilities, allowing you to oversee all aspects of your camping sites,
      from creation to maintenance, all in one place.
    </p>
    <div class="action-buttons">
      <button @click="showCreateForm">Add New Campsite</button>
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="bookedCampsites.length > 0">
        <h2>Booked Campsites</h2>
        <div class="campsite-container">
          <div v-for="campsite in bookedCampsites" :key="campsite.id" class="campsite-card">
            <div class="campsite-info">
              <p><strong>Name:</strong> {{ campsite.name }}</p>
              <p><strong>Description:</strong> {{ campsite.description }}</p>
              <p><strong>Type:</strong> {{ campsite.type }}</p>
              <p><strong>Location:</strong> {{ campsite.location }}</p>
              <p><strong>Capacity:</strong> {{ campsite.capacity }}</p>
              <p><strong>Price:</strong> ${{ campsite.price }}</p>
              <p><strong>Status:</strong> {{ campsite.isAvailable ? 'Available' : 'Booked' }}</p>
            </div>
            <div class="owner-info">
              <h3>Client Information</h3>
              <p><strong>Client Email:</strong> {{ campsite.clientEmail }}</p>
              <p><strong>Client Name:</strong> {{ campsite.clientName || 'N/A' }}</p>
              <p><strong>Client Phone:</strong> {{ campsite.clientPhone || 'N/A' }}</p>
            </div>
            <button class="delete-button" @click="deleteCampsite(campsite.name)">Delete</button>
          </div>
        </div>
      </div>

      <div v-if="availableCampsites.length > 0">
        <h2>Available Campsites</h2>
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
            <div class="client-info">
              <h3>Client Information</h3>
              <p>No client information</p>
            </div>
            <button class="delete-button" @click="deleteCampsite(campsite.name)">Delete</button>
          </div>
        </div>
      </div>

      <div v-else>
        <p>No campsites found.</p>
      </div>
    </div>
    <div class="overlay" v-if="showCreate">
      <div class="create-form">
        <h2>Create New Campsite</h2>
        <form @submit.prevent="createCampsite">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" v-model="newCampsite.name" required />
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <input type="text" v-model="newCampsite.description" required />
          </div>
          <div class="form-group">
            <label for="type">Type:</label>
            <input type="text" v-model="newCampsite.type" required />
          </div>
          <div class="form-group">
            <label for="location">Location:</label>
            <input type="text" v-model="newCampsite.location" required />
          </div>
          <div class="form-group">
            <label for="capacity">Capacity:</label>
            <input type="number" v-model="newCampsite.capacity" required />
          </div>
          <div class="form-group">
            <label for="price">Price:</label>
            <input type="number" v-model="newCampsite.price" required />
          </div>
          <div class="form-group">
            <button type="submit">Create</button>
            <button @click="hideCreateForm">Cancel</button>
          </div>
        </form>
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
      bookedCampsites: [],
      showCreate: false,
      newCampsite: {
        name: '',
        description: '',
        type: '',
        location: '',
        capacity: null,
        price: null,
        isavailable: true,
        clientEmail: ''
      }
    };
  },
  mounted() {
    this.getCampsites();
  },
  methods: {
    async getCampsites() {
      try {
        this.loading = true;
        const response = await axios.get(`http://localhost:5163/CampingSite/${this.$store.state.userEmail}`);
        console.log('API response:', response);

        const campsites = response.data;

        this.availableCampsites = campsites.availableSites;

        this.bookedCampsites = await Promise.all(
          campsites.bookedSites.map(async (campsite) => {
            if (campsite.clientEmail) {
              try {
                const clientResponse = await axios.get(`http://localhost:5163/user/email/${campsite.clientEmail}`);
                const clientData = clientResponse.data.result;
                campsite.clientName = clientData.name;
                campsite.clientPhone = clientData.phoneNumber;
              } catch (error) {
                console.error(`Error fetching client information for ${campsite.name}:`, error.message);
              }
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
    async deleteCampsite(campsiteName) {
      try {
        const response = await axios.delete(`http://localhost:5163/CampingSite/${campsiteName}`);
        if (response.status === 204) {
          // Remove the campsite from the list
          this.availableCampsites = this.availableCampsites.filter(campsite => campsite.name !== campsiteName);
          this.bookedCampsites = this.bookedCampsites.filter(campsite => campsite.name !== campsiteName);
          console.log('Campsite deleted successfully');
          await this.getCampsites();
        } else {
          console.error('Failed to delete campsite');
        }
      } catch (error) {
        console.error('Error deleting campsite:', error.message);
      }
    },
    showCreateForm() {
      this.resetForm();
      this.showCreate = true;
    },
    hideCreateForm() {
      this.showCreate = false;
    },
    resetForm() {
      this.newCampsite = {
        name: '',
        description: '',
        type: '',
        location: '',
        capacity: null,
        price: null,
        isavailable: true,
        clientEmail: ''
      };
    },
    async createCampsite() {
      console.log('Creating campsite with:', this.newCampsite);
      try {
        this.newCampsite.ownerEmail = this.$store.state.userEmail;
        const response = await axios.post('http://localhost:5163/CampingSite', this.newCampsite);
        console.log('API response:', response);


        if (response.status === 201) {
        // Ensure response.data is correct
          const newCampsite = response.data;
          console.log('New campsite created:', newCampsite);

          if (newCampsite && newCampsite.id) {
            this.availableCampsites.push(newCampsite);
            console.log('Campsite created successfully');
            this.hideCreateForm();
          } else {
            console.error('New campsite does not have an id');
          }
        } else {
          console.error('Failed to create campsite');
        }
      } catch (error) {
        console.error('Error creating campsite:', error.message);
      }
    },
    goToOwnerInfo() {
      this.$router.push('/owner-info');
    },
    logout() {
      this.$store.commit('clearUserRole');
      this.$router.push('/').catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          throw err;
        }
      });
    },
  }
};
</script>


<style scoped>
.owner-dashboard {
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

.action-buttons {
    margin-bottom: 20px;
}

.action-buttons button {
    display: block;
    width: 200px;
    margin: 10px auto;
    padding: 10px;
    font-size: 30px;
    border: 2px solid green;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.action-buttons button:hover {
    background-color: green;
    color: white;
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

.campsite-info, .client-info {
    margin-bottom: 10px;
}

.campsite-info {
    border-bottom: 2px solid green; /* Thin green line separating sections */
    padding-bottom: 10px;
    margin-bottom: 10px;
}

.client-info h3 {
    margin-top: 0;
    font-size: 30px;
}

.campsite-info p, .client-info p {
    margin: 5px 0;
    font-size: 20px;
}

.overlay {
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.delete-button {
    padding: 15px 20px;
    font-size: 18px;
    border: 2px solid green;
    border-radius: 8px;
    background-color: white;
    color: green;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    text-align: center;
    display: inline-block;
    margin-top: 10px;
}

.delete-button:hover {
    background-color: green;
    color: white;
}

.create-form {
    z-index: 1001;
    background-color: green;
    color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: left;
    width: 400px;
}

.create-form h2 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 30px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-weight: bold;
    font-size: 20px;
}

.form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 18px;
}

.form-group button {
    padding: 10px;
    font-size: 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.form-group button[type="submit"] {
    background-color: #007bff;
    color: #fff;
}

.form-group button[type="button"] {
    background-color: #ccc;
    margin-left: 10px;
}

.form-group button[type="submit"]:hover,
.form-group button[type="button"]:hover {
    background-color: #0056b3;
}
</style>