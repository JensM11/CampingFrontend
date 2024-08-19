<template>
  <div class="info-container">
    <h1>Your Information</h1>
    <div v-if="owner" class="info">
      <p><strong>ID:</strong> {{ owner.id }}</p>
      <p><strong>Name:</strong> {{ owner.name }}</p>
      <p><strong>Email:</strong> {{ owner.email }}</p>
      <p><strong>Phone number:</strong> {{ owner.phoneNumber }}</p>
      <p><strong>Address:</strong> {{ owner.address }}</p>
      <p><strong>Organization:</strong> {{ owner.organization }}</p>
      <button @click="showEditForm">Edit Information</button>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>

    <!-- Overlay form for editing owner information -->
    <div v-if="showForm" class="overlay">
      <div class="edit-form">
        <h2>Edit Owner Information</h2>
        <form @submit.prevent="updateOwnerInfo">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" v-model="editOwner.name" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" v-model="editOwner.email" required />
          </div>
          <div class="form-group">
            <label for="phoneNumber">Phone Number:</label>
            <input type="text" v-model="editOwner.phoneNumber" required />
          </div>
          <div class="form-group">
            <label for="address">Address:</label>
            <input type="text" v-model="editOwner.address" required />
          </div>
          <div class="form-group">
            <label for="organization">Organization:</label>
            <input type="text" v-model="editOwner.organization" required />
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
  name: "ownerInfo",
  data() {
    return {
      owner: null,
      showForm: false,
      editOwner: {},
    };
  },
  mounted() {
    this.getOwnerInfo();
  },
  methods: {
    async getOwnerInfo() {
      try {
        console.log('Fetching owner information...');    
        const response = await this.$axios.get(`http://localhost:5163/owner/email/${this.$store.state.userEmail}`);
        console.log('Response:', response);
        if (response.data && response.data.result) {
          this.owner = response.data.result;
          console.log('Owner data:', this.owner);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching owner information:", error);
      }
    },
    showEditForm() {
      this.editOwner = { 
        id: this.owner.id,
        name: this.owner.name,
        email: this.owner.email,
        phoneNumber: this.owner.phoneNumber,
        address: this.owner.address,
        organization: this.owner.organization,
        password: this.owner.password
       }; // Populate the form with the current owner information
      this.showForm = true;
    },
    hideEditForm() {
    // Hide the form by setting showForm to false
    this.showForm = false;
  },
    async updateOwnerInfo() {
      try {
        const response = await this.$axios.put('http://localhost:5163/owner/update', this.editOwner);
        console.log('Update response:', response);
        if (response.status === 200) {
          this.owner = response.data; // Update the owner data displayed
          this.hideEditForm(); // Close the form after successful update
        } else {
          console.error("Failed to update owner information");
        }
      } catch (error) {
        console.error("Error updating owner information:", error);
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