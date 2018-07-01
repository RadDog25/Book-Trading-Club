class Api {
  static getUserData () {
    return new Promise((resolve, reject) => {
      window.axios.get('/api/user')
        .then(response => {
          resolve(response.data)
        })
    })
  }

  static getSearchedBooksData (searchText) {
    return new Promise((resolve, reject) => {
      window.axios.get('/api/books', {
        params: {
          searchText
        }
      })
        .then(response => {
          resolve(response.data)
        })
    })
  }

  static getAvailableBooksData (searchText) {
    return new Promise((resolve, reject) => {
      window.axios.get('/api/availablebooks', {
        params: {
          searchText
        }
      })
        .then(response => {
          resolve(response.data)
        })
    })
  }

  static updateAvatar (index) {
    return new Promise((resolve, reject) => {
      window.axios.post('/api/changeavatar', {
        avatar: index
      })
        .then(response => {
          resolve(response.data)
        })
    })
  }

  static requestTrade (book, requesterId) {
    return new Promise((resolve, reject) => {
      window.axios.post('/api/requesttrade', {
        book,
        requesterId
      })
        .then(() => {
          resolve()
        })
    })
  }

  static addBooks (books) {
    return new Promise((resolve, reject) => {
      window.axios.post('/api/addbooks', {
        books
      })
        .then(response => {
          resolve(response.data)
        })
    })
  }

  static deleteBook (book) {
    return new Promise((resolve, reject) => {
      window.axios({
        method: 'delete',
        url: '/api/deletebook',
        data: {
          book
        }
      })
        .then(response => {
          resolve(response.data)
        })
    })
  }
}

export default Api
