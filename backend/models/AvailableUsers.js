import mongoose from "mongoose";

const availableUserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AvailableUser", availableUserSchema);
