import express from "express";
import { getStudentProgress } from "../controllers/progress.js";

const router = express.Router();

router.get("/:studentId", getStudentProgress);

export default router;