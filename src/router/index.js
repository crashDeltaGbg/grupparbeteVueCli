import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dice from '../views/Dice.vue'
import Introduction from '../views/Introduction.vue'
import Choices from '../views/Choices.vue'
import Backstory from '../views/Backstory.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dice',
    name: 'Dice',
    component: Dice
  },
  {
    path: '/choices',
    name: 'Choices',
    component: Choices
  },
  {
    path: '/backstory',
    name: 'Backstory',
    component: Backstory
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
    path: '/story',
    name: 'Story',
    component: () => import('../views/Story.vue')
  },
  {
    path: '/introduction',
    name: 'Introduction',
    component: Introduction
  }
]

const router = new VueRouter({
  routes
})

export default router
