import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import User from "../models/User.js";

async function registerUser(req: Request, res: Response) {
  const user = await User.create(req.body);
  const token = user.generateToken();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

async function logInUser(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const token = user.generateToken();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

export { registerUser, logInUser };
