import "reflect-metadata";
import express from "express";
import routes from "./routes/index";
import productsRouter from "./routes/products.routes";
import "./database";

const app = express();
app.use(express.json());
app.use(routes);
app.use(productsRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
