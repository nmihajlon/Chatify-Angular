import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import availableUsersRoutes from "./routes/availableUsersRoutes.js";
import { initSocket } from "./socket.js";

dotenv.config();
const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
const server = http.createServer(app);
initSocket(server);

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

server.listen(PORT, () => {
  console.log(`Socket.io server is running on PORT: ${PORT}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/uploads', express.static(path.resolve('uploads')));
app.use("/api/chats", chatRoutes);
app.use("/api/available-users", availableUsersRoutes);
app.use("/api/messages", messageRoutes);
