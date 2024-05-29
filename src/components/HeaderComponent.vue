<template>
  <div class="header">
    <router-link to="/" class="logo">
      <img src="@/assets/logo.png" alt="Logo" />
    </router-link>
    <nav class="menu">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About Us</router-link>
      <router-link to="/contact">Contact</router-link>
    </nav>
    <!-- Dit werkte even, beste moment van de dag, toen ging het ineens stuk terwijl ik de email ook wou bijhouden.-->
    <div class="auth-buttons">
      <template v-if="userRole === 'client'">
        <router-link to="/client-dashboard">Dashboard</router-link>
        <router-link to="/client-info">My Profile</router-link>
        <button @click="logout">Logout</button>
      </template>
      <template v-if="userRole === 'owner'">
        <router-link to="/owner-dashboard">Dashboard</router-link>
        <router-link to="/owner-info">My Profile</router-link>
        <button @click="logout">Logout</button>
      </template>
      <template v-if="!userRole">
        <router-link to="/client-login">Client Login</router-link>
        <router-link to="/owner-login">Owner Login</router-link>
      </template>
    </div>
  </div>
</template>



<script>

//Ik heb hier zo veel geprobeerd dat ik niet eens goed meer weet wat er staat.

import { mapState } from 'vuex';

export default {
  name: 'HeaderComponent',
  computed: {
    ...mapState(['userRole'])
  },
  methods: {
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: green;
  color: white;
}

.logo img {
  height: 60px;
}

.menu {
  display: flex;
  gap: 20px; /* Add space between menu items */
  margin-left: 300px;
}

.menu a {
  color: white;
  text-decoration: none;
  font-size: 24px;
}

.auth-buttons {
  display: flex;
  gap: 10px; /* Add space between auth buttons */
}

.auth-buttons a, .auth-buttons button {
  color: white;
  text-decoration: none;
  font-size: 24px;
  padding: 5px 10px;
}

.auth-buttons button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>