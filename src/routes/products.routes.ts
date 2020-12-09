import { Router } from "express";

import ProductsController from "../controllers/ProductsController";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
const productController = new ProductsController();
const productsRouter = Router();

productsRouter.use(ensureAuthenticated);

productsRouter.get("/", productController.getAllProducts);
productsRouter.get("/:id", productController.getProduct);
productsRouter.post("/", productController.createProduct);
productsRouter.delete("/:id", productController.deleteProduct);
productsRouter.put("/:id", productController.updateProduct);

export default productsRouter;
