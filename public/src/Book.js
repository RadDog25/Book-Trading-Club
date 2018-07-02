class Book {
  constructor (properties) {
    for (let key in properties) {
      if (properties.hasOwnProperty(key)) {
        this[key] = properties[key]
      }
    }
  }

  getPublishedDate () {
    return new Date(this.publishedDate)
  }

  getExcerpt (length) {
    return window.getShortenedText(this.description, length)
  }

  getShortenedTitle (length) {
    return window.getShortenedText(this.title, length)
  }

  linkIsGooglePlay () {
    return this.link.includes('market.android.com')
  }
}

export default Book
