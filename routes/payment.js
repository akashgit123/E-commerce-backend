const express = require("express");
const controller = require("../controllers/payment");
const { isLoggedIn } = require("../middlewares/authMiddlewares");
const route = express.Router();

route.get("/braintree/token", controller.braintreeToken);
route.post("/braintree/payment", isLoggedIn, controller.braintreePayment);

module.exports = route;
