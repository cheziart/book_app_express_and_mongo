import Joi from "joi";
import { checkEmailInDB } from "../services/user.service";

const authSchema = {
  password: Joi.string().min(6).max(10).pattern(/^(?=.*[A-Z])(?=.*\d).+$/).required(),
  email: Joi.string().email().optional().required(),
}

export const loginSchema = Joi.object(authSchema);

export const registerSchema = Joi.object({
  ...authSchema,
  email: authSchema.email.external(async (value) => {
        const exists = await checkEmailInDB(value);
        if (exists) {
          throw new Error(`Email ${value} already exists`);
        }
      return value;
    })
});