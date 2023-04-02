import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

import UnauthenticatedError from "../errors/unauthenticated.js";
import Token from "../interfaces/Token.js";
import CustomRequest from "../interfaces/CustomRequest.js";

function validateAuthentication(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const requestAuthorizationHeader = req.headers.authorization;
  if (
    !requestAuthorizationHeader ||
    !requestAuthorizationHeader.startsWith("Bearer")
  ) {
    throw new UnauthenticatedError("No token provided");
  }
  const token = requestAuthorizationHeader.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    const { userId, name } = payload as Token;
    req.user = { userId, name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
}

export default validateAuthentication;
