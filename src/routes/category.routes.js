import { Router } from "express";
import { createCategory, getCategory, updateCategory } from "../controllers/category.controller.js";

const router = Router();

router.get("/", getCategory);
router.post("/create", createCategory);
router.put("/update:id", updateCategory);

export default router;