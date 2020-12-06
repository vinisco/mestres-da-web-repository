import { Router } from "express";
import { getCustomRepository } from "typeorm";

import ProductRepository from "../repositories/ProductsRepository";
import CreateProductService from "../services/CreateProductService";

const productsRouter = Router();

productsRouter.get("/products", (req, res) => {
  const productRepository = getCustomRepository(ProductRepository);
  const products = productRepository.find();

  return res.json(products);
});

productsRouter.post("/products", async (req, res) => {
  try {
    const { name } = req.body;
    const createdProduct = new CreateProductService();
    const product = await createdProduct.execute({ name: name });

    return res.json(product);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default productsRouter;
