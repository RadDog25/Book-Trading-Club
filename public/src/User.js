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

  requestIsPending (bookInstanceId) {
    const tradeRequests = this.getTradeRequestsForBook(bookInstanceId)

    if (tradeRequests.length) {
      return !!tradeRequests.find(tradeRequest => {
        return ['initiated', 'proposed'].includes(tradeRequest.status)
      })
    }

    return false
  }

  getTradeRequest (tradeRequestId) {
    return this.tradeRequests.find(tradeRequest => {
      return tradeRequestId === tradeRequest._id
    })
  }
}

export default User
