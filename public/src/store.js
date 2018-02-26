import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    set (state, { key, value }) {
      state[key] = value
    }
  }
})

export default store
