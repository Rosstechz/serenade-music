import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const getAllUser = async (req, res, next) => {
  try {
    const currentUser = req.auth.userId;
    const users = await User.find({ clerkId: { $ne: currentUser } }); // except current users and return all other users, ne === not equalto
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const myId = req.auth.userId;
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId, recieverId: myId },
        { senderId: myId, recieverId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
