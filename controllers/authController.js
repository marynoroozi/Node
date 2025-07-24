const contoller = require("./controller");
const { validationResult } = require("express-validator");
const passport = require("passport");

class authController extends contoller {
  async loginForm(req, res, next) {
    try {
      res.render("auth/login");
    } catch (error) {
      next(error);
    }
  }

  async registerForm(req, res, next) {
    try {
      res.render("auth/register");
    } catch (error) {
      next(error);
    }
  }

  login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let myErrors = errors.array().map((err) => err.msg);
        req.flash("errors", myErrors);
        return res.redirect("/auth/login");
      }
      // passport.authenticate("local.login", (err, user, info) => {
      //   if (err) {
      //     return next(err);
      //   }
      //   if (!user) {
      //     // لاگین ناموفق
      //     return res.redirect("/auth/login");
      //   }
      //   // لاگین موفق
      //   req.logIn(user, (err) => {
      //     return res.redirect("/dashboard");
      //   });
      // })(req, res, next);
      passport.authenticate("local.login", (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) return res.redirect("/auth/login");

        req.logIn(user, (err) => {
          return res.redirect("/dashboard");
        });
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let myErrors = errors.array().map((err) => err.msg);
        req.flash("errors", myErrors);
        return res.redirect("/auth/login");
      }
      passport.authenticate("local.register", {
        successRedirect: "/dashboard",
        failureRedirect: "/auth/register",
        failureFlash: true,
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new authController();
