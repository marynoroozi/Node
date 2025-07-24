const express = require("express");
// Router() and not router
const router = express.Router();

//controllers
const dashboardController = require("controllers/dashboardController");

//validators
const dashboardValidator = require("validators/dashboardValidator");

router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  return res.redirect("/");
});

router.get("/", dashboardController.index);

module.exports = router;
