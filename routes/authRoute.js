const express = require("express");
const controller = require("../controllers/authController");
const Validation = require("../middlewares/validator");
const { isLoggedIn, isAdmin } = require("../middlewares/authMiddlewares");
const route = express.Router();

route.post("/register", Validation.registerUser, controller.registerUser);
route.post("/login", Validation.loginUser, controller.loginUser);
route.put(
  "/profile",
  isLoggedIn,
  Validation.registerUser,
  controller.updateProfile
);
route.post("/forgot-password", controller.forgotPassword);
route.put("/update-password/:token", controller.updatePassword);

// protected route
route.get("/user-auth", isLoggedIn, (req, res) => {
  res.status(200).json({ ok: true });
});

route.get("/admin-auth", isLoggedIn, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

module.exports = route;
