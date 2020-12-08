import { Request, Response } from "express";
import { getRepository } from "typeorm";

import Product from "../models/Product";
import CreateProductService from "../services/CreateProductService";

export default class ProductsController {
  public async getProducts(req: Request, res: Response) {
    const authHeaderUser = req.user;

    const productRepository = getRepository(Product);
    const products = await productRepository.find({
      where: { user_id: authHeaderUser },
    });

    return res.json(products);
  }
  public async createProduct(req: Request, res: Response) {
    try {
      const { name, user_id } = req.body;
      const createdProduct = new CreateProductService();
      const product = await createdProduct.execute({
        name,
        user_id,
      });

      return res.json(product);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
