import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '../store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      layout: 'dashboard',
      auth: true,
    }
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: () => import('../views/Transactions.vue'),
    meta: {
      layout: 'dashboard',
      auth: true,
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue'),
    meta: {
      layout: 'dashboard',
      auth: true,
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false,
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiredAuth = to.meta.auth;

  if(requiredAuth && !store.getters['auth/isAuthentificated']) {
    next('/auth');
  }
  else {
    next();
  }
})

export default router
