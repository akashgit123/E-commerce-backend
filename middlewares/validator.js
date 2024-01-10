const { body, check } = require("express-validator");

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
    body("phone").notEmpty().withMessage("Phone number is required"),
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

  static category = [
    body("name").notEmpty().withMessage("Category name is required"),
  ];

  static product = [
    check("name").notEmpty().withMessage("Product name is required"),
    check("description")
      .notEmpty()
      .withMessage("Product description is required"),
    check("price").notEmpty().withMessage("Product price is required"),
    check("category").notEmpty().withMessage("Product category is required"),
    check("quantity").notEmpty().withMessage("Product quantity is required"),
    check("image").notEmpty().withMessage("Product image is required"),
  ];
}

module.exports = Validation;
