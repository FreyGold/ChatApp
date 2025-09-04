import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { catchAsync } from "../utils/catchAsync";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/util";
import cloudinary from "../utils/cloudinary";
type bodyType = {
   fullName: string;
   email: string;
   password: string;
};

export const signup = catchAsync(async (req: Request, res: Response) => {
   if (
      !req.body ||
      !req.body.fullName ||
      !req.body.email ||
      !req.body.password
   ) {
      return res
         .status(400)
         .json({ message: "You need to provide all fields" });
   }
   const { fullName, email, password }: bodyType = req.body;
   if (password.length < 6) {
      res.status(400).json({
         message: "Password must be at least 6 characters",
      });
   }
   const user = await User.findOne({ email });
   if (user) {
      res.status(400).json({
         message: "User already exists",
      });
   }
   const hashedPassword = await bcrypt.hash(password, 10);
   const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
   });

   if (newUser) {
      await newUser.save();
      generateToken(String(newUser._id), res);
      return res.status(200).json({
         message: "User created successfully",
         user: {
            email: newUser.email,
            _id: newUser._id,
            fullName: newUser.fullName,
         },
      });
   } else {
      res.status(400).json({
         message: "Invalid User Data!",
      });
   }
});

export const login = catchAsync(async (req: Request, res: Response) => {
   console.log(req.body);
   if (!req.body || !req.body.email || !req.body.password) {
      return res
         .status(400)
         .json({ message: "You need to provide email and password" });
   }
   const { email, password }: bodyType = req.body;
   const user = await User.findOne({ email });
   if (!user) {
      return res.status(400).json({
         message: "Email or Password is incorrect",
      });
   }
   const isMatch = bcrypt.compare(password, user.password);
   if (!isMatch) {
      return res.status(400).json({
         message: "Email or Password is incorrect",
      });
   }
   generateToken(String(user._id), res);
   return res.status(200).json({
      message: "You are signed in!",
   });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
   if (!req.cookies) {
      return res.status(500).json({
         message: "Cookie parser not configured properly",
      });
   }

   const token = req.cookies.jwt;
   if (!token || token === "") {
      return res.status(400).json({
         message: "User is already logged out",
      });
   }

   jwt.verify(token, process.env.JWT_SECRET!);

   res.cookie("jwt", "", {
      expires: new Date(0),
      httpOnly: true,
   });

   res.status(200).json({
      message: "Logged out successfully",
   });
});

export const editProfile = catchAsync(async (req: Request, res: Response) => {
   if (!req.body || !req.body.profilePic) {
      return res.status(400).json({
         message: "Provide a profile picture please",
      });
   }
   const { profilePic } = req.body;

   const uploadResponse = await cloudinary.uploader.upload(profilePic);
   const updatedUser = await User.findByIdAndUpdate(
      req.user?._id,
      { profilePic: uploadResponse.secure_url },
      { new: true }
   ).select("-password -__v");

   res.status(200).json({
      status: "success",
      data: {
         user: updatedUser,
      },
   });
});
export const checkAuth = catchAsync(async (req: Request, res: Response) => {
   res.status(200).json({
      status: "success",
      data: {
         user: req.user,
      },
   });
});
