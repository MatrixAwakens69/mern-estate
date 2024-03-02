import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.listen(process.env.PORTNO, () => {
  console.log(`Server is listening on port ${process.env.PORTNO}`);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
