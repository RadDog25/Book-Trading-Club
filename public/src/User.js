import Book from './Book'

class User {
  constructor (properties) {
    this._id = properties._id
    this.username = properties.username
    this.location = properties.location
    this.avatar = properties.avatar
    this.books = properties.books.map(book => new Book(book))
    this.tradeRequests = properties.tradeRequests
  }

  findTradeRequestForBook (book) {
    return this.tradeRequests.find(tradeRequest => {
      return book._id === tradeRequest.book._id
    })
  }
}

export default User
