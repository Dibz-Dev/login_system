import express, { NextFunction, Request, Response } from "express";

import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./modules/user/routes";
import loginRoutes from "./modules/login/routes";
interface CustomError {
  status?: number;
  name?: string;
  message?: string;
  stack?: string;
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

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ error: err.message });
});

export default app;
