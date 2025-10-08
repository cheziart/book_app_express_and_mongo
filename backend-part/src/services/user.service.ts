import { User } from "../models/user.model";

export const checkEmailInDB = async (email: string) => {
  const user = await User.findOne({ email });
  return !!user;
};