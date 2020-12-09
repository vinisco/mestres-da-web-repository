import { getRepository, DeleteResult, UpdateResult } from "typeorm";

import ApplicationError from "../errors/ApplicationError";

import Sku from "../models/Sku";
import User from "../models/User";

interface Request {
  type: string;
  subtype: string;
  quantity: number;
  user_id: string;
  product_id: string;
}

interface RequestUpdate {
  type: string;
  subtype: string;
  quantity: number;
  product_id: string;
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
  filter: any;
}
class SkuServices {
  public async createService({
    type,
    user_id,
    subtype,
    quantity,
    product_id,
  }: Request): Promise<Sku> {
    const userRepository = getRepository(User);
    const skuRepository = getRepository(Sku);

    const user = await userRepository.findOne({ id: user_id });

    if (!user?.role) {
      throw new ApplicationError("User not allowed", 400);
    }

    const checkIfSkuExists = await skuRepository.findOne({
      type: type,
      subtype: subtype,
    });

    if (checkIfSkuExists) {
      throw new ApplicationError("Sku already exists", 400);
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

  public async getService({ id, user_id }: RequestGet): Promise<Sku> {
    const userRepository = getRepository(User);
    const skuRepository = getRepository(Sku);

    const user = await userRepository.findOne({ id: user_id });

    if (user?.role !== "administer") {
      throw new ApplicationError("User not allowed", 400);
    }

    const sku = await skuRepository.findOne({
      where: { id: id },
    });

    if (!sku) {
      throw new ApplicationError("sku doesn't exist", 400);
    }

    return sku;
  }
  public async getAllService({
    user_id,
    filter,
  }: RequestGetAll): Promise<Sku[]> {
    const userRepository = getRepository(User);
    const skuRepository = getRepository(Sku);

    const user = await userRepository.findOne({ id: user_id });

    if (!user) {
      throw new ApplicationError("User doesn't exist", 400);
    }

    if (user?.role !== "administer") {
      throw new ApplicationError("User not allowed", 400);
    }
    const sku = await skuRepository.find({
      where: filter,
    });

    return sku;
  }
  public async deleteService({
    id,
    user_id,
  }: RequestDelete): Promise<DeleteResult> {
    const userRepository = getRepository(User);
    const skuRepository = getRepository(Sku);

    const user = await userRepository.findOne({ id: user_id });

    if (user?.role !== "administer") {
      throw new ApplicationError("User not allowed", 400);
    }

    const findSku = await skuRepository.findOne({ where: { id: id } });

    if (!findSku) {
      throw new ApplicationError("sku doesn't exist", 400);
    }

    const deleted = await skuRepository.delete({
      id,
      user_id,
    });

    return deleted;
  }
  public async updateService({
    id,
    type,
    subtype,
    quantity,
    product_id,
    user_id,
  }: RequestUpdate): Promise<Sku | undefined> {
    const userRepository = getRepository(User);
    const skuRepository = getRepository(Sku);

    const user = await userRepository.findOne({ id: user_id });

    if (user?.role !== "administer") {
      throw new ApplicationError("User not allowed", 400);
    }

    const skuToUpdate = await skuRepository.findOne({ id });

    if (skuToUpdate) {
      skuToUpdate.type = type ? type : skuToUpdate.type;
      skuToUpdate.subtype = subtype ? subtype : skuToUpdate.subtype;
      skuToUpdate.quantity = quantity ? quantity : skuToUpdate.quantity;
      skuToUpdate.product_id = product_id ? product_id : skuToUpdate.product_id;
      skuToUpdate.user_id = user_id ? user_id : skuToUpdate.user_id;
      await skuRepository.update(id, skuToUpdate);
    }
    return skuToUpdate;
  }
}
export default SkuServices;
