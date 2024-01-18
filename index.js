const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/category", require("./routes/category"));
app.use("/api/v1/product", require("./routes/product"));
app.use("/api/v1/payment", require("./routes/payment"));
app.use("/api/v1/orders", require("./routes/orders"));

app.get("/", function (req, res) {
  res.send("Ecommerce app");
});

const port = process.env.PORT || 6000;
app.listen(port, (req, res) => {
  console.log(`Server started on port :${port}`);
});
