import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userEmail: null,
    userRole: null
  },
  mutations: {
    setUserEmail(state, email) {
      state.userEmail = email;
    },
    setUserRole(state, role) {
      state.userRole = role;
    },
    clearUser(state) {
      state.userEmail = null;
      state.userRole = null;
    }
  },
  actions: {
    login({ commit }, { email, role }) {
      commit('setUserEmail', email);
      commit('setUserRole', role);
    },
    logout({ commit }) {
      commit('clearUser');
    }
  },
  getters: {
    getUserEmail: state => state.userEmail,
    getUserRole: state => state.userRole
  }
});