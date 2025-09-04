import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
interface JwtPayload {
   userId: string;
   iat: number;
   exp: number;
}
export const protectRoutes = catchAsync(
   async (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies.jwt;
      if (!token || token === "") {
         return res.status(400).json({
            message: "You are not authenticated to do this action",
         });
      }

      try {
         const payload = jwt.verify(
            token,
            process.env.JWT_SECRET!
         ) as JwtPayload;
         if (!payload) {
            return res.status(400).json({
               message: "You are not authenticated to do this action",
            });
         }
         const user = await User.findById(payload.userId).select("-password");
         req.user = user;

         if (!user) {
            return res.status(400).json({
               message: "User no longer exists",
            });
         }
         next();
      } catch (error) {
         return res.status(400).json({
            message: "You are not authenticated to do this action",
         });
      }
   }
);
