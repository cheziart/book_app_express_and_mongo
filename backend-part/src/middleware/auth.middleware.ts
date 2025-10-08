import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { customResponses } from "../utils/response";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return customResponses.badRequest(res, "No token provided");
  }

  const token = header.split(" ")[1];

  if(!token) {
    return customResponses.badRequest(res, "No token provided");
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    return customResponses.badRequest(res, "Invalid or expired token");
  }
};