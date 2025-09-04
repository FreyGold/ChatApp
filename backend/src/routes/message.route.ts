import express, { Router } from "express";
import {
   deleteMessage,
   editMessage,
   getSharedMessages,
   getUsersForSidebar,
   sendMessage,
} from "../controllers/message.controller";
import { protectRoutes } from "../middleware/auth.middleware";

const router: Router = express.Router();

router.get("/users", protectRoutes, getUsersForSidebar);
router.get("/messages", protectRoutes, getSharedMessages);
router
   .route("/message")
   .get(protectRoutes, sendMessage)
   .patch(protectRoutes, editMessage)
   .delete(protectRoutes, deleteMessage);

export default router;
