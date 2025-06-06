import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import { getIo } from '../socket.js';

export const sendMessage = async (req, res) => {
  const { userId, chatId, content } = req.body;
  const loggedInUserId = req.user._id;

  if (!userId || !chatId || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Proveri da li chat postoji
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  // Proveri da li je korisnik deo chata
  if (!chat.users.includes(userId) || !chat.users.includes(loggedInUserId)) {
    return res
      .status(403)
      .json({ message: "You are not a member of this chat" });
  }

  // Kreiraj poruku
  const message = {
    sender: loggedInUserId,
    content,
    chat: chatId,
  };
  let newMessage = await Message.create(message);

  newMessage = await newMessage.populate("sender", "username avatar");

  chat.latestMessage = newMessage._id;
  await chat.save();

  const io = getIo();
  chat.users.forEach((user) => {
    // if (user.toString() !== loggedInUserId.toString()) {
      io.to(user.toString()).emit("newMessage", newMessage);
    // }
  });

  res.status(201).json(newMessage);
};

export const getMessages = async (req, res) => {
    const { chatId } = req.params;
    const userId = req.user._id;
  
    try {
      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
  
      if (!chat.users.includes(userId)) {
        return res.status(403).json({ message: "You are not authorized to view messages in this chat" });
      }
  
      const messages = await Message.find({ chat: chatId })
        .populate("sender", "username avatar")
        .sort({ createdAt: 1 });
  
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
