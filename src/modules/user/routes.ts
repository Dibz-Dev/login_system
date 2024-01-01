import express from "express";

import { userHandler } from "./handler";

const router = express.Router();

router.get("/", userHandler.getUsers);
router.get("/:id", userHandler.getUserById);
router.delete("/:id", userHandler.deleteUser);
router.post("/", userHandler.createUser);

export default router;
