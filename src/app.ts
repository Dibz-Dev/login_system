import express, { NextFunction, Request, Response } from "express";

import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./modules/user/routes";
import authRoutes from "./modules/user/auth/routes";
import teamsRoutes from "./modules/teams/routes";
import { handleErrors } from "./middlewares/ErrorHandler";
export interface CustomError extends Error {
  status?: number;
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/v1/auth", authRoutes);
app.use("/v1/user", userRoute);
app.use("/v1/teams", teamsRoutes);

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Invalid route",
  });
});

app.use(handleErrors);

export default app;
