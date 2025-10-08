import Joi from "joi";

export const reviewSchema = Joi.object({
  message: Joi.string().min(1).max(1000).required(),
});