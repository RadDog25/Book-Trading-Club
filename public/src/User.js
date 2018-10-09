class User {
  constructor (properties) {
    this._id = properties._id
    this.username = properties.username
    this.location = properties.location
    this.avatar = properties.avatar
    this.books = properties.books
    this.tradeRequests = properties.tradeRequests
  }

  getTradeRequestForBook (bookId) {
    return this.tradeRequests.find(tradeRequest => {
      return bookId === tradeRequest.bookInstanceForRequester._id || bookId === tradeRequest.bookInstanceForOwner._id
    })
  }

  getTradeRequest (tradeRequestId) {
    return this.tradeRequests.find(tradeRequest => {
      return tradeRequestId === tradeRequest._id
    })
  }
}

export default User
