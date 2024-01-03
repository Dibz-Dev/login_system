import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../../database/data_source";
import { User } from "../../user/model";
import { comparePasswords } from "../../user/security/hashPassword";
import { sendError, sendResponse } from "../../../utils/Response";

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
