import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Guideline from '../views/Guideline.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/guideline',
    name: 'Guideline',
    component: Guideline
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
