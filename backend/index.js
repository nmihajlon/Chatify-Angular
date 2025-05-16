import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB povezan");
};  

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);