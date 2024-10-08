import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue';
import EulaPage from '../views/EulaPage.vue';
import SavedWorksheetsPage from '../views/SavedWorksheetsPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home/:id?',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/eula',
    name: 'EULA',
    component: EulaPage
  },
  {
    path: '/saved-worksheets',
    name: 'Saved Worksheets',
    component: SavedWorksheetsPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const eulaAccepted = localStorage.getItem('eulaAccepted');
  if (eulaAccepted || to.path === '/eula') {
    next();
  } else {
    next('/eula');
  }
});

export default router
