import express, { NextFunction, Request, Response } from "express";
import * as taskController from "../controller/task-controller";

const router = express.Router();

router.get("/create-fields", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fields = await taskController.getTaskCreateFields();
    return res.json(fields);
  } catch (err) {
    return next(err);
  }
});

export { router as taskRouter };
