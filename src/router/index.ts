import { createRouter, createWebHistory } from 'vue-router';
import PrivacyPolicy from '../views/PrivacyPolicy.vue';
import MainView from '../views/MainView.vue'; // Import the new main view

// We need a component for the main view (calendar). 
// For now, let's assume App.vue's main content will be moved later or App.vue itself is the layout.
// Placeholder for the main view component import - will be needed soon.
// import MainView from '../views/MainView.vue'; 

const routes = [
  {
    path: '/',
    name: 'Home', 
    redirect: '/calendar' // Redirect root to the calendar view
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: MainView // Assign MainView to the calendar path
  },
  {
    path: '/privacy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  // We need a route for the main calendar view itself, let's define '/calendar'
  // {
  //   path: '/calendar',
  //   name: 'Calendar',
  //   component: MainView // This needs to be created
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 