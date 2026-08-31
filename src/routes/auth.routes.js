import { Router } from "express";
import { login, register, verifyEmail } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/verify", verifyEmail);
router.post("/login", login);

export default router;