const { validationResult } = require("express-validator");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/authHelper");

const registerUser = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ message: result.array()[0] });
  }
  try {
    const { name, email, password, address, phone } = req.body;
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(200).json({
        success: false,
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
      // user,
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
    return res.send({ errors: result.array()[0] });
  }
  try {
    const { email, password } = req.body;
    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      return res
        .status(200)
        .json({ success: false, message: "Email not exists" });
    }
    const isValidPassword = await comparePassword(
      password,
      userExists.password
    );
    if (!isValidPassword) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid credentails" });
    }
    const user = {
      name: userExists.name,
      email: userExists.email,
      phone: userExists.phone,
      address: userExists.address,
      role: userExists.role,
    };
    const authToken = await jwt.sign(
      { id: userExists._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );
    return res
      .status(200)
      .json({ success: true, message: "Login Successful", user, authToken });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Login failed",
      error,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { email, name, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    const updateUser = await userModel
      .findByIdAndUpdate(
        user._id,
        {
          email: email || user.email,
          name: name || user.name,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      )
      .select(["-password", "-createdAt", "-updatedAt"]);

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Failed to Update Profile",
      error,
    });
  }
};

module.exports = { registerUser, loginUser, updateProfile };
