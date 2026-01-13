const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./Route/authRoutes");
const expenseRoutes = require("./Route/expenseRouts");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES //
app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

// DB CONNECT //
mongoose
  .connect("mongodb://localhost:27017/JOY")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
