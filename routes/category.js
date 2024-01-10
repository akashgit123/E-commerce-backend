const express = require("express");
const { isLoggedIn, isAdmin } = require("../middlewares/authMiddlewares");
const controller = require("../controllers/category");
const Validation = require("../middlewares/validator");
const route = express.Router();

route.post(
  "/create-category",
  isLoggedIn,
  isAdmin,
  Validation.category,
  controller.createCategory
);
route.put(
  "/update-category/:id",
  isLoggedIn,
  isAdmin,
  Validation.category,
  controller.updateCategory
);
route.delete(
  "/delete-category/:id",
  isLoggedIn,
  isAdmin,
  controller.deleteCategory
);
route.get("/fetch-category", controller.allCategory);
route.get("/fetchOne-category/:slug", controller.findCategory);

module.exports = route;
