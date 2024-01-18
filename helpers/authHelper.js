const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const cmp = bcrypt.compareSync(password, hashedPassword);
    return cmp;
  } catch (error) {
    console.log(error);
  }
};

const forgotPasswordToken = async (id, email) => {
  const secret = process.env.JWT_SECRET;
  const token = await jwt.sign(
    {
      userId: id,
      email: email,
    },
    secret,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

module.exports = { hashPassword, comparePassword, forgotPasswordToken };
