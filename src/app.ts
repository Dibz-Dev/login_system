import express, { NextFunction, Request, Response } from "express";

import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./modules/user/routes";
import loginRoutes from "./modules/login/routes";
export interface CustomError extends Error {
  status?: number;
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", userRoutes);
app.use("/login", loginRoutes);

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Invalid route",
  });
});

export default app;
