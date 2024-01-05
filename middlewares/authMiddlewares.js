const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const isLoggedIn = async (req, res, next) => {
  try {
    const verify = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // console.log(verify);
    req.user = { _id: verify.id };
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized User" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

module.exports = { isLoggedIn, isAdmin };
