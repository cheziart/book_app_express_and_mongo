import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { customResponses } from "../utils/response";

export const checkOwnership = (Model: mongoose.Model<any>, paramKey: string = 'id') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const document = await Model.findById(req.params[paramKey]);

      if (!document) {
        return customResponses.notFound(res);
      }

      const userId = req.user?.id; 

      if (document.userId.toString() !== userId) {
        return customResponses.forbidden(res);
      }

      next();
    } catch (error) {
      return customResponses.badRequest(res, "Unexpected error");
    }
  };
};