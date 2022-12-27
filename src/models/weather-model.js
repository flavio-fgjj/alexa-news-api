module.exports = class Weather {
    constructor() {
      this.city = null
      this.condition = null
    }
  
    initModel (data) {
      this.city = data.city
      this.condition = data.condition
    }

    getCity () { return this.city }  
    setCity (value) { this.city = value }

    getCondition () { return this.condition }  
    setCondition (value) { this.condition = value }

    equals (otherValue) {
      return otherValue.getCity() == this.getCity()
            && otherValue.getCondition() == this.getCondition()
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