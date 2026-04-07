import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { UserRole } from "../models/User.model.js";

const { JsonWebTokenError, TokenExpiredError } = jwt;

export interface AuthJwtPayload extends JwtPayload {
  id: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthJwtPayload;
    }
  }
}

function AuthMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.header("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
    return;
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    res.status(401).json({ error: "Unauthorized: Missing token" });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ error: "Server misconfigured: JWT secret missing" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string") {
      res.status(401).json({ error: "Unauthorized: Invalid token payload" });
      return;
    }

    const payload = decoded as JwtPayload & {
      id?: unknown;
      role?: unknown;
    };

    if (typeof payload.id !== "string") {
      res.status(401).json({ error: "Unauthorized: Invalid token payload" });
      return;
    }

    const role: UserRole = payload.role === "admin" ? "admin" : "user";

    req.user = {
      ...payload,
      id: payload.id,
      role,
    };
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ error: "Unauthorized: Token expired" });
      return;
    }

    if (error instanceof JsonWebTokenError) {
      res.status(401).json({ error: "Unauthorized: Invalid token" });
      return;
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default AuthMiddleware;
