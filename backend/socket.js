import { Server } from "socket.io";
import User from "./models/User.js";

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "http://localhost:4200", credentials: true },
  });

  io.on("connection", (socket) => {
    console.log("Korisnik povezan, socket id:", socket.id);

    socket.on("joinRoom", async (userId) => {
      if (!userId) {
        console.log("userId nije prosleđen!");
        return;
      }

      console.log("USER JOINED ROOM:", userId);
      socket.join(userId);
      await User.findByIdAndUpdate(userId, { isOnline: true });

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

  return io;
};
