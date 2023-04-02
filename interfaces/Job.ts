import { ObjectId } from "mongoose";

interface Job {
  position: string;
  company: string;
  createdBy: ObjectId;
  status: string;
}

export default Job;
