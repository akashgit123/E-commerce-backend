const express = require("express");
const contoller = require("../controllers/authController");
const Validation = require("../helpers/validator");
const { isLoggedIn, isAdmin } = require("../middlewares/authMiddlewares");
const route = express.Router();

route.post("/register", Validation.registerUser, contoller.registerUser);
route.post("/login", Validation.loginUser, contoller.loginUser);

// protected route
route.get("/user-auth", isLoggedIn, (req, res) => {
  res.status(200).json({ ok: true });
});

route.get("/admin-auth", isLoggedIn, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

module.exports = route;
