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

  const parts = authHeader.split(" ");
  if (parts.length !== 2) throw new ApplicationError("Token error", 401);

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    throw new ApplicationError("Token malformed", 401);

  verify(token, authConfig.jwt.secret, (err) => {
    if (err) throw new ApplicationError("Invalid Token", 401);
  });

  const decoded = verify(token, authConfig.jwt.secret);

  const { sub } = decoded as TokenPayload;

  req.user = {
    id: sub,
  };

  return next();
}
