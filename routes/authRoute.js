const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controller/authController");

const router = express.Router();

//REGISTER = >registerController is the named callback function which is present in the ../controller/authController.js
router.post("/register", registerController);

//Login
router.post("/login", loginController);

//Logout
router.post("/logout", logoutController);

module.exports = router;
