const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const connectDB = require("./config/db");

connectDB();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", require("./routes/authRoute"));

app.get("/", function (req, res) {
  res.send("Ecommerce app");
});

const port = process.env.PORT || 6000;
app.listen(port, (req, res) => {
  console.log(`Server started on port :${port}`);
});
