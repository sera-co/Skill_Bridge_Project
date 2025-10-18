import axios from "axios";
import Roadmap from "../models/roadmap.js";

export const generateRoadmap = async (req, res) => {
  try {
    const { goal, currentLevel, preferences } = req.body;
    
    const generatedSteps = [
      {
        step: 1,
        title: "Learn HTML & CSS",
        description: "Start with the basics of web structure and styling.",
        resources: [
          { name: "freeCodeCamp HTML/CSS Course", link: "https://www.freecodecamp.org/" },
          { name: "W3Schools HTML Tutorial", link: "https://www.w3schools.com/html/" },
        ],
      },
      {
        step: 2,
        title: "Learn JavaScript",
        description: "Understand core JS concepts and DOM manipulation.",
        resources: [
          { name: "MDN JavaScript Docs", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
          { name: "JavaScript30 Projects", link: "https://javascript30.com/" },
        ],
      },
    ];

    const newRoadmap = new Roadmap({
      userId: req.user._id,
      goal,
      currentLevel,
      preferences,
      steps: generatedSteps,
    });

    await newRoadmap.save();

    res.status(201).json({
      success: true,
      message: "Roadmap generated successfully!",
      data: newRoadmap,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ userId: req.user._id });
    if (!roadmap) {
      return res.status(404).json({ success: false, message: "No roadmap found" });
    }
    res.json({ success: true, data: roadmap });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRoadmap = async (req, res) => {
  try {
    const updated = await Roadmap.findOneAndUpdate(
      { userId: req.user._id },
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Roadmap not found" });
    }
    res.json({ success: true, message: "Roadmap updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteRoadmap = async (req, res) => {
  try {
    await Roadmap.findOneAndDelete({
      userId: req.user._id,
      _id: req.params.roadmapId,
    });
    res.json({ success: true, message: "Roadmap deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
