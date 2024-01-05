const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const mongodbUrl = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    const res = await mongoose.connect(mongodbUrl);
    console.log(`Connected to ${res.connection.name}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
