import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue';
import EulaPage from '../views/EulaPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/eula',
    name: 'EULA',
    component: EulaPage
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
