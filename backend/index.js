import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Database is connected successfully");
  }).catch(error => { console.log(error); });

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});