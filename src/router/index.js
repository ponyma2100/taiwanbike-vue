import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Route from '../views/Route.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/route',
    name: 'Route',
    component: Route
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
