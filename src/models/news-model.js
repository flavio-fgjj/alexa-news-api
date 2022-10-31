module.exports = class News {
  constructor() {
    this.title = null
    this.description = null
  }

  initModel (data) {
    this.title = data.title
    this.description = data.description
  }

  getTitle () { return this.title }

  setTitle (titleValue) { this.title = titleValue }

  getDescription () { this.description }

  setDescription (description) { this.description = description }

  equals (otherNews) {
    return otherNews.getTitle() == this.getTitle()
      && otherNews.getDescription() == this.getDescription()
  }

  fill (newFields) {
    for (let field in newFields) {
      if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
        if (this[field] !== 'undefined') {
            this[field] = newFields[field];
        }
      }
    }
  }
}