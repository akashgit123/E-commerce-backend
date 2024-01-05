const express = require("express");
const contoller = require("../controllers/authController");
const Validation = require("../helpers/validator");
const { isLoggedIn, isAdmin } = require("../middlewares/authMiddlewares");
const route = express.Router();

route.post("/register", Validation.registerUser, contoller.registerUser);
route.post("/login", Validation.loginUser, contoller.loginUser);

route.post("/test", isLoggedIn, isAdmin, (req, res) => {
  res.status(200).json({ msg: "Admin" });
});

module.exports = route;
