import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { customResponses } from "../utils/response";

export const validateBody = (schema: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error: any) {
        const message = !error.details && error.message ? error.message.replace(/\s*\([^)]*\)/, "") : error.message;

        return customResponses.badRequest(res, message || "Validation error");
    }
  };
};