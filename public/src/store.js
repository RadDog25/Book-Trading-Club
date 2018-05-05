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
    getUser ({ commit, state }) {
      return new Promise((resolve, reject) => {
        window.axios.get('/api/user')
          .then(response => {
            state.user = response.data
            console.log('check passed')
            resolve()
          })
          .catch(error => {
            console.log('check failed')
            reject(error)
          })
      })
    },
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
