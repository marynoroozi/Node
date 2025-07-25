const Validator = require("./validator");
const { body } = require("express-validator");
const path = require("path");

module.exports = new (class UserValidator extends Validator {
  handle() {
    return [
      body("name").notEmpty().withMessage("You must enter a name"),
      body("img").notEmpty().withMessage("You must upload an image"),
      body("img").custom(async (value) => {
        if (!value) {
          return;
        }
        if (![".jpg", ".jpeg", ".png"].includes(path.extname(value))) {
          throw new Error("File format is not correct");
        }
      }),
    ];
  }
})();
