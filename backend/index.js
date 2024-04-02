const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route");
const dotenv = require("dotenv");
dotenv.config();
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));
const app = express();

app.use("/api/user", userRouter);

app.listen(3000, () => console.log("server is running on port 3000"));
