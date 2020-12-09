import { Request, Response } from "express";

import CreateSkuService from "../services/SkuService";
import SkuService from "../services/SkuService";

export default class SkuController {
  public async getAllSku(req: Request, res: Response) {
    const user_id = req.user.id;
    const filter = req.query;
    const skuService = new SkuService();

    const sku = await skuService.getAllService({ user_id, filter });

    return res.json(sku);
  }
  public async getSku(req: Request, res: Response) {
    const user_id = req.user.id;
    const id = req.params.id;
    const skuService = new SkuService();

    const sku = await skuService.getService({ user_id, id });

    return res.json(sku);
  }

  public async createSku(req: Request, res: Response) {
    const user_id = req.user.id;
    const { type, subtype, quantity, product_id } = req.body;
    const createSku = new CreateSkuService();
    const sku = await createSku.createService({
      type,
      subtype,
      quantity,
      product_id,
      user_id,
    });

    return res.json(sku);
  }
  public async updateSku(req: Request, res: Response) {
    const user_id = req.user.id;
    const id = req.params.id;
    const { type, subtype, quantity, product_id } = req.body;
    const createSku = new CreateSkuService();
    const sku = await createSku.updateService({
      id,
      type,
      subtype,
      quantity,
      product_id,
      user_id,
    });

    return res.json(sku);
  }
  public async deleteSku(req: Request, res: Response) {
    const user_id = req.user.id;
    const { id } = req.params;

    const skuService = new SkuService();
    const sku = await skuService.deleteService({
      id,
      user_id,
    });

    return res.json(sku);
  }
}
