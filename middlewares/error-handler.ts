import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import CustomAPIError from "../errors/custom-errors.js";

type errorsAgregator =
  | CustomAPIError
  | Error.CastError
  | Error.ValidationError
  | any;

function handleErrors(
  err: errorsAgregator,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: "Something went wrong try again later",
  };

  if (err instanceof CustomAPIError) {
    customError.statusCode = err.statusCode;
    customError.msg = err.message;
  }
  if (err instanceof Error.ValidationError) {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err instanceof Error.CastError) {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
}

export default handleErrors;
