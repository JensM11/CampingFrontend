import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/Home/HomePage.vue';
import AboutPage from '@/pages/Home/AboutPage.vue';
import ContactPage from '@/pages/Home/ContactPage.vue';
import OwnerLoginPage from '@/pages/Owner/OwnerLoginPage.vue';
import ClientLoginPage from '@/pages/Client/ClientLoginPage.vue';
import ClientRegisterPage from '@/pages/Client/ClientRegisterPage.vue';
import OwnerRegisterPage from '@/pages/Owner/OwnerRegisterPage.vue';
import OwnerDashboardPage from '@/pages/Owner/OwnerDashboardPage.vue';
import OwnerSpots from '@/pages/Owner/OwnerSpots.vue';
import AddSpots from '@/pages/Owner/AddSpots.vue';
import OwnerInfoPage from '@/pages/Owner/OwnerInfoPage.vue';
import ClientInfoPage from '@/pages/Client/ClientInfoPage.vue';
import ClientDashboardPage from '@/pages/Client/ClientDashboardPage.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage
    },
    {
      path: '/owner-login',
      name: 'ownerLogin',
      component: OwnerLoginPage
    },
    {
      path: '/client-login',
      name: 'clientLogin',
      component: ClientLoginPage
    },
    {
      path: '/client-register',
      name: 'clientRegister',
      component: ClientRegisterPage
    },
    {
      path: '/owner-register',
      name: 'ownerRegister',
      component: OwnerRegisterPage
    },
    {
      path: '/owner-dashboard',
      name: 'ownerDashboard',
      component: OwnerDashboardPage
    },
    {
      path: '/owner-spots',
      name: 'ownerSpots',
      component: OwnerSpots
    },
    {
      path: '/owner-addspots',
      name: 'owneraddspots',
      component: AddSpots
    },
    {
      path: '/owner-info',
      name: 'ownerInfo',
      component: OwnerInfoPage
    },
    {
      path: '/client-info',
      name: 'clientinfo',
      component: ClientInfoPage
    },
    {
      path: '/client-dashboard',
      name: 'clientdashboard',
      component: ClientDashboardPage
    }
  ]
});