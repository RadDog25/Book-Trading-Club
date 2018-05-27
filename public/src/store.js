import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    searchedBooks: [],
    availableBooks: [],
    confirmation: {
      isActive: false,
      text: ''
    }
  },
  mutations: {
    set (state, { key, value }) {
      state[key] = value
    }
  },
  actions: {
    openConfirmation ({ commit, state }, text) {
      state.confirmation = {
        isActive: true,
        text
      }
    },
    closeConfirmation ({ commit, state }) {
      state.confirmation.isActive = false
    },
    getUser ({ commit, state }) {
      return new Promise((resolve, reject) => {
        window.axios.get('/api/user')
          .then(response => {
            state.user = response.data
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getSearchedBooks ({ commit, state }, searchText) {
      window.axios.get('/api/books', {
        params: {
          searchText
        }
      })
        .then(response => {
          state.searchedBooks = response.data
        })
    },
    getAvailableBooks ({ commit, state }, searchText) {
      window.axios.get('/api/availablebooks', {
        params: {
          searchText
        }
      })
        .then(response => {
          state.availableBooks = response.data
        })
    }
  }
})

export default store
