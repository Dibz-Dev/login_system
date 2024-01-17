import express from "express";

import { authHandler } from "./handler";

const router = express.Router();

router.post("/register", authHandler.registerUser);
router.post("/login", authHandler.loginUser);

export default router;
