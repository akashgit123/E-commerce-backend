const { validationResult } = require("express-validator");
const userModel = require("../models/user");
const { hashPassword } = require("../helpers/authHelper");

const registerUser = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }
  try {
    const { name, email, password, address, phone } = req.body;
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(200).json({
        success: true,
        message: "User already exists",
      });
    }
    const hash = await hashPassword(password);
    const user = await userModel.create({
      name,
      email,
      address,
      phone,
      password: hash,
    });
    return res.status(200).json({
      success: true,
      message: "User Registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Registration failed",
      error,
    });
  }
};

module.exports = { registerUser };
