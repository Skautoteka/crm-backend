import express, { NextFunction, Request, Response } from "express";
import * as userController from "../controller/user-controller";

const router = express.Router();

router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userController.getAll();
    return res.json(users);
  } catch (err) {
    return next(err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName } = req.body;
    const user = await userController.add({ firstName, lastName });
    res.json({ success: true, added: user });
  } catch (err) {
    return next(err);
  }
});

export { router as userRouter };
