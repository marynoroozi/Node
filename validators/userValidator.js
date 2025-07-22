const Validator = require("./validator");
const { body } = require("express-validator");

module.exports = new (class UserValidator extends Validator {
  handle() {
    return [
      body("name").notEmpty().withMessage("You must enter a name"),
      body("email").isEmail().withMessage("email format is not correct"),
      body("phone").isNumeric().withMessage("it should include only numbers"),
    ];
  }
})();
