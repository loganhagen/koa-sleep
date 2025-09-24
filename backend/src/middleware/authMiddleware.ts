import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { de } from "zod/v4/locales/index.cjs";

interface TokenPayload {
  userId: string;
}

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["auth-token"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};
