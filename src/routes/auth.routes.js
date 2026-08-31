import { Router } from "express";
import { getProfile, login, logout, register, verifyEmail } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.post("/register", register);
router.post("/verify", verifyEmail);
router.get("/profile", authenticate, getProfile);
router.post("/login", login);
router.post("/logout", logout);

export default router;