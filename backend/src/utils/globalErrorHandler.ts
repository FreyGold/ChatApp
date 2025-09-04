import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
   err: any,
   req: Request,
   res: Response,
   next: NextFunction
) => {
   if (err.isOperational && err.statusCode && err.status) {
      return res.status(err.statusCode as number).json({
         status: err.status,
         message: err.message,
      });
   }
   console.error("Unexpected Error:", err);

   return res.status(500).json({
      status: "error",
      message: "Something went wrong!",
   });
};
