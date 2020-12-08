import { Router } from "express";

import SkuController from "../controllers/SkuControllers";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const skuRouter = Router();
const skuController = new SkuController();
skuRouter.use(ensureAuthenticated);

skuRouter.get("/sku", skuController.getSku);
skuRouter.post("/sku", skuController.createSku);
skuRouter.put("/sku", skuController.updateSku);

export default skuRouter;
