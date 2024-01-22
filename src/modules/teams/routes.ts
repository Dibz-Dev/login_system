import express from "express";
import { teamsHandler } from "./handler";

const router = express.Router();

router.get("/standings", teamsHandler.getStandings);

export default router;
