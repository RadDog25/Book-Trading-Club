import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    books: []
  },
  mutations: {
    set (state, { key, value }) {
      state[key] = value
    }
  },
  actions: {
    searchBooks ({ commit, state }, searchText) {
      window.axios.get('/api/books', {
        params: {
          searchText
        }
      })
        .then(response => {
          state.books = response.data
        })
    }
  }
})

export default store
