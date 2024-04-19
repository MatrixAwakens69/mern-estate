import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.log(error));

const app = express();

app.listen(process.env.PORT_NO, () => {
  console.log(`Server listening on port ${process.env.PORT_NO}`);
});
