import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {generateRoadmap,getRoadmap,updateRoadmap,deleteRoadmap } from "../Controllers/roadmapController.js";


const router = express.Router();

router.post("/generate", protect, generateRoadmap); 
router.get("/", protect, getRoadmap); 
router.put("/update", protect, updateRoadmap);
router.delete("/:roadmapId", protect, deleteRoadmap);

export default router;
