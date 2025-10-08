import { Request, Response } from "express";
import { IAuthBody } from "../types/auth.types";
import { ICustomResponse } from "../types/response.types";
import { User } from "../models/user.model";
import { customResponses } from "../utils/response";
import { generateToken } from "../utils/jwt";


export class AuthController {
  public login = async (req: Request<{}, ICustomResponse, IAuthBody>, res: Response) => {
  
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        return customResponses.badRequest(res, "Invalid credentials")
      };

      const valid = await user.comparePassword(password);

      if (!valid) {
        return customResponses.badRequest(res, "Invalid credentials")
      };

      const token = generateToken(user.id);

      return customResponses.ok(res, { token }, "Login successfully");
    } catch(error: any) {
      console.log(error)
      return customResponses.badRequest(res, "Unexpected error");
    }
  };

  public register = async (req: Request<{}, ICustomResponse, IAuthBody>, res: Response) => {
    const { email, password } = req.body;
    const user = new User({ email, password });
    try {
        await user.save();
        customResponses.ok(res, null, 'User created successfully')
    } catch(error: any) {
        console.log(error)
        if (error.name === "ValidationError") {
            return customResponses.badRequest(res, "Validation failed");
        }   
        if (error.code === 11000) {
            return customResponses.badRequest(res, "Email already exists");
        }
        return customResponses.badRequest(res, "Unexpected error");
    }
  };
}