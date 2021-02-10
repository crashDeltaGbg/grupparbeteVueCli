import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/character',
    name: 'Character',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Character.vue')
  },
  {
    path: '/markdown',
    name: 'Markdown',
    component: () => import('../components/Markdown.vue')
  },
  {
    path: '/choices',
    name: 'Choices',
    component: () => import('../views/Choices.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
