import { Router } from "express";
import * as productController from "../controllers/productController";
import { requireAuth } from "@clerk/express";

const router = Router();

// GET /api/products => Get all products (public)
router.get("/", productController.getAllProducts);

// Get /api/products/my -> get current user's products (protected)
router.get("/my", requireAuth(), productController.getMyProducts);

// GET /api/products/:id -> get single product by id (public)
router.get("/:id", productController.getProductById);

// POST /api/products -> create a new product (protected)
router.post("/", requireAuth(), productController.createProduct);

// PUT /api/products/:id -> update a product by id (protected)
router.put("/:id", requireAuth(), productController.updateProduct);

// DELETE /api/products/:id -> delete a product by id (protected)
router.delete("/:id", requireAuth(), productController.deleteProduct);
export default router;