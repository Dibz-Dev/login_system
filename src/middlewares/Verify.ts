import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { User } from "../modules/user/model";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../database/data_source";

export const Verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["cookie"];
    console.error(authHeader);
    if (!authHeader) res.sendStatus(401);
    const cookie = authHeader?.split("SessionID=")[1];
    console.error(cookie);

    if (cookie) {
      jwt.verify(
        cookie,
        process.env.SECRET_ACCESS_TOKEN as Secret,
        async (err, decoded) => {
          if (err) {
            res
              .status(401)
              .json({ message: "This session has expired. Please login" });
          }

          const { id } = decoded as JwtPayload;
          const user = await AppDataSource.getRepository(User).findOneBy({
            id: id,
          });
          const data = user;
          req.body.user = data;
          next();
        }
      );
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    });
  }
};
