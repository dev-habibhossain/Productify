import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await queries.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

//Get products by current user (protected)
export const getMyProducts = async (req: Request, res: Response) => {
    try {
        const {userId} = getAuth(req);
        if(!userId) return res.status(401).json({error: "Unauthorized"});

        const products = await queries.getProductsByUserId(userId);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

// Get single product by ID (public)

export const getProductById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const product = await queries.getProductById(id);
        if(!product) return res.status(404).json({error: "Product not found"});
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Failed to fetch product" });
    }
};

// Create new product (protected)
export const createProduct = async (req: Request, res: Response) => {
    try {
        const {userId} = getAuth(req);
        if(!userId) return res.status(401).json({error: "Unauthorized"});

        const { title, description, imageUrl} = req.body;

        if(!title || !description || !imageUrl) {
            res.status(400).json({error: "Missing required fields"});
            return;
        }

        const product = await queries.createProduct({
            title,
            description,
            imageUrl,
            userId
        });
        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
    }
};

// Update product (protected - only by owner)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    // Check if product exists and belongs to user
    const existingProduct = await queries.getProductById(id);
    if (!existingProduct)
      return res.status(404).json({ error: "Product not found" });
    if (existingProduct.userId !== userId)
      return res
        .status(403)
        .json({ error: "You can only update your own products" });

    const product = await queries.updateProduct(id, {
      title,
      description,
      imageUrl,
    });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};


// Delete product (protected - only by owner)
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const {userId} = getAuth(req);
        if(!userId) return res.status(401).json({error: "Unauthorized"});

        const {id} = req.params;

        // Check if product exists and belongs to user
        const existingProduct = await queries.getProductById(id);
        if(!existingProduct) return res.status(404).json({error: "Product not found"});
        if(existingProduct.userId !== userId) {
            return res.status(403).json({error: "You can only delete your own products"});
        }

        await queries.deleteProduct(id);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
    }
};