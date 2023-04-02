import { ObjectId } from "mongoose";

interface Token {
  name: string;
  userId: ObjectId;
}

export default Token;
