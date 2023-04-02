import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/custom-errors.js";

class NotFoundError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export default NotFoundError;
