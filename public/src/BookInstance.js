import Book from './Book'
import User from './User'

class BookInstance {
  constructor (properties) {
    this.book = new Book(properties.book)
    this.user = new User(properties.user)
    this._id = properties._id
  }
}

export default BookInstance
