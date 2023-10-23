const emailvalidator = require("email-validator");

class BodyCheck{
  constructor (body){
    this.body = body;
    this.errors = {};
  }

  isEmail(key) {
    if(! emailvalidator.validate(this.body[key])){
      this.errors[key]= "invalid Email";
    }
  }

  isEmpty(key){
    if (this.body[key] === '' || this.body[key]=== undefined){
        this.errors[key]= "is empty";
    }
  }

  isDate(key){
    var date = new Date(this.body[key]);
    if (date == "Invalid Date"){
        this.errors[key] = "invalid Date";
    }
  }

  isValid(){
    if(Object.keys(this.errors).length === 0){
        return true
    }
    return false
  }

  isDatePositionValid(primary, secondary){
    var firstD = new Date(this.body[primary]);
    var secD = new Date(this.body[secondary]);
    if(firstD.getTime() >= secD.getTime()){
      this.errors[secondary]= "can not be older or equal to " + primary;
    }
  }

  isInArray(key, arr){
    if(! arr.includes(this.body[key])){
      this.errors[key]= "is not a known value";
    }
  }
}

module.exports = (BodyCheck)