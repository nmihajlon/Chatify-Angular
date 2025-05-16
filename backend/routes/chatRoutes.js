import express from "express";
import {
  createPrivateChat,
  createGroupChat,
  getUserChats,
  renameGroup,
  addToGroup,
  removeFromGroup
} from "../controllers/chatController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/private", authMiddleware, createPrivateChat);
router.post("/group", authMiddleware, createGroupChat);
router.get("/", authMiddleware, getUserChats);
router.put("/rename", authMiddleware, renameGroup);
router.put("/group-add", authMiddleware, addToGroup);
router.put("/group-remove", authMiddleware, removeFromGroup);

export default router;