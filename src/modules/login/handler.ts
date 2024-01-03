import { Request, Response } from "express";
import { AppDataSource } from "../../database/data_source";
import { User } from "../user/model";
import { comparePasswords } from "../user/security/hashPassword";
import { sendError, sendResponse } from "../../utils/Response";

export const loginHandler = {
  loginUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({
      email: email,
    });

    if (!user) {
      return sendError(res, "Failed to find a user with that email", 500, null);
    }
    if (user && user.isActive) {
      return sendError(res, "User already logged in", 400, null);
    }

    const isPasswordCorrect = await comparePasswords(password, user.password);

    if (!isPasswordCorrect) {
      return sendError(res, "Password and or email is incorrect", 400, null);
    } else {
      user.isActive = true;
      await userRepo.save(user);
      return sendResponse(res, "Successfully logged in", 200);
    }
  },
};
