import { Request, Response } from "express";
import { getRepository } from "typeorm";

import Product from "../models/Product";
import ProductServices from "../services/ProductServices";

export default class ProductsController {
  public async getAllProducts(req: Request, res: Response) {
    const authHeaderUser = req.user.id;
    const productServices = new ProductServices();
    const products = await productServices.getAllService({
      user_id: authHeaderUser,
    });

    return res.json(products);
  }
  public async getProduct(req: Request, res: Response) {
    const authHeaderUser = req.user.id;
    const { id } = req.params;

    const getProduct = new ProductServices();
    const product = await getProduct.getService({
      id: id,
      user_id: authHeaderUser,
    });

    return res.json(product);
  }
  public async createProduct(req: Request, res: Response) {
    const user_id = req.user.id;
    const { name } = req.body;

    const createdProduct = new ProductServices();
    const product = await createdProduct.createService({
      name,
      user_id,
    });

    return res.json(product);
  }
  public async deleteProduct(req: Request, res: Response) {
    const user_id = req.user.id;
    const { id } = req.params;

    const deleteProduct = new ProductServices();
    const product = await deleteProduct.deleteService({
      id,
      user_id,
    });

    return res.json(product);
  }
  public async updateProduct(req: Request, res: Response) {
    const user_id = req.user.id;
    const { id } = req.params;
    const { name } = req.body;

    const deleteProduct = new ProductServices();
    const product = await deleteProduct.updateService({
      id,
      user_id,
      name,
    });

    return res.json(product);
  }
}
