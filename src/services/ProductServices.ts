import { getRepository, DeleteResult, UpdateResult } from "typeorm";

import ApplicationError from "../errors/ApplicationError";

import Product from "../models/Product";
import User from "../models/User";

interface RequestCreate {
  name: string;
  user_id: string;
}
interface RequestUpdate {
  name: string;
  user_id: string;
  id: string;
}

interface RequestDelete {
  id: string;
  user_id: string;
}

interface RequestGet {
  id: string;
  user_id: string;
}

interface RequestGetAll {
  user_id: string;
}

class ProductServices {
  public async createService({
    name,
    user_id,
  }: RequestCreate): Promise<Product> {
    const userRepository = getRepository(User);
    const productRepository = getRepository(Product);

    const user = await userRepository.findOne({ id: user_id });

    if (user?.role !== "administer") {
      throw new ApplicationError("User not allowed", 400);
    }

    const findSameProduct = await productRepository.findOne({ name });

    if (findSameProduct) {
      throw new ApplicationError("Product already exists", 400);
    }

    const product = await productRepository.create({
      name,
      user_id,
    });

    await productRepository.save(product);

    return product;
  }
  public async getService({ id, user_id }: RequestGet): Promise<Product> {
    const userRepository = getRepository(User);
    const productRepository = getRepository(Product);

    const user = await userRepository.findOne({ id: user_id });

    if (user?.role !== "administer") {
      throw new ApplicationError("User not allowed", 400);
    }

    const product = await productRepository.findOne({
      where: { user_id: user_id, id: id },
    });

    if (!product) {
      throw new ApplicationError("Product doesn't exist", 400);
    }

    return product;
  }
  public async getAllService({ user_id }: RequestGetAll): Promise<Product[]> {
    const userRepository = getRepository(User);
    const productRepository = getRepository(Product);

    const user = await userRepository.findOne({ id: user_id });

    if (!user) {
      throw new ApplicationError("User doesn't exist", 400);
    }

    if (user?.role !== "administer") {
      throw new ApplicationError("User not allowed", 400);
    }

    const product = await productRepository.find({
      where: { user_id: user_id },
    });

    return product;
  }
  public async deleteService({
    id,
    user_id,
  }: RequestDelete): Promise<DeleteResult> {
    const userRepository = getRepository(User);
    const productRepository = getRepository(Product);

    const user = await userRepository.findOne({ id: user_id });

    if (user?.role !== "administer") {
      throw new ApplicationError("User not allowed", 400);
    }

    const findProduct = await productRepository.findOne({ where: { id: id } });

    if (!findProduct) {
      throw new ApplicationError("Product doesn't exist", 400);
    }

    const deleted = await productRepository.delete({
      id,
      user_id,
    });

    return deleted;
  }
  public async updateService({
    id,
    name,
    user_id,
  }: RequestUpdate): Promise<Product | undefined> {
    const userRepository = getRepository(User);
    const productRepository = getRepository(Product);

    const user = await userRepository.findOne({ id: user_id });

    if (user?.role !== "administer") {
      throw new ApplicationError("User not allowed", 400);
    }

    const productToUpdate = await productRepository.findOne({ id });

    if (productToUpdate) {
      productToUpdate.name = name ? name : productToUpdate.name;
      await productRepository.update(id, productToUpdate);
    }
    return productToUpdate;
  }
}
export default ProductServices;
