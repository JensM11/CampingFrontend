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
      <div v-if="campsites && campsites.length > 0">
        <h2>Your Campsites</h2>
        <div class="campsite-container">
          <div v-for="campsite in campsites" :key="campsite.id" class="campsite-card">
            <h3>{{ campsite.name }}</h3>
            <p><strong>Description:</strong> {{ campsite.description }}</p>
            <p><strong>Type:</strong> {{ campsite.type }}</p>
            <p><strong>Location:</strong> {{ campsite.location }}</p>
            <p><strong>Capacity:</strong> {{ campsite.capacity }}</p>
            <p><strong>Price:</strong> € {{ campsite.price }}</p>
            <p><strong>Available:</strong> {{ campsite.isAvailable }}</p>
            <p><strong>ID:</strong> {{ campsite.id }}</p>
            <p><strong>Email of Owner:</strong> {{ campsite.ownerEmail }}</p>
            <button @click="deleteCampsite(campsite.name)">Delete</button>
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
      campsites: [],
      showCreate: false,
      newCampsite: {
        name: '',
        description: '',
        type: '',
        location: '',
        capacity: null,
        price: null,
        isavailable: true
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

        this.campsites = Array.isArray(response.data) ? response.data : [];

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
          this.campsites = this.campsites.filter(campsite => campsite.name !== campsiteName);
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
      this.showCreate = true;
    },
    hideCreateForm() {
      this.showCreate = false;
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
            this.campsites.push(newCampsite);
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
    }
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
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-buttons button:hover {
  background-color: #0056b3;
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
  border: 2px solid #008000;
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

.campsite-card button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 18px;
}

.campsite-card button:hover {
  background-color: #0056b3;
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