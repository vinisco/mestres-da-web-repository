import { Request, Response } from "express";
import ProductServices from "../services/ProductServices";

export default class ProductsController {
  public async getAllProducts(req: Request, res: Response) {
    const user_id = req.user.id;
    const filter = req.query;

    const productServices = new ProductServices();
    const products = await productServices.getAllService({
      user_id,
      filter,
    });

    return res.json(products);
  }
  public async getProduct(req: Request, res: Response) {
    const user_id = req.user.id;
    const { id } = req.params;

    const getProduct = new ProductServices();
    const product = await getProduct.getService({
      id: id,
      user_id,
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
    console.log(id);

    const updateProduct = new ProductServices();
    const product = await updateProduct.updateService({
      id,
      user_id,
      name,
    });

    return res.json(product);
  }
}
