const contoller = require("./controller");
const User = require("models/user");
const { validationResult } = require("express-validator");

class UserController extends contoller {
  async getAllUsers(req, res) {
    const errors = req.flash("errors"); // ✅ فقط یک‌بار استفاده
    let users = await User.find();
    res.render("users", {
      users: users,
      title: "All Users",
      errors: errors || [],
    });
  }

  async getOneUser(req, res) {
    let user = await User.findById(req.params.id);
    res.render("user", { user: user });
  }

  async createUser(req, res) {
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
      username: req.body.username || req.body.name || "",
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
  }

  async updateUser(req, res) {
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
      username: req.body.username || req.body.name,
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
  }

  async deleteUser(req, res) {
    await User.deleteOne({ _id: req.params.id });
    res.redirect("/user");
  }
}

module.exports = new UserController();
