import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    avatar: {
        type: String,
        default: '',
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
    lastSeen: {
        type: Date,
    },
}, {timestamps: true});

export default mongoose.model("User", userSchema);