import { Server } from "socket.io";
import User from "./models/User.js";

let io = null;

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "http://localhost:4200", credentials: true },
  });

  io.on("connection", (socket) => {

    socket.on("joinRoom", async (userId) => {
      if (!userId) {
        return;
      }

      socket.join(userId);
      await User.findByIdAndUpdate(userId, { isOnline: true });

      socket.broadcast.emit("userStatusChanged", {
        userId,
        isOnline: true,
      });

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

    });
  });

  return io;
};
