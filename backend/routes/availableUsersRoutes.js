import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addAvailableUser, getAvailableUsers } from "../controllers/availableUsersController.js";

const router = express.Router();

router.get("/", authMiddleware, getAvailableUsers);
router.post("/", authMiddleware, addAvailableUser);

export default router;
