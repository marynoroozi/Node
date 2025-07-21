const express = require("express");
// Router() and not router
const router = express.Router();

const { body, validationResult } = require("express-validator");
let users = require("../users");

router.get("/", (req, res) => {
  res.render("users", { users: users, title: "All Users" });
});

router.get("/:id", (req, res) => {
  let user = users.find((user) => user.id == req.params.id);
  res.status(200).json({
    data: user,
    success: true,
  });
});

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("You must enter a name"),
    body("email").isEmail().withMessage("email format is not correct"),
    body("phone").isNumeric().withMessage("it should include only numbers"),
  ],
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //   return res.status(400).json({
      //     success: false,
      //     errors: errors.array(),
      //   });

      return res.redirect("https://google.com");
      //   return res.redirect("/user");
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

    const newUser = {
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
    };
    users.push(newUser);
    console.log("Done");
    // res.json({
    //   data: "user has been added successfully",
    //   success: true,
    // });
    res.redirect("/user");
  }
);

router.put("/:id", (req, res) => {
  users = users.map((user) => {
    if (user.id == req.params.id) {
      return req.body;
    } else {
      return user;
    }
  });
  res.json({
    data: "The user has been updated successfuly",
    success: true,
  });
});

router.delete("/:id", (req, res) => {
  users = users.filter((user) => user.id != Number(req.params.id));
  res.redirect("/user");
  //   res.json({
  //     data: "the user has been deleted correctly",
  //     success: true,
  //   });
});

module.exports = router;
