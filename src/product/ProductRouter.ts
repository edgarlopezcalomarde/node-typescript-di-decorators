import { Router } from "express";
import { ProductRepository } from "./ProductRepository";
import { ProductService } from "./ProductService";
import { ProductController } from "./ProductController";



const ProductRouter = Router();

// const productRepository = new ProductRepository();
// const productService = new ProductService(productRepository);
// const productController = new ProductController(productService);
const productController = new ProductController();

ProductRouter.get("/api/products", productController.getAllProducts)

export default ProductRouter;