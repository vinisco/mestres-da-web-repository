import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Product from "../models/Product";
import User from "../models/User";

interface Request {
  name: string;
  user_id: string;
}

class CreateProductService {
  public async execute({ name, user_id }: Request): Promise<Product> {
    const userRepository = getRepository(User);
    const productRepository = getRepository(Product);

    const user = await userRepository.findOne({ id: user_id });

    if (!user?.isAdmin) {
      throw new AppError("User not allowed", 400);
    }

    const findSameProduct = await productRepository.findOne({ name });

    if (findSameProduct) {
      throw new AppError("Product already exists", 400);
    }

    const product = productRepository.create({
      name,
      user_id,
    });

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
