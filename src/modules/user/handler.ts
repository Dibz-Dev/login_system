import { Request, Response } from "express";
import { User } from "./model";
import { AppDataSource } from "../../database/data_source";
import { sendResponse } from "../../utils/Response";
import { hashPassword } from "./security/hashPassword";

interface UserBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const userHandler = {
  getUsers: async (req: Request, res: Response) => {
    const users = await AppDataSource.getRepository(User).find();
    return res.status(200).json({
      success: true,
      message: "Fetched data successfully",
      data: users,
    });
  },
  getUserById: async (req: Request, res: Response) => {
    const id = req.params;
    const users = await AppDataSource.getRepository(User).findOneByOrFail(id);
    return res.status(200).json({
      success: true,
      message: `Fetched user with Id ${id.id} successfully`,
      data: users,
    });
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

  createUser: async (req: Request, res: Response): Promise<Response> => {
    const { password, firstName, lastName, email } = req.body;
    const hashedPassword = await hashPassword(password);
    const repo = AppDataSource.getRepository(User);

    if (!hashedPassword) {
      throw new Error("PASSWORD NOT VALID");
    }
    const user: UserBody = {
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    const newUser = repo.create(user);

    await repo.save(newUser);

    return sendResponse(res, "Successfully created a new user", 201);
  },
};
