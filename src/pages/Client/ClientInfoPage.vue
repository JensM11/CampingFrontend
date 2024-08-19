<template>
  <div class="info-container">
    <h1>Your Information</h1>
    <div v-if="client" class="info">
      <p><strong>ID:</strong> {{ client.id }}</p>
      <p><strong>Name:</strong> {{ client.name }}</p>
      <p><strong>Email:</strong> {{ client.email }}</p>
      <p><strong>Phone number:</strong> {{ client.phoneNumber }}</p>
      <p><strong>Address:</strong> {{ client.address }}</p>
      <button @click="showEditForm">Edit Information</button>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>

    <!-- Overlay form for editing owner information -->
    <div v-if="showForm" class="overlay">
      <div class="edit-form">
        <h2>Edit Client Information</h2>
        <form @submit.prevent="updateClientInfo">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" v-model="editClient.name" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" v-model="editClient.email" required />
          </div>
          <div class="form-group">
            <label for="phoneNumber">Phone Number:</label>
            <input type="text" v-model="editClient.phoneNumber" required />
          </div>
          <div class="form-group">
            <label for="address">Address:</label>
            <input type="text" v-model="editClient.address" required />
          </div>
          <div class="form-group">
            <button type="submit">Save Changes</button>
            <button type="button" @click="hideEditForm">Cancel</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "clientInfo",
  data() {
    return {
      client: null,
      showForm: false,
      editClient: {},
    };
  },
  mounted() {
    this.getClientInfo();
  },
  methods: {
    async getClientInfo() {
      try {
        console.log('Fetching client information...');    
        const response = await this.$axios.get(`http://localhost:5163/user/email/${this.$store.state.userEmail}`);
        console.log('Response:', response);
        if (response.data && response.data.result) {
          this.client = response.data.result;
          console.log('Client data:', this.client);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching client information:", error);
      }
    },
    showEditForm() {
      this.editClient = { 
        id: this.client.id,
        name: this.client.name,
        email: this.client.email,
        phoneNumber: this.client.phoneNumber,
        address: this.client.address,
        password: this.client.password
       }; // Populate the form with the current owner information
      this.showForm = true;
    },
    hideEditForm() {
    // Hide the form by setting showForm to false
    this.showForm = false;
  },
    async updateClientInfo() {
      try {
        const response = await this.$axios.put('http://localhost:5163/user/update', this.editClient);
        console.log('Update response:', response);
        if (response.status === 200) {
          this.client = response.data; // Update the owner data displayed
          this.hideEditForm(); // Close the form after successful update
        } else {
          console.error("Failed to update client information");
        }
      } catch (error) {
        console.error("Error updating client information:", error);
      }
    },
  },
};
</script>

<style scoped>
.info-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.info {
  background-color: #f9f9f9;
  border-radius: 5px;
  padding: 20px;
  margin-top: 20px;
}

.info p {
  margin: 10px 0;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

.overlay {
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

.edit-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group button {
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-group button[type="button"] {
  background-color: #ccc;
}

.form-group button:hover {
  background-color: #0056b3;
}

.form-group button[type="button"]:hover {
  background-color: #999;
}
</style>