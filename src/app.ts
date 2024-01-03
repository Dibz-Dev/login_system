import express, { NextFunction, Request, Response } from "express";

import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./modules/user/routes";
import { handleErrors } from "./middlewares/ErrorHandler";
export interface CustomError extends Error {
  status?: number;
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Invalid route",
  });
});

app.use(handleErrors);

export default app;
