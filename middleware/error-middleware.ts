import { Request, Response, NextFunction } from "express";
import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const label = err.systemMessage || "SKT_UKNOWN_ERR";
  const message = err.message;

  res.status(errorStatus).json({ errorStatus, label, message });
};

export { errorHandler };
