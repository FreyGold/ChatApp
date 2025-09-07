import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./lib/db";
import authRouter from "./routes/auth.route";
import messageRouter from "./routes/message.route";
import { globalErrorHandler } from "./utils/globalErrorHandler";
dotenv.config();
const app = express();
connectDb();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
   cors({
      origin: "http://localhost:5173",
      credentials: true,
   })
);
app.use("/api/auth", authRouter);
app.use("/api/chat", messageRouter);

app.use(globalErrorHandler);

const port = process.env.PORT;
app.listen(port, () => {
   console.log("listening on port", port);
});
