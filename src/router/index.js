import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dice from '../views/Dice.vue'
import Introduction from '../views/Introduction.vue'
import Choices from '../views/Choices.vue'
import Backstory from '../views/Backstory.vue'
import About from '../views/About.vue'
import Character from '../views/Character.vue'
import Story from '../views/Story.vue'

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
    component: About
  },
  {
    path: '/character',
    name: 'Character',
    component: Character
  },
  {
    path: '/story',
    name: 'Story',
    component: Story
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
