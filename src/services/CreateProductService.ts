import { getCustomRepository } from "typeorm";

import Product from "../models/Product";
import ProductRepository from "../repositories/ProductsRepository";

interface Request {
  name: string;
}
class CreateProductService {
  public async execute({ name }: Request): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const findSameProduct = await productRepository.findOne({ name });

    if (findSameProduct) {
      throw Error("Product already exists");
    }

    const product = productRepository.create({
      name,
    });

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
