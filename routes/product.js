const express = require("express");
const { isLoggedIn, isAdmin } = require("../middlewares/authMiddlewares");
const controller = require("../controllers/product");
const Validation = require("../middlewares/validator");
const formidableMiddleware = require("express-formidable");
const route = express.Router();

route.post(
  "/add-product",
  isLoggedIn,
  isAdmin,
  formidableMiddleware(),
  Validation.product,
  controller.createProduct
);

route.put(
  "/update-product/:id",
  isLoggedIn,
  isAdmin,
  formidableMiddleware(),
  Validation.product,
  controller.updateProduct
);

route.delete(
  "/delete-product/:id",
  isLoggedIn,
  isAdmin,
  controller.deleteProduct
);

route.get("/all-products", controller.allProducts);
route.get("/get-product/:slug", controller.getProduct);
route.get("/product-image/:id", controller.getProductImage);

module.exports = route;
