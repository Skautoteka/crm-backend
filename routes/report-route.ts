import express, { NextFunction, Request, Response } from "express";
import * as reportController from "../controller/report-controller";

const router = express.Router();

router.get("/create-fields", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fields = await reportController.getReportCreateFields();
    return res.json(fields);
  } catch (err) {
    return next(err);
  }
});

export { router as reportRouter };
