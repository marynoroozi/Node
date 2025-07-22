const express = require("express");
// Router() and not router
const router = express.Router();

//controllers
const userController = require("controllers/userController");

//validators
const UserValidator = require("validators/UserValidator");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.post("/", UserValidator.handle(), userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
