const { body } = require("express-validator");

class Validation {
  static registerUser = [
    body("name").notEmpty().withMessage("Name is required").escape(),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Enter valid email"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 5 })
      .withMessage("Must be minimum 5 characters"),
    body("phone")
      .isNumeric()
      .notEmpty()
      .withMessage("Phone number is required"),
    body("address").notEmpty().withMessage("Address is required"),
  ];

  static loginUser = [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Enter valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
}

module.exports = Validation;
