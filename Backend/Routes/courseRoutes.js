import express from "express";
import { getCourses } from "../Controllers/courseController.js";

const router = express.Router();
router.get("/", getCourses);

export default router;
