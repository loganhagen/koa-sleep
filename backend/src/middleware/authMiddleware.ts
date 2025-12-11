import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid token" });
  }
};

export const verifyUserAccess = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authenticatedUserId = req.user?.userId;
  const requestedUserId = req.params.userId;

  if (authenticatedUserId !== requestedUserId) {
    res.status(403).json({
      success: false,
      error: {
        code: "FORBIDDEN",
        message: "You are not authorized to access this resource.",
      },
    });
    return;
  }

  next();
};
