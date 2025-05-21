import express from "express";
import {
  createPrivateChat,
  getChats
} from "../controllers/chatController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getChats);
router.post("/private", authMiddleware, createPrivateChat);
// router.post("/group", authMiddleware, createGroupChat);
// router.put("/rename", authMiddleware, renameGroup);
// router.put("/group-add", authMiddleware, addToGroup);
// router.put("/group-remove", authMiddleware, removeFromGroup);

export default router;