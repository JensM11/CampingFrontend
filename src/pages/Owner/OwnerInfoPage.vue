<template>
  <div class="info-container">
    <h1>Owner Information</h1>
    <div v-if="owner" class="info">
      <p><strong>Name:</strong> {{ owner.name }}</p>
      <p><strong>Email:</strong> {{ owner.email }}</p>
      <!-- Add other fields here as needed -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ownerInfo",
  data() {
    return {
      owner: null,
    };
  },
  mounted() {
    this.getOwnerInfo();
  },
  methods: {
    async getOwnerInfo() {
      try {
        console.log('Fetching owner information...');
        //Als ik bij de login gewoon de email kon opslaan dan had dit ook gewerkt. Ik heb geen tijd meer nu.
        //Na een hele dag werken sloeg da Database ook op tilt. 
        //System.AggregateException: One or more errors occurred. (Maximum number of transactions reached)
        //---> LiteDB.LiteException: Maximum number of transactions reached
        
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
</style>