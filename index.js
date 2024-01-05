const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

app.get("/", function (req, res) {
  res.send("Ecommerce app");
});

const port = process.env.PORT || 6000;
app.listen(port, (req, res) => {
  console.log(`Server started on port :${port}`);
});
