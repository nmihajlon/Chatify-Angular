import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import availableUsersRoutes from "./routes/availableUsersRoutes.js";
import { initSocket } from "./socket.js";
import User from "./models/User.js";

dotenv.config();
const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
const server = http.createServer(app);
const io = initSocket(server);

io.on("connection", (socket) => {
  console.log("Korisnik povezan, socket id:", socket.id);

  socket.on("joinRoom", async (userId) => {
    if (!userId) {
      console.log("userId nije prosleđen!");
      return;
    }

    console.log("USER JOINED ROOM:", userId);
    socket.join(userId);
    await User.findByIdAndUpdate(userId, {isOnline: true});

    socket.broadcast.emit("userStatusChanged", {
      userId,
      isOnline: true,
    });

    console.log(`User ${userId} online`);

    socket.data.userId = userId;
  });

  socket.on("disconnect", async () => {
    const userId = socket.data.userId;
    if (!userId) return;

    await User.findByIdAndUpdate(userId, {
      isOnline: false,
      lastSeen: new Date(),
    });

    socket.broadcast.emit("userStatusChanged", {
      userId,
      isOnline: false,
    });

    console.log(`User ${userId} disconnected`);
  });
});

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
app.use('/uploads', express.static('uploads'));
app.use("/api/chats", chatRoutes);
app.use("/api/available-users", availableUsersRoutes);
app.use("/api/messages", messageRoutes);
