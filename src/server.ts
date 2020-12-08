import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import routes from "./routes/index";
import "./database";

import AppError from "./errors/AppError";

const app = express();
app.use(express.json());
app.use(routes);

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  console.error(err);
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
