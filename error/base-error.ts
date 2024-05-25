export class BaseError extends Error {
  systemMessage = "GENERIC_JSHUB_ERROR";
  status = 500;

  constructor(message: string) {
    super(message);
  }
}
