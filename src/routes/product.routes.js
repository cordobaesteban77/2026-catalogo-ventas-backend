import { Router } from "express";
import { createProduct, deleteProduct, changeStateProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);
router.post("/createProduct", createProduct);
router.put("/updateProduct:id", updateProduct);
router.put("/disableProduct:id", changeStateProduct);
router.delete("/deleteProduct:id", deleteProduct);

export default router;