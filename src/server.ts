import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";

import routes from "./routes/index";
import "./database";

import ApplicationError from "./errors/ApplicationError";

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.use(
  (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApplicationError) {
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
  }
);

app.listen(3333, () => {
  console.log("Server started on port 3000");
});
