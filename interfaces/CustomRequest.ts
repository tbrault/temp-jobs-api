import { Request } from "express";
import { ObjectId } from "mongoose";

interface CustomRequest extends Request {
  user?: {
    userId: ObjectId;
    name: string;
  };
}

export default CustomRequest;
