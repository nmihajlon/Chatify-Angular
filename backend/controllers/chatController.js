import AvailableList from "../models/AvailableList.js";
import Chat from "../models/Chat.js";

export const createPrivateChat = async (req, res) => {
  // korisnik sa kojim želimo chat
  const { userId } = req.body;          
  // trenutno prijavljeni korisnik
  const loggedInUserId = req.user._id; 

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  // Proveri da li već postoji chat između njih dvoje
  let existingChat = await Chat.findOne({
    isGroupChat: false,
    users: { $all: [loggedInUserId, userId], $size: 2 },
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (existingChat) {
    return res.status(200).json(existingChat);
  }

  // Kreiraj novi chat
  const newChat = new Chat({
    isGroupChat: false,
    users: [loggedInUserId, userId],
  });

  const createdChat = await newChat.save();
  const fullChat = await Chat.findById(createdChat._id).populate(
    "users",
    "-password"
  );

  // Sad izbacujemo oba korisnika iz dostupnih listi jedni drugih
  // 1. Ukloni userId iz dostupnih listi loggedInUserId
  await AvailableList.updateOne(
    { owner: loggedInUserId },
    { $pull: { users: userId } }
  );

  // 2. Ukloni loggedInUserId iz dostupnih listi userId
  await AvailableList.updateOne(
    { owner: userId },
    { $pull: { users: loggedInUserId.toString() } }
  );

  return res.status(201).json(fullChat);
};

export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({
      users: { $in: [userId] },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          select: "username avatar",
        },
      })
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
