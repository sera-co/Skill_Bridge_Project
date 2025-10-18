import express from "express";
import { generateRoadmapController } from "../Controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// For testing without authentication - remove 'protect' middleware
// Add 'protect' back when you want to require authentication
router.post("/generate", generateRoadmapController);

// With authentication (uncomment when ready):
// router.post("/generate", protect, generateRoadmapController);

export default router;
