const express = require("express");
const config = require("config");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/auth", require("./auth"));
router.use("/dashboard", require("./dashboard"));

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.all("*", async (req, res, next) => {
  try {
    let error = new Error("Page not found");
    error.status = 404;
    throw error;
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  let code = err.status || 500;
  let message = err.message || "Internal Server Error";
  let stack = err.stack || "";
  if (config.debug) {
    return res.render("errors/developer", { code, message, stack });
  } else {
    return res.render(`errors/${code}`, { code, message });
  }
});

module.exports = router;
