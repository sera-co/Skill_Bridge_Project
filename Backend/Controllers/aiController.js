import { generateRoadmap } from "../Services/aiService.js";
import Roadmap from "../models/roadmap.js";

/**
 * POST /api/roadmap/generate
 * body: { goal, currentLevel, preferences }
 */
export const generateRoadmapController = async (req, res) => {
  try {
    const { goal, currentLevel, preferences } = req.body;
    if (!goal) return res.status(400).json({ message: "Goal is required" });

    
    const roadmap = await generateRoadmap({ goal, currentLevel, preferences });

    
    let userRoadmap = await Roadmap.findOne({ userId: req.user._id });
    if (!userRoadmap) {
      userRoadmap = await Roadmap.create({ userId: req.user._id, goal, currentLevel, preferences, steps: roadmap });
    } else {
      userRoadmap.goal = goal;
      userRoadmap.currentLevel = currentLevel;
      userRoadmap.preferences = preferences;
      userRoadmap.steps = roadmap;
      await userRoadmap.save();
    }

    res.json(userRoadmap);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



