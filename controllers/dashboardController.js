const contoller = require("./controller");
const User = require("models/user");

const { validationResult } = require("express-validator");

class dashboardController extends contoller {
  async index(req, res, next) {
    try {
      res.render("dashboard/index");
    } catch (error) {
      next(error);
    }
  }

  async editUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let myErrors = errors.array().map((err) => err.msg);
        req.flash("errors", myErrors);
        return res.redirect("/dashboard");
      }
      let data = {
        name: req.body.name,
      };
      if (!req.file) {
        res.redirect("/dashboard");
      }
      let imgPath = req.file.path.replace(/\\/g, "/").split("/public")[1];
      data.img = imgPath;
      await User.findByIdAndUpdate(req.user._id, {
        $set: data,
      });
      res.render("dashboard/editUser");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new dashboardController();
