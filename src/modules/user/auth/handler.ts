import { NextFunction, Request, Response } from "express";
import { User } from "../model";
import { AppDataSource } from "../../../database/data_source";
import { sendError, sendResponse } from "../../../utils/Response";
import { comparePasswords, hashPassword } from "../security/hashPassword";
import { generateToken } from "../security/token";

interface UserBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const authHandler = {
  loginUser: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({
      email: email,
    });

    if (!user) {
      return sendError(res, "Failed to find a user with that email", 400, null);
    }
    if (user && user.isActive) {
      return sendError(res, "User is already logged in", 400, null);
    }

    const isPasswordCorrect = await comparePasswords(password, user.password);

    if (!isPasswordCorrect) {
      return sendError(res, "Password and or email is incorrect", 400, null);
    }
    const options = {
      maxAge: 20 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: undefined,
    };
    const token = generateToken(user.id);
    if (token) {
      res.cookie("SessionID", token);
      user.isActive = true;
      await userRepo.save(user);
      return sendResponse(res, "Successfully logged in", 200);
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    const id = req.params;
    const users = AppDataSource.getRepository(User);

    const user = await AppDataSource.getRepository(User).findOneByOrFail(id);

    await users.delete(user);

    return res.status(200).json({
      success: true,
      message: `Successfully deleted user`,
    });
  },

  registerUser: async (req: Request, res: Response): Promise<Response> => {
    const userBody = req.body;
    const hashedPassword = await hashPassword(userBody.password);
    const repo = AppDataSource.getRepository(User);

    if (!hashedPassword) {
      throw new Error("PASSWORD NOT VALID");
    }
    const user: UserBody = {
      password: hashedPassword,
      firstName: userBody.firstName,
      lastName: userBody.lastName,
      email: userBody.email,
    };

    const newUser = repo.create(user);

    await repo.save(newUser);
    const { password, ...restData } = newUser;

    return sendResponse(
      res,
      "Successfully created a new user",
      restData,
      null,
      201
    );
  },
};
