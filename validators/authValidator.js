const Validator = require("./validator");
const { body } = require("express-validator");

module.exports = new (class AuthValidator extends Validator {
  login() {
    return [
      body("email").isEmail().withMessage("email format is not correct"),
      body("password").notEmpty().withMessage("You must enter your password"),
    ];
  }

  register() {
    return [
      body("name").notEmpty().withMessage("You must enter a name"),
      body("email").isEmail().withMessage("email format is not correct"),
      body("password").notEmpty().withMessage("You must enter your password"),
    ];
  }
})();
