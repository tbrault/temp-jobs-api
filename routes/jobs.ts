import express from "express";
const router = express.Router();

import {
  getAllJobs,
  createSingleJob,
  getSingleJob,
  deleteSingleJob,
  updateSingleJob,
} from "../controllers/jobs.js";

router.route("/").get(getAllJobs).post(createSingleJob);
router
  .route("/:id")
  .get(getSingleJob)
  .delete(deleteSingleJob)
  .patch(updateSingleJob);

export default router;
