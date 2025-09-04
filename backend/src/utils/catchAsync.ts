import { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncRequestHandler = (
   req: Request,
   res: Response,
   next: NextFunction
) => Promise<any>;

export const catchAsync =
   (fn: AsyncRequestHandler): RequestHandler =>
   (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
   };
