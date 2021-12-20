import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      layout: 'dashboard'
    }
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: () => import('../views/Transactions.vue'),
    meta: {
      layout: 'dashboard'
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue'),
    meta: {
      layout: 'dashboard'
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
