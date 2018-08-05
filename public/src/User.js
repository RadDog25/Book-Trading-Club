import Book from './Book'
import moment from 'moment'

class User {
  constructor (properties) {
    this._id = properties._id
    this.username = properties.username
    this.location = properties.location
    this.avatar = properties.avatar
    this.books = properties.books.map(book => new Book(book))
    this.tradeRequests = properties.tradeRequests
      .map(tradeRequest => {
        return {
          ...tradeRequest,
          book: new Book(tradeRequest.book),
          proposedBook: new Book(tradeRequest.proposedBook),
          createdAt: moment(tradeRequest.createdAt),
          updatedAt: moment(tradeRequest.updatedAt)
        }
      })
  }

  getTradeRequestForBook (bookId) {
    return this.tradeRequests.find(tradeRequest => {
      return bookId === tradeRequest.book._id
    })
  }

  getTradeRequest (tradeRequestId) {
    return this.tradeRequests.find(tradeRequest => {
      return tradeRequestId === tradeRequest._id
    })
  }
}

export default User
