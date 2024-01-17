import express, { Request, Response, NextFunction } from "express";
import { Verify } from "../../middlewares/Verify";

const router = express.Router();

router.get("/", Verify, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: "success",
    message: "You have been Verified",
  });
});

export default router;
