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
route.post("/filter-products", controller.productFilter);
route.get("/product-count", controller.productCount);
route.get("/product-page/:page", controller.productListController);
route.get("/search/:keyword", controller.searchProduct);
route.get("/similar-product/:pid/:cid", controller.similarProduct);

module.exports = route;
