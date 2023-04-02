import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/custom-errors.js";

class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export default BadRequestError;
