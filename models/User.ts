import * as dotenv from "dotenv";
dotenv.config();
import { Schema, model } from "mongoose";
import User from "../interfaces/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const User = new Schema<User>({
  name: {
    type: String,
    required: [true, "Name must be provided"],
    maxlength: 40,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email must be provided"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email ",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password must be provided"],
    minlength: 6,
  },
});

User.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

User.methods.generateToken = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

User.methods.checkPassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default model<User>("User", User);
