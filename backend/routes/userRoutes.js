import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllUsers);
router.patch("/status", authMiddleware, updateOnlineStatus);

export default router;