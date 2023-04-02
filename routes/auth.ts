import express from "express";
const router = express.Router();

import { registerUser, logInUser } from "../controllers/auth.js";

router.post("/register", registerUser);
router.post("/login", logInUser);

export default router;
