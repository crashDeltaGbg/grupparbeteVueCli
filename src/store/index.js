import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    character: {},
    diceValue: Number
  },
  mutations: {
    saveCharacter(state, obj) {
      state.character = obj
      localStorage.character = JSON.stringify(obj)
    },
    updateChar(state, obj) {
      state.character = obj
    },
    roll(state) {
      state.diceValue = Math.floor(Math.random() * 20)
    }
  },
  actions: {
    roll: context => {
      context.commit('roll')
    }
  },
  modules: {}
})
