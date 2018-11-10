class User {
  constructor (properties) {
    for (let key in properties) {
      if (properties.hasOwnProperty(key)) {
        this[key] = properties[key]
      }
    }
  }

  getTradeRequestsForBook (bookId) {
    return this.tradeRequests.filter(tradeRequest => {
      return (tradeRequest.bookInstanceForRequester &&
      bookId === tradeRequest.bookInstanceForRequester._id) ||
      (tradeRequest.bookInstanceForOwner &&
      bookId === tradeRequest.bookInstanceForOwner._id)
    })
  }

  getTradeRequest (tradeRequestId) {
    return this.tradeRequests.find(tradeRequest => {
      return tradeRequestId === tradeRequest._id
    })
  }
}

export default User
