import { NextFunction, Request, Response } from "express";
import { Message } from "../models/message.model";
import User from "../models/user.model";
import AppError from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
export const getUsersForSidebar = catchAsync(
   async (req: Request, res: Response, next: NextFunction) => {
      const loggedInUserId = req.user?.id;
      const filteredUsers = await User.find({
         _id: { $ne: loggedInUserId },
      }).select("name photo");
      const currentUser = await User.find({
         _id: { loggedInUserId },
      }).select("name photo");
      res.status(200).json({
         status: "success",
         results: filteredUsers.length,
         users: filteredUsers,
         currentUser: currentUser,
      });
   }
);
// @desc Get shared messages between logged in user and another user
// @route GET api/user/messages
// @access Private
export const getSharedMessages = catchAsync(
   async (req: Request, res: Response, next: NextFunction) => {
      const loggedInUserId = req.user?.id;
      const { otherUserId, page } = req.body;
      const limit = 50;
      const skip = (page - 1) * limit;

      if (!otherUserId) {
         return next(AppError("Please provide the other user's id", 400));
      }
      const messages = await Message.find({
         $or: [
            { senderId: loggedInUserId, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: loggedInUserId },
         ],
      })
         .sort({ createdAt: -1 })
         .skip(skip)
         .limit(limit);
      res.status(200).json({
         status: "success",
         results: messages.length,
         messages,
      });
   }
);

export const sendMessage = catchAsync(
   async (req: Request, res: Response, next: NextFunction) => {
      const loggedInUserId = req.user?.id;
      const { receiverId, text, image } = req.body;
      if (!receiverId) {
         return next(AppError("Please provide the receiver's id", 400));
      }
      const newMessage = await Message.create({
         senderId: loggedInUserId,
         receiverId,
         text,
         image,
      });
      res.status(201).json({
         status: "success",
         message: newMessage,
      });
   }
);
export const editMessage = catchAsync(
   async (req: Request, res: Response, next: NextFunction) => {
      const loggedInUserId = req.user?.id;
      const { receiverId, text, image } = req.body;

      if (!receiverId) {
         return next(AppError("Please provide the receiver's id", 400));
      }
      const newMessage = await Message.findOneAndUpdate(
         {
            senderId: loggedInUserId,
            receiverId,
         },
         {
            text,
            image,
         },
         { new: true }
      );
      res.status(201).json({
         status: "success",
         message: newMessage,
      });
   }
);

export const deleteMessage = catchAsync(
   async (req: Request, res: Response, next: NextFunction) => {}
);
