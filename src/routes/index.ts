import { Router } from "express";
import productsRouter from "./products.routes";
import userRouter from "./users.routes";
import skuRouter from "./sku.routes";
import sessionsRouter from "./sessions.routes";

const routes = Router();

routes.use("/products", productsRouter);
routes.use("/users", userRouter);
routes.use("/sku", skuRouter);
routes.use("/session", sessionsRouter);

export default routes;
