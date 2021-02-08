import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    character: {},
  },
  mutations: {
    saveCharacter(state, obj) {
      state.character = obj
      localStorage.character = JSON.stringify(obj)
    },
  },
  actions: {},
  modules: {},
})
