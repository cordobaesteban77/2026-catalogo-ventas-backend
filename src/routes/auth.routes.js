import { Router } from "express";
import { getProfile, login, logout, register, updateUser, verifyEmail } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.post("/register", register);
router.post("/verify", verifyEmail);
router.get("/profile", authenticate, getProfile);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update:id", authenticate, updateUser);

export default router;