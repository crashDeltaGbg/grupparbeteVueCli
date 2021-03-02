import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Introduction from '../views/Introduction.vue'
import Character from '../views/Character.vue'
import Story from '../views/Story.vue'
import LoadGame from '../views/LoadGame.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  },
  {
    path: '/LoadGame',
    name: 'Load Game',
    component: LoadGame
  }
]

const router = new VueRouter({
  routes
})

export default router
