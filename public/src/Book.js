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
    if (!length || length >= this.description.length) {
      return this.description
    }

    return `${this.description.substring(0, length)}...`
  }

  linkIsGooglePlay () {
    return this.link.includes('market.android.com')
  }

  getShortenedTitle (length) {
    if (!length || length >= this.title.length) {
      return this.title
    }

    return `${this.title.substring(0, length)}...`
  }
}

export default Book
