
import axios from 'axios'
import User from './User'

class Api {
  static register (username, email, password) {
    return new Promise((resolve, reject) => {
      axios.post('/api/register', {
        username,
        email,
        password
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static login (email, password) {
    return new Promise((resolve, reject) => {
      axios.post('/api/login', {
        email,
        password
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static getUserData (param = 'me') {
    return new Promise((resolve, reject) => {
      axios.get(`/api/users/${param}`)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static changePassword (username, oldPassword, newPassword) {
    return new Promise((resolve, reject) => {
      axios.put('/api/users/me/password', {
        username,
        oldPassword,
        newPassword
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static changeLocation (username, location) {
    return new Promise((resolve, reject) => {
      axios.put('/api/users/me/location', {
        username,
        location
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static getSearchedBooksData (searchText) {
    return new Promise((resolve, reject) => {
      axios.get('/api/books/search', {
        params: {
          searchText
        }
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static getAvailableBooksData (searchText) {
    return new Promise((resolve, reject) => {
      axios.get('/api/books', {
        params: {
          searchText
        }
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static updateAvatar (index) {
    return new Promise((resolve, reject) => {
      axios.put('/api/users/me/avatar', {
        avatar: index
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static requestTrade (bookInstanceId) {
    return new Promise((resolve, reject) => {
      axios.post('/api/trades', {
        bookInstanceId
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static addBook (book) {
    return new Promise((resolve, reject) => {
      axios.post('/api/books', {
        book
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static deleteBook (id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: `/api/books/${id}`
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static addStarterData () {
    return new Promise((resolve, reject) => {
      axios.post('/api/addstarterdata')
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static deleteAllTradeRequests () {
    return new Promise((resolve, reject) => {
      axios.delete('/api/trades')
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static getTradePartner (id) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/trades/${id}/partner`)
        .then(response => {
          const requester = new User(response.data)
          resolve(requester)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static trade (id, data) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/trades/${id}`, data)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default Api
