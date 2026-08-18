import { Router } from "express";
import { changeCategoryState, createCategory, deleteCategory, getCategory, updateCategory } from "../controllers/category.controller.js";

const router = Router();

router.get("/", getCategory);
router.post("/create", createCategory);
router.put("/update:id", updateCategory);
router.put("/changreState:id", changeCategoryState);
router.delete("/delete:id", deleteCategory)

export default router;