import { BaseError } from "sequelize";

export class NotFoundError extends BaseError {
  systemMessage = "NOT_FOUND";
  status = 404;

  constructor(message: string = "") {
    super(message);
  }
}
