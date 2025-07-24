const contoller = require("./controller");
const { validationResult } = require("express-validator");

class dashboardController extends contoller {
  async index(req, res, next) {
    try {
      res.render("dashboard/index");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new dashboardController();
