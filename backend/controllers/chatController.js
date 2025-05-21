import AvailableUsers from "../models/AvailableUsers.js";
import Chat from "../models/Chat.js";

export const createPrivateChat = async (req, res) => {
  const { userId } = req.body;
  const loggedInUserId = req.user._id;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  let existingChat = await Chat.findOne({
    isGroupChat: false,
    users: { $all: [loggedInUserId, userId], $size: 2 },
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (existingChat) {
    return res.status(200).json(existingChat);
  }

  const newChat = new Chat({
    isGroupChat: false,
    users: [loggedInUserId, userId],
  });

  const createdChat = await newChat.save();
  const fullChat = await Chat.findById(createdChat._id).populate(
    "users",
    "-password"
  );

  await AvailableUsers.deleteMany({ user: userId });

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
