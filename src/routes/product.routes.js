import { Router } from "express";
import { createProduct, getProducts } from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);
router.post("/createProduct", createProduct);

export default router;