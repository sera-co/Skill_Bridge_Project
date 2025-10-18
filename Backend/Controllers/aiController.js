import Roadmap from "../models/roadmap.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini client with API key from environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to generate dynamic mock roadmaps based on preferences
const generateDynamicRoadmap = (skillKey, goal, learningType, currentLevel, dayCount = 30) => {
  // Adjust roadmap based on day count
  const numSteps = dayCount <= 30 ? 3 : dayCount <= 60 ? 4 : 5;
  const hoursPerResource = dayCount <= 30 ? 20 : dayCount <= 60 ? 30 : 45;
  const roadmaps = {
    "rust": [
      {
        number: 1,
        title: "Learn Rust Fundamentals",
        description: "Master Rust basics including ownership, borrowing, and memory safety concepts.",
        resources: [
          { name: "The Rust Programming Language", link: "https://doc.rust-lang.org/book/", provider: "Rust Foundation", certified: false, free: true, estimatedHours: 40 },
          { name: "Rust by Example", link: "https://doc.rust-lang.org/rust-by-example/", provider: "Rust Foundation", certified: false, free: true, estimatedHours: 30 }
        ]
      },
      {
        number: 2,
        title: "Advanced Rust Concepts",
        description: "Learn traits, lifetimes, macros, and concurrency in Rust.",
        resources: [
          { name: "Rust Advanced Concepts", link: "https://doc.rust-lang.org/book/ch10-00-generics.html", provider: "Rust Foundation", certified: false, free: true, estimatedHours: 50 },
          { name: "Async Rust", link: "https://rust-lang.github.io/async-book/", provider: "Rust Foundation", certified: false, free: true, estimatedHours: 35 }
        ]
      }
    ],
    "go": [
      {
        number: 1,
        title: "Go Basics and Syntax",
        description: "Learn Go fundamentals including variables, functions, and goroutines.",
        resources: [
          { name: "A Tour of Go", link: "https://tour.golang.org/", provider: "Google", certified: false, free: true, estimatedHours: 25 },
          { name: "Go by Example", link: "https://gobyexample.com/", provider: "Go Community", certified: false, free: true, estimatedHours: 20 }
        ]
      },
      {
        number: 2,
        title: "Concurrency and Channels",
        description: "Master Go's concurrency model with goroutines and channels.",
        resources: [
          { name: "Go Concurrency Patterns", link: "https://golang.org/doc/codewalk/sharemem/", provider: "Google", certified: false, free: true, estimatedHours: 30 },
          { name: "Effective Go", link: "https://golang.org/doc/effective_go.html", provider: "Google", certified: false, free: true, estimatedHours: 25 }
        ]
      }
    ],
    "kotlin": [
      {
        number: 1,
        title: "Kotlin Fundamentals",
        description: "Learn Kotlin basics including null safety, data classes, and extension functions.",
        resources: [
          { name: "Kotlin Koans", link: "https://kotlinlang.org/docs/koans.html", provider: "JetBrains", certified: false, free: true, estimatedHours: 30 },
          { name: "Kotlin Documentation", link: "https://kotlinlang.org/docs/", provider: "JetBrains", certified: false, free: true, estimatedHours: 40 }
        ]
      },
      {
        number: 2,
        title: "Android Development with Kotlin",
        description: "Build Android apps using Kotlin and modern Android development practices.",
        resources: [
          { name: "Android Kotlin Course", link: "https://developer.android.com/courses/android-basics-kotlin/course", provider: "Google", certified: true, free: true, estimatedHours: 60 },
          { name: "Kotlin for Android", link: "https://developer.android.com/kotlin", provider: "Google", certified: false, free: true, estimatedHours: 35 }
        ]
      }
    ]
  };

  // Check for exact matches first
  if (roadmaps[skillKey]) {
    return roadmaps[skillKey].slice(0, numSteps).map((step, idx) => ({
      ...step,
      number: idx + 1,
      resources: step.resources.map(res => ({ ...res, estimatedHours: hoursPerResource }))
    }));
  }

  // Check for partial matches
  for (const [key, roadmap] of Object.entries(roadmaps)) {
    if (skillKey.includes(key)) {
      return roadmap.slice(0, numSteps).map((step, idx) => ({
        ...step,
        number: idx + 1,
        resources: step.resources.map(res => ({ ...res, estimatedHours: hoursPerResource }))
      }));
    }
  }

  // Default fallback for any language - personalized by learning type AND day count
  const levelPrefix = currentLevel === "Advanced" ? "Advanced" : currentLevel === "Intermediate" ? "Intermediate" : "Beginner";
  const intensityNote = dayCount <= 30 ? " (Fast-track)" : dayCount <= 60 ? " (Standard pace)" : " (In-depth)";
  
  let resourcesByType;
  if (learningType === "Video") {
    resourcesByType = [
      { name: `${goal} Complete Video Course`, link: "https://www.udemy.com/", provider: "Udemy", certified: true, free: false, estimatedHours: hoursPerResource },
      { name: `Learn ${goal} - Video Tutorial`, link: "https://www.youtube.com/", provider: "YouTube", certified: false, free: true, estimatedHours: Math.floor(hoursPerResource * 0.6) }
    ];
  } else if (learningType === "Interactive") {
    resourcesByType = [
      { name: `${goal} Interactive Course`, link: "https://www.codecademy.com/", provider: "Codecademy", certified: true, free: false, estimatedHours: hoursPerResource },
      { name: `${goal} Practice Challenges`, link: "https://www.freecodecamp.org/", provider: "freeCodeCamp", certified: false, free: true, estimatedHours: Math.floor(hoursPerResource * 0.7) }
    ];
  } else {
    resourcesByType = [
      { name: `${goal} Official Documentation`, link: "https://devdocs.io/", provider: "Official Docs", certified: false, free: true, estimatedHours: Math.floor(hoursPerResource * 0.6) },
      { name: `${goal} Complete Guide Book`, link: "https://www.oreilly.com/", provider: "O'Reilly", certified: false, free: false, estimatedHours: hoursPerResource }
    ];
  }

  const steps = [
    {
      number: 1,
      title: `${levelPrefix} ${goal} Fundamentals${intensityNote}`,
      description: `Master the essential ${goal} concepts tailored for ${currentLevel || "beginner"} level in ${dayCount} days. Build a solid foundation with ${learningType.toLowerCase()} resources.`,
      resources: resourcesByType
    },
    {
      number: 2,
      title: `Practical ${goal} Projects`,
      description: `Apply your knowledge through hands-on projects and real-world examples in ${goal}.`,
      resources: [
        { name: `${goal} Project-Based Course`, link: "https://www.coursera.org/", provider: "Coursera", certified: true, free: false, estimatedHours: hoursPerResource },
        { name: `${goal} Practice Projects`, link: "https://github.com/", provider: "GitHub", certified: false, free: true, estimatedHours: Math.floor(hoursPerResource * 0.8) }
      ]
    },
    {
      number: 3,
      title: `Advanced ${goal} Concepts`,
      description: `Deep dive into advanced topics and industry best practices in ${goal}.`,
      resources: [
        { name: `Advanced ${goal} Course`, link: "https://www.pluralsight.com/", provider: "Pluralsight", certified: true, free: false, estimatedHours: hoursPerResource },
        { name: `${goal} Best Practices Guide`, link: "https://dev.to/", provider: "Dev.to", certified: false, free: true, estimatedHours: Math.floor(hoursPerResource * 0.5) }
      ]
    }
  ];

  // Return only the number of steps appropriate for the timeline
  return steps.slice(0, numSteps);
};

/**
 * POST /api/ai/generate
 * body: { goal, currentLevel, preferences }
 */
export const generateRoadmapController = async (req, res) => {
  try {
    console.log("🚀 Starting roadmap generation...");
    const { goal, currentLevel, preferences } = req.body;
    console.log("📝 Request data:", { goal, currentLevel, preferences });

    if (!goal) {
      return res.status(400).json({ message: "Goal is required" });
    }

    // Parse preferences intelligently
    let learningType = preferences?.[0] || "Video";
    // Map frontend values to backend expected values
    if (learningType === "Data") learningType = "Interactive";
    if (learningType === "Notes") learningType = "Reading";
    
    const timeline = preferences?.[1] || "30 days"; // e.g., "30 days", "60 days"
    const dayCount = parseInt(timeline.split(" ")[0]) || 30; // Extract number from "30 days"
    
    // Calculate roadmap structure based on timeline
    const stepsCount = dayCount <= 30 ? "3-4" : dayCount <= 60 ? "4-5" : "5-7";
    const hoursPerWeek = dayCount <= 30 ? "15-20" : dayCount <= 60 ? "10-15" : "7-10";
    const intensity = dayCount <= 30 ? "intensive" : dayCount <= 60 ? "moderate" : "relaxed";
    
    console.log("📊 Parsed preferences:", { learningType, timeline, dayCount, stepsCount, intensity });

    // Create highly detailed prompt for Gemini with specific requirements
    const prompt = `
You are an expert learning path advisor. Create a personalized, practical learning roadmap for "${goal}".

**User Profile:**
- Current Skill Level: ${currentLevel || "Beginner"}
- Preferred Learning Type: ${learningType} (MUST prioritize this format)
- Timeline: ${timeline} (${dayCount} days total)
- Learning Intensity: ${intensity} pace
- Study Time: ${hoursPerWeek} hours per week

**Critical Requirements Based on Timeline:**
1. Generate EXACTLY ${stepsCount} progressive learning steps for a ${dayCount}-day timeline
   - ${dayCount <= 30 ? "Focused, intensive curriculum - prioritize essential skills only" : ""}
   - ${dayCount > 30 && dayCount <= 60 ? "Balanced curriculum - cover fundamentals and intermediate topics" : ""}
   - ${dayCount > 60 ? "Comprehensive curriculum - include fundamentals, intermediate, and advanced topics" : ""}

2. Each step MUST include 2-3 REAL, VALID learning resources with ACTUAL working URLs

3. Adjust resource estimated hours based on timeline:
   - ${dayCount <= 30 ? "Resources should be 10-25 hours each (condensed/fast-track courses)" : ""}
   - ${dayCount > 30 && dayCount <= 60 ? "Resources should be 15-40 hours each (standard courses)" : ""}
   - ${dayCount > 60 ? "Resources should be 20-60 hours each (in-depth comprehensive courses)" : ""}

4. Strongly prioritize resources matching "${learningType}" learning style:
   ${learningType === "Video" ? "→ Focus on video courses from Udemy, Coursera, YouTube channels, LinkedIn Learning, Pluralsight, edX" : ""}
   ${learningType === "Interactive" ? "→ Focus on hands-on platforms like freeCodeCamp, Codecademy, LeetCode, HackerRank, Exercism, Scrimba" : ""}
   ${learningType === "Reading" ? "→ Focus on official documentation, technical books, articles, Medium posts, written tutorials" : ""}

5. Include mix of FREE and PAID options (at least one free resource per step)

6. Use REAL course names and ACTUAL URLs - NO placeholder links like "example.com"

7. Total time across all resources should roughly equal ${dayCount} days at ${hoursPerWeek} hours/week = ~${Math.floor((dayCount / 7) * parseInt(hoursPerWeek.split("-")[0]))} total hours

**JSON Output Format (return ONLY valid JSON array, no markdown, no code blocks):**
[
  {
    "number": 1,
    "title": "Descriptive Step Title",
    "description": "Clear 2-3 sentence explanation of what to learn and why it matters for ${goal}",
    "resources": [
      {
        "name": "Exact Real Course/Resource Name",
        "link": "https://actual-working-url.com/course-path",
        "provider": "Provider Name (Coursera/Udemy/etc)",
        "certified": true,
        "free": false,
        "estimatedHours": 25
      }
    ]
  }
]

**Examples of REAL resources to use:**
- Video: "Complete ${goal} Course" on Udemy, "Introduction to ${goal}" on Coursera
- Interactive: "${goal} Challenges" on LeetCode, "${goal} Track" on Exercism
- Reading: "${goal} Official Documentation", "${goal} book by recognized author

Generate the complete roadmap NOW as valid JSON:
    `;

    // Try Gemini API first, fallback to dynamic mock data
    console.log("🤖 Attempting Gemini API for:", goal);
    let aiSteps;
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      if (response && response.text) {
        console.log("✅ Gemini API response received");
        const cleanText = response.text.replace(/```json/g, "").replace(/```/g, "").trim();
        aiSteps = JSON.parse(cleanText);
        console.log("✅ Successfully parsed Gemini response");
      } else {
        throw new Error("No response text from Gemini");
      }
    } catch (apiError) {
      console.log("❌ Gemini API failed, using dynamic mock data:", apiError.message);
      
      // Generate dynamic mock data based on the skill and preferences
      const skillKey = goal.toLowerCase().trim();
      aiSteps = generateDynamicRoadmap(skillKey, goal, learningType, currentLevel, dayCount);
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

    // Check if user already has a roadmap
    let userRoadmap = await Roadmap.findOne({ userId: req.user._id });

    // ensure each step contains resources in our expected shape
    const processedSteps = aiSteps.map((step, idx) => {
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

    if (!userRoadmap) {
      // Create new roadmap
      userRoadmap = await Roadmap.create({
        userId: req.user._id,
        goal,
        currentLevel,
        preferences,
        steps: processedSteps,
      });
    } else {
      // Update existing roadmap
      userRoadmap.goal = goal;
      userRoadmap.currentLevel = currentLevel;
      userRoadmap.preferences = preferences;
      userRoadmap.steps = processedSteps;
      await userRoadmap.save();
    }

    res.status(201).json({
      success: true,
      message: "Gemini-generated roadmap saved successfully",
      data: userRoadmap,
    });
  } catch (error) {
    console.error("❌ Error generating roadmap:", error);
    console.error("Error details:", error.message);
    res.status(500).json({ 
      message: "Internal Server Error", 
      error: error.message,
      details: "Check server logs for more information"
    });
  }
};
