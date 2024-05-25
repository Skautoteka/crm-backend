export class BaseError extends Error {
  systemMessage = "GENERIC_SKT_ERROR";
  status = 500;

  constructor(message: string) {
    super(message);
  }
}
