import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { updateProgress, getProgress } from "../Controllers/progressController.js";

const router = express.Router();

router.post("/update", protect, updateProgress);
router.get("/", protect, getProgress);

export default router;
