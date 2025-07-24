const contoller = require("./controller");
const User = require("models/user");
const { validationResult } = require("express-validator");

class UserController extends contoller {
  async getAllUsers(req, res, next) {
    try {
      const errors = req.flash("errors"); // ✅ فقط یک‌بار استفاده
      let users = await User.find();
      res.render("users", {
        users: users,
        title: "All Users",
        errors: req.flash("errors"),
        message: req.flash("message"),
      });
    } catch (error) {
      next(error);
    }
  }

  async getOneUser(req, res, next) {
    try {
      let user = await User.findById(req.params.id);
      if (!user) {
        //اینجوری هرجایی بخایم یک ارور تولید میکنیم. چون در کنترلر یک متد ارور ایجاد کردیم
        this.error("the user not found", 404);
      }
      res.render("user", { user: user });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/user");
      }

      const rawAddress = req.body.address || "",
        parts = rawAddress.split(",").map((p) => p.trim());
      const address = {
        street: parts[1] || "",
        suite: parts[0] || "",
        city: (parts[2] || "") + (parts[3] || ""),
        zipcode: parts[4] || "",
        geo: {
          lat: "",
          lng: "",
        },
      };

      const newUser = new User({
        id: parseInt(req.body.id),
        name: req.body.name || "",
        password: req.body.password || req.body.name || "",
        email: req.body.email || "",
        address: address,
        phone: req.body.phone || "",
        website: req.body.website || "",
        company: {
          name: req.body.company || "",
          catchPhrase: "",
          bs: "",
        },
      });
      await newUser.save();
      console.log("Done");
      req.flash("msg", "the new user has been created");
      res.redirect("/user");
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const rawAddress = req.body.address || "",
        parts = rawAddress.split(",").map((p) => p.trim());
      const address = {
        street: parts[1] || "",
        suite: parts[0] || "",
        city: (parts[2] || "") + (parts[3] || ""),
        zipcode: parts[4] || "",
        geo: {
          lat: "",
          lng: "",
        },
      };

      await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        password: req.body.password || req.body.name,
        email: req.body.email,
        address: address,
        phone: req.body.phone,
        website: req.body.website,
        company: {
          name: req.body.company,
          catchPhrase: "",
          bs: "",
        },
      });
      res.redirect("/user");
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.redirect("/user");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
