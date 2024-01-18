const express = require("express");
const controller = require("../controllers/orders");
const { isLoggedIn, isAdmin } = require("../middlewares/authMiddlewares");
const route = express.Router();

route.get("/my-orders", isLoggedIn, controller.getUserOrders);
route.get("/all-orders", isLoggedIn, isAdmin, controller.getAllOrders);
route.put(
  "/order-status/:orderId",
  isLoggedIn,
  isAdmin,
  controller.updateOrderStatus
);

module.exports = route;
