import { Router } from "express";

import ProductsController from "../controllers/ProductsController";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
const productController = new ProductsController();
const productsRouter = Router();

productsRouter.use(ensureAuthenticated);

productsRouter.get("/", productController.getProducts);
productsRouter.post("/", productController.createProduct);

export default productsRouter;
