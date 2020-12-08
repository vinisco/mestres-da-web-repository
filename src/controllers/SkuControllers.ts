import { Request, Response } from "express";
import { getRepository } from "typeorm";

import Sku from "../models/Sku";
import CreateSkuService from "../services/CreateSkuService";

export default class SkuController {
  public async getSku(req: Request, res: Response) {
    const user_id = req.user.id;
    const product_id = req.body.product_id;
    const skuRepository = getRepository(Sku);
    const sku = await skuRepository.find({
      product_id: product_id,
      user_id: user_id,
    });
    return res.json(sku);
  }

  public async createSku(req: Request, res: Response) {
    const user_id = req.user.id;
    const { type, subtype, quantity, product_id } = req.body;
    const createSku = new CreateSkuService();
    const sku = await createSku.execute({
      type,
      subtype,
      quantity,
      product_id,
      user_id,
    });

    return res.json(sku);
  }

  public async updateSku(req: Request, res: Response) {
    const { type, subtype, quantity, product_id, user_id } = req.body;
    const createSku = new CreateSkuService();
    const sku = await createSku.execute({
      type,
      subtype,
      quantity,
      product_id,
      user_id,
    });

    return res.json(sku);
  }
}
