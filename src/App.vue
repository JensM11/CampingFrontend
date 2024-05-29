<template>
  <div id="app">
    <HeaderComponent />
    <div class="content-wrapper">
      <router-view />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

import Vue from 'vue';
import axios from 'axios';


Vue.prototype.$axios = axios;

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  }
};
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

#app {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
