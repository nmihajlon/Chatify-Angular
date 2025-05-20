import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// import chatRoutes from "./routes/chatRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(
  cors({
    origin: "http://localhost:4200", 
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const connectDB = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB povezan");
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/chats", chatRoutes);
// app.use("/api/messages", messageRoutes);
