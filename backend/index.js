const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));
const app = express();

app.listen(3000, () => console.log("server is running on port 3000"));
