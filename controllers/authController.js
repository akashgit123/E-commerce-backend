const { validationResult } = require("express-validator");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/authHelper");

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

const loginUser = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }
  try {
    const { email, password } = req.body;
    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      return res
        .status(401)
        .json({ success: false, message: "Email not exists" });
    }
    const isValidPassword = await comparePassword(
      password,
      userExists.password
    );
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentails" });
    }
    const authToken = await jwt.sign(
      { id: userExists._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      }
    );
    return res
      .status(200)
      .json({ success: true, message: "Login Successful", authToken });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Login failed",
      error,
    });
  }
};

module.exports = { registerUser, loginUser };
