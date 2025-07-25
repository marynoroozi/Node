const express = require("express");
// Router() and not router
const router = express.Router();

//controllers
const dashboardController = require("controllers/dashboardController");

//validators
const dashboardValidator = require("validators/dashboardValidator");
const editUserValidator = require("validators/editUserValidator");

const uploadUserProfile = require("upload/uploadUserProfile");

router.use((req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/login");
  }
  next();
});

router.get("/", dashboardController.index);
router.post(
  "/editUser",
  uploadUserProfile.single("img"),
  (req, res, next) => {
    if (!req.file) {
      req.body.img = null;
    } else {
      req.body.img = req.file.filename;
    }
    next();
  },
  editUserValidator.handle(),
  dashboardController.editUser
);

module.exports = router;
