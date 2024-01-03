import express from "express";
import { loginHandler } from "./handler";

const router = express.Router();

router.post("/", loginHandler.loginUser);

export default router;
