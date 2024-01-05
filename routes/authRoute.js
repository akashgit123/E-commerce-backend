const express = require("express");
const contoller = require("../controllers/authController");
const route = express.Router();

route.post("/register", contoller.registerUser);

module.exports = route;
