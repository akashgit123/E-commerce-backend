const express = require("express");
const contoller = require("../controllers/authController");
const Validation = require("../middlewares/validator");
const { isLoggedIn, isAdmin } = require("../middlewares/authMiddlewares");
const route = express.Router();

route.post("/register", Validation.registerUser, contoller.registerUser);
route.post("/login", Validation.loginUser, contoller.loginUser);
route.put(
  "/profile",
  isLoggedIn,
  Validation.registerUser,
  contoller.updateProfile
);

// protected route
route.get("/user-auth", isLoggedIn, (req, res) => {
  res.status(200).json({ ok: true });
});

route.get("/admin-auth", isLoggedIn, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

module.exports = route;
