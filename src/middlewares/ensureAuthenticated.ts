import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/authConfig";

import ApplicationError from "../errors/ApplicationError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new ApplicationError("JWT token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  const decoded = verify(token, authConfig.jwt.secret);

  const { sub } = decoded as TokenPayload;

  req.user = {
    id: sub,
  };

  return next();
}
