import { Schema, model, Types } from "mongoose";

import Job from "../interfaces/Job.js";
import User from "./User.js";

const Job = new Schema<Job>(
  {
    position: {
      type: String,
      required: [true, "Please provide a position"],
      maxlength: 40,
    },
    company: {
      type: String,
      required: [true, "Please provide a company name"],
      maxlength: 40,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: User,
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

export default model("Job", Job);
