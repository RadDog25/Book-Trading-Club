import Vue from 'vue'
import Vuex from 'vuex'
import Book from './Book'
import User from './User'
import Api from './Api'

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
    },
    isLoading: false
  },
  mutations: {
    set (state, { key, value }) {
      state[key] = value
    },
    setUser (state, userData) {
      state.user = new User(userData)
    },
    startLoading (state) {
      state.isLoading = true
      console.log('started')
    },
    stopLoading (state) {
      console.log('stopped')
      state.isLoading = false
    },
    setSearchedBooks (state, booksData) {
      state.searchedBooks = booksData.map(bookData => new Book(bookData))
    },
    setAvailableBooks (state, booksData) {
      state.availableBooks = booksData.map(bookData => new Book(bookData))
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
    getUser ({ commit }) {
      commit('startLoading')
      Api.getUserData()
        .then(userData => {
          commit('setUser', userData)
        })
        .finally(() => {
          commit('stopLoading')
        })
    },
    getSearchedBooks ({ commit }, searchText) {
      commit('startLoading')
      Api.getSearchedBooksData(searchText)
        .then(searchedBooksData => {
          commit('setSearchedBooks', searchedBooksData)
        })
        .finally(() => {
          commit('stopLoading')
        })
    },
    getAvailableBooks ({ commit }, searchText) {
      commit('startLoading')
      Api.getAvailableBooksData(searchText)
        .then(availableBooksData => {
          commit('setAvailableBooks', availableBooksData)
        })
        .finally(() => {
          commit('stopLoading')
        })
    },
    updateAvatar ({ commit }, index) {
      commit('startLoading')
      Api.updateAvatar(index)
        .then(userData => commit('setUser', userData))
        .finally(() => {
          commit('stopLoading')
        })
    },
    deleteBook ({ commit }, book) {
      commit('startLoading')
      Api.deleteBook(book)
        .then(userData => commit('setUser', userData))
        .finally(() => {
          commit('stopLoading')
        })
    },
    logout ({ commit, state }, router) {
      router.push('login')
      window.setCookie('token', null)
      state.user = null
    }
  }
})

export default store
