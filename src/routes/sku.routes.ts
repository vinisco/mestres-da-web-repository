import { Router } from "express";

import SkuController from "../controllers/SkuControllers";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const skuRouter = Router();
const skuController = new SkuController();
skuRouter.use(ensureAuthenticated);

skuRouter.get("/", skuController.getAllSku);
skuRouter.get("/:id", skuController.getSku);
skuRouter.post("/", skuController.createSku);
skuRouter.put("/:id", skuController.updateSku);
skuRouter.delete("/:id", skuController.deleteSku);

export default skuRouter;
