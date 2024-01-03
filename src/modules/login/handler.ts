import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../database/data_source";
import { User } from "../user/model";
import { comparePasswords } from "../user/security/hashPassword";
import { Error, sendResponse } from "../../utils/Response";

export const loginHandler = {
  loginUser: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({
      email: email,
    });

    if (!user) {
      return Error(res, "Failed to find a user with that email", 400, "");
    }
    if (user && user.isActive) {
      return Error(res, "User is already logged in", 400, "");
    }

    const isPasswordCorrect = await comparePasswords(password, user.password);

    if (!isPasswordCorrect) {
      return Error(res, "Password and or email is incorrect", 400, "");
    } else {
      user.isActive = true;
      await userRepo.save(user);
      return sendResponse(res, "Successfully logged in", 200);
    }
  },
};
