import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userId: string, res: Response) => {
   if (!process.env.JWT_SECRET) {
      throw new Error("Secret isn't provided in the environment");
   }
   const secret: string = process.env.JWT_SECRET;
   const token = jwt.sign({ userId }, secret, { expiresIn: "1h" });
   res.cookie("jwt", token, {
      maxAge: 1 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
   });
};
