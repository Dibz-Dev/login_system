import { NextFunction, Response, Request } from "express";
import { EntityNotFoundError } from "typeorm";
import { sendError } from "../utils/Response";

export const catchErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return Promise.resolve({ req, res, next }).catch(next);
};

export const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  if (err instanceof EntityNotFoundError) {
    return sendError(
      res,
      "Item/page you are looking for does not exist",
      404,
      null
    );
  }
  return res.status(500).send({
    success: false,
    message: "Something went wrong",
  });
};
