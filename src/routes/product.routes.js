import { Router } from "express";
import { createProduct, deleteProduct, changeStateProduct, getProducts, updateProduct, getActiveProducts } from "../controllers/product.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.get("/", getProducts);
router.get("/active", getActiveProducts);
router.post("/createProduct", authenticate, createProduct);
router.put("/updateProduct:id", updateProduct);
router.put("/disableProduct:id", changeStateProduct);
router.delete("/deleteProduct:id", deleteProduct);

export default router;