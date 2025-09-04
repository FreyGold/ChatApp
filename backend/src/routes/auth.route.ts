import express, { Router } from "express";
import {
   checkAuth,
   editProfile,
   login,
   logout,
   signup,
} from "../controllers/auth.controller";
import { protectRoutes } from "../middleware/auth.middleware";

const router: Router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.patch("/update-profile", protectRoutes, editProfile);
router.get("/check", protectRoutes, checkAuth);

export default router;
