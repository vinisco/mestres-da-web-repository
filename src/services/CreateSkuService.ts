import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Sku from "../models/Sku";
import User from "../models/User";

interface Request {
  type: string;
  subtype: string;
  quantity: number;
  user_id: string;
  product_id: string;
}
class CreateSkuService {
  public async execute({
    type,
    user_id,
    subtype,
    quantity,
    product_id,
  }: Request): Promise<Sku> {
    const userRepository = getRepository(User);
    const skuRepository = getRepository(Sku);

    const user = await userRepository.findOne({ id: user_id });

    if (!user?.isAdmin) {
      throw new AppError("User not allowed", 400);
    }

    const checkIfSkuExists = await skuRepository.findOne({
      type: type,
      subtype: subtype,
    });

    if (checkIfSkuExists) {
      throw new AppError("Sku already exists", 400);
    }

    const sku = skuRepository.create({
      type,
      subtype,
      quantity,
      product_id,
      user_id,
    });

    await skuRepository.save(sku);

    return sku;
  }
}

export default CreateSkuService;
