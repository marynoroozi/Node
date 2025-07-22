const autoBind = require("auto-bind");

class Validator {
  constructor() {
    this.name = "Maryam";
    autoBind(this);
  }
}
module.exports = Validator;
