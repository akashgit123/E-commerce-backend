const express = require("express");
const contoller = require("../controllers/authController");
const Validation = require("../helpers/validator");
const route = express.Router();

route.post("/register", Validation.registerUser, contoller.registerUser);

module.exports = route;
