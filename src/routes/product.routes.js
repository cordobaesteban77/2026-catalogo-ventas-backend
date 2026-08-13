import { Router } from "express";
import { createProduct, disableProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);
router.post("/createProduct", createProduct);
router.put("/updateProduct:id", updateProduct);
router.put("/disableProduct:id", disableProduct);

export default router;