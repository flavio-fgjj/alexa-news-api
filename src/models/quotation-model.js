module.exports = class Stocks {
    constructor() {
      this.stock = null
      this.location = null
      this.points = null
      this.variation = null
    }
  
    initModel (data) {
      this.stock = data.name
      this.location = data.location
      this.points = data.points
      this.variation = data.variation
    }

    getStock () { return this.stock }  
    setStock (value) { this.stock = value }

    getLocation () { return this.location }  
    setLocation (value) { this.location = value }

    getPoints () { return this.points }  
    setPoints (value) { this.points = value }
  
    getVariation () { return this.variation }  
    setVariation (value) { this.variation = value }

    equals (otherValue) {
      return otherValue.getStock() == this.getStock()
            && otherValue.getLocation() == this.getLocation()
            && otherValue.getPoints() == this.getPoints()
            && otherValue.getVariation() == this.getVariation()
    }
  
    fill (newValues) {
        for (let field in newValues) {
            if (this.hasOwnProperty(field) && newValues.hasOwnProperty(field)) {
              if (this[field] !== 'undefined') {
                  this[field] = newValues[field];
              }
            }
          }
    }
  }