import express from "express";
import { generateRoadmapController } from "../Controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/generate", protect, generateRoadmapController);

export default router;
