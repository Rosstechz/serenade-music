import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: { type: String, required: true }, // Clerk User ID
    recieverId: { type: String, required: true }, // Clerk User Id
    content: { type: String, requried: true },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
