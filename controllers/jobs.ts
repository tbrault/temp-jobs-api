import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import CustomRequest from "../interfaces/CustomRequest.js";
import Job from "../models/Job.js";
import { BadRequestError, NotFounderror } from "../errors/index.js";

async function getAllJobs(req: CustomRequest, res: Response) {
  if (!req.user) {
    throw new BadRequestError("No user provided");
  }
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
}

async function createSingleJob(req: CustomRequest, res: Response) {
  if (!req.user) {
    throw new BadRequestError("No user provided");
  }
  const job = await Job.create({
    ...req.body,
    createdBy: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ job });
}

async function getSingleJob(req: CustomRequest, res: Response) {
  if (!req.user) {
    throw new BadRequestError("No user provided");
  }
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFounderror(`No job found with id : ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
}

async function deleteSingleJob(req: CustomRequest, res: Response) {
  if (!req.user) {
    throw new BadRequestError("No user provided");
  }
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFounderror(`No job found with id : ${jobId}`);
  }

  res.status(StatusCodes.OK).send();
}

async function updateSingleJob(req: CustomRequest, res: Response) {
  if (!req.user) {
    throw new BadRequestError("Please provide a user, position and company");
  }
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFounderror(`No job found with id : ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
}

export {
  getAllJobs,
  createSingleJob,
  getSingleJob,
  deleteSingleJob,
  updateSingleJob,
};
