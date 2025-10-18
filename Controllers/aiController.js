import Roadmap from "../models/roadmap.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini client with API key from environment variable
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // Make sure your .env has OPENAI_API_KEY or GEMINI_API_KEY
});

/**
 * POST /api/ai/generate
 * body: { goal, currentLevel, preferences }
 */
export const generateRoadmapController = async (req, res) => {
  try {
    const { goal, currentLevel, preferences } = req.body;

    if (!goal) {
      return res.status(400).json({ message: "Goal is required" });
    }

    // Create a prompt for Gemini
    const prompt = `
      Create a step-by-step learning roadmap for someone whose goal is "${goal}".
      Current skill level: ${currentLevel || "Beginner"}.
      Preferences: ${preferences ? preferences.join(", ") : "No preferences"}.
      For each step return the following fields:
        - number (step number)
        - title
        - description (short)
        - resources: an array of 2-3 learning resources. For each resource include: name, link (url), provider (e.g. Coursera, edX, Udacity, LinkedIn Learning, Pluralsight, FutureLearn), whether it is certified (true/false), and whether it is free (true/false).
      Make sure at least one resource per step is a certified course (from a recognized provider such as Coursera, edX, Udacity, LinkedIn Learning, Pluralsight, FutureLearn) when possible. If none exist for a topic, mark certified: false.
      Return as a JSON array ONLY. Do NOT include markdown or code blocks.
    `;

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // Ensure response text exists
    if (!response || !response.text) {
      return res.status(500).json({ message: "Gemini API did not return any content" });
    }

    // Parse JSON safely, remove any backticks if present
    let aiSteps;
    try {
      const cleanText = response.text.replace(/```json/g, "").replace(/```/g, "").trim();
      aiSteps = JSON.parse(cleanText);
    } catch (err) {
      return res.status(500).json({
        message: "Failed to parse AI response. Ensure Gemini returns valid JSON.",
        raw: response.text,
      });
    }

    // Normalize AI output to match our step/resource schema
    const knownProviders = ["coursera", "edx", "udacity", "linkedin", "pluralsight", "futurelearn", "udemy"];

    const normalizeResource = (res) => {
      if (!res) return null;
      // res can be a string like "Course Name - https://..." or an object
      let title = "";
      let url = "";
      let source = "";
      let free = false;
      let certified = false;
      let estimatedHours = undefined;
      let notes = "";

      if (typeof res === "string") {
        const urlMatch = res.match(/https?:\/\/[\S]+/);
        url = urlMatch ? urlMatch[0] : "";
        title = res.replace(url, "").replace(/[-–—]/g, "").trim();
      } else if (typeof res === "object") {
        title = res.name || res.title || res.course || "";
        url = res.link || res.url || res.href || "";
        source = res.provider || res.source || "";
        free = typeof res.free === "boolean" ? res.free : (res.isFree === true);
        certified = typeof res.certified === "boolean" ? res.certified : (res.certificate === true || res.hasCertificate === true);
        estimatedHours = res.estimatedHours || res.hours;
        notes = res.notes || res.description || "";
      }

      // Infer provider from url or source
      if (!source && url) {
        const host = (new URL(url)).hostname.toLowerCase();
        for (const p of knownProviders) {
          if (host.includes(p)) {
            source = p;
            break;
          }
        }
      }

      // Infer certified if provider is a known provider and not explicitly false
      if (!certified && source) {
        const s = source.toLowerCase();
        if (knownProviders.some((p) => s.includes(p))) certified = true;
      }

      return {
        title: title || source || url || "Unknown Resource",
        url: url || "",
        source: source || "",
        free: !!free,
        certified: !!certified,
        estimatedHours,
        notes,
      };
    };

    // ensure each step contains resources in our expected shape
    aiSteps = aiSteps.map((step, idx) => {
      const number = step.number || step.step || idx + 1;
      const title = step.title || step.name || `Step ${number}`;
      const description = step.description || step.desc || step.summary || "";
      const rawResources = Array.isArray(step.resources) ? step.resources : (step.resources ? [step.resources] : []);
      const resources = rawResources.slice(0, 3).map(normalizeResource).filter(Boolean);
      return {
        id: undefined, // let mongoose set the default ObjectId for step.id
        title,
        description,
        order: number,
        resources,
        project: step.project || {},
        status: step.status || "pending",
      };
    });

    // For testing without MongoDB - just return the AI generated steps
    const roadmapData = {
      goal,
      currentLevel,
      preferences,
      steps: aiSteps,
      pointsEarned: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // If MongoDB is connected and user is authenticated, save to database
    if (req.user && req.user._id) {
      try {
        let userRoadmap = await Roadmap.findOne({ userId: req.user._id });
        
        if (!userRoadmap) {
          userRoadmap = await Roadmap.create({
            userId: req.user._id,
            ...roadmapData
          });
        } else {
          userRoadmap.goal = goal;
          userRoadmap.currentLevel = currentLevel;
          userRoadmap.preferences = preferences;
          userRoadmap.steps = aiSteps;
          await userRoadmap.save();
        }
        roadmapData._id = userRoadmap._id;
        roadmapData.userId = userRoadmap.userId;
      } catch (dbError) {
        console.warn("Database save failed, returning data without saving:", dbError.message);
      }
    }

    res.status(201).json({
      success: true,
      message: "Gemini-generated roadmap created successfully",
      data: roadmapData,
    });
  } catch (error) {
    console.error("Error generating roadmap:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
