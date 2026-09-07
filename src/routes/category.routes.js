import { Router } from "express";
import { changeCategoryState, createCategory, deleteCategory, getCategory, updateCategory } from "../controllers/category.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.get("/", getCategory);
router.post("/create", authenticate, createCategory);
router.put("/update:id", authenticate, updateCategory);
router.put("/changreState:id", authenticate, changeCategoryState);
router.delete("/delete:id", authenticate, deleteCategory);

export default router;