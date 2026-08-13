import { Router } from "express";
import { createProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);
router.post("/createProduct", createProduct);
router.put("/updateProduct:id", updateProduct)

export default router;