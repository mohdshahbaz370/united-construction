const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const dotenv = require("dotenv");
dotenv.config();
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});

app.listen(3000, () => console.log("server is running on port 3000"));
