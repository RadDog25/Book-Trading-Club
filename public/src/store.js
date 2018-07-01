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
    }
  },
  mutations: {
    set (state, { key, value }) {
      state[key] = value
    },
    setUser (state, userData) {
      state.user = new User(userData)
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
      Api.getUserData()
        .then(userData => commit('setUser', userData))
    },
    getSearchedBooks ({ commit, state }, searchText) {
      Api.getSearchedBooksData(searchText)
        .then(searchedBooksData => {
          state.searchedBooks = searchedBooksData.map(bookData => new Book(bookData))
        })
    },
    getAvailableBooks ({ commit, state }, searchText) {
      Api.getAvailableBooksData(searchText)
        .then(availableBooksData => {
          state.availableBooks = availableBooksData.map(bookData => new Book(bookData))
        })
    },
    updateAvatar ({ commit }, index) {
      Api.updateAvatar(index)
        .then(userData => commit('setUser', userData))
    },
    deleteBook ({ commit }, book) {
      Api.deleteBook(book)
        .then(userData => commit('setUser', userData))
    }
  }
})

export default store
