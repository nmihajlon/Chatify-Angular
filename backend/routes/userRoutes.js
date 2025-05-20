import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getAllUsers, uploadAvatar } from "../controllers/userController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllUsers);
// router.patch("/status", authMiddleware, updateOnlineStatus);
router.post("/upload-avatar", upload.single("avatar"), uploadAvatar);

export default router;