import Vue from 'vue'
import Vuex from 'vuex'
import Book from './Book'
import User from './User'

Vue.use(Vuex)

const inactiveModal = {
  isActive: false,
  text: '',
  book: {}
}

const initialModalItems = {
  successModal: inactiveModal,
  warningModal: inactiveModal,
  bookInfoModal: inactiveModal
}

const store = new Vuex.Store({
  state: {
    user: null,
    searchedBooks: [],
    availableBooks: [],
    modal: {
      items: initialModalItems
    }
  },
  mutations: {
    set (state, { key, value }) {
      state[key] = value
    }
  },
  actions: {
    closeModal ({ commit, state }) {
      state.modal.items = window.deepClone(initialModalItems)
    },
    openModal ({ commit, state }, { modalName, text, book }) {
      const newModal = window.deepClone(state.modal)
      newModal.items[modalName] = {
        isActive: true,
        text,
        book
      }

      state.modal = newModal
    },
    getUser ({ commit, state }) {
      return new Promise((resolve, reject) => {
        window.axios.get('/api/user')
          .then(response => {
            state.user = new User(response.data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getSearchedBooks ({ commit, state }, searchText) {
      console.log(searchText)
      window.axios.get('/api/books', {
        params: {
          searchText
        }
      })
        .then(response => {
          console.log(response)
          state.searchedBooks = response.data.map(book => new Book(book))
        })
    },
    getAvailableBooks ({ commit, state }, searchText) {
      window.axios.get('/api/availablebooks', {
        params: {
          searchText
        }
      })
        .then(response => {
          state.availableBooks = response.data.map(book => new Book(book))
        })
    }
  }
})

export default store
